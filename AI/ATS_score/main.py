from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
import re
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import os
load_dotenv()  # Load environment variables from .env file

nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


uri=os.getenv("MONGO_URI")  
client = MongoClient(uri)

db = client["hirewire"]
jobs_collection = db["jobs"]
users_collection = db["candidates"]  

# Load model once at startup
model = SentenceTransformer('all-MiniLM-L6-v2')


# ─────────────────────────────────────────────
# Helper functions
# ─────────────────────────────────────────────

def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    words = text.split()
    words = [w for w in words if w not in stop_words]
    return " ".join(words)


def fetch_jobs():
    return list(jobs_collection.find({}))


def fetch_resume(candidate_id: str) -> str:
    """Fetch resume text from users collection using candidate_id (_id)."""
    try:
        object_id = ObjectId(candidate_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid candidate_id format")

    user = users_collection.find_one({"_id": object_id})

    if not user:
        raise HTTPException(status_code=404, detail=f"Candidate '{candidate_id}' not found")

    resume_text = user.get("resumeText")  # adjust field name if different in your DB
    if not resume_text:
        raise HTTPException(status_code=404, detail="Resume text not found for this candidate")

    return resume_text


def tfidf_filter(resume, jobs, top_k=15):
    job_texts = [job["rawDescription"] for job in jobs]
    documents = [resume] + job_texts

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents)

    resume_vec = tfidf_matrix[0]
    job_vecs = tfidf_matrix[1:]

    similarities = cosine_similarity(resume_vec, job_vecs)[0]
    top_indices = similarities.argsort()[::-1][:top_k]
    return top_indices


def bert_rerank(resume, jobs, top_indices):
    resume_emb = model.encode(resume)
    results = []

    for idx in top_indices:
        job_text = jobs[idx]["rawDescription"]
        job_emb = model.encode(job_text)
        sim = cosine_similarity([resume_emb], [job_emb])[0][0]
        score = round(float(sim * 100), 2)
        results.append((idx, score))

    results.sort(key=lambda x: x[1], reverse=True)
    return results


# ─────────────────────────────────────────────
# API Endpoint
# ─────────────────────────────────────────────

@app.get("/match-jobs/{candidate_id}")
def match_jobs(candidate_id: str, top_k: int = 5):
    """
    Returns ranked list of job_idand match_score for a given candidate.

    - candidate_id: MongoDB _id of the candidate/user
    - top_k: number of jobs to consider in TF-IDF stage (default 15)
    """

    # Step 1: Fetch resume text using candidate_id
    resume_text = fetch_resume(candidate_id)

    # Step 2: Fetch all jobs
    jobs = fetch_jobs()
    if not jobs:
        raise HTTPException(status_code=404, detail="No jobs found in database")

    # Step 3: Preprocess
    resume_clean = preprocess(resume_text)
    for job in jobs:
        job["clean_description"] = preprocess(job["rawDescription"])

    # Step 4: TF-IDF coarse filter
    top_indices = tfidf_filter(resume_clean, jobs, top_k)

    # Step 5: BERT re-ranking
    bert_results = bert_rerank(resume_clean, jobs, top_indices)

    # Step 6: Build response
    results = []
    for idx, score in bert_results:
        job = jobs[idx]
        results.append({
            "job_id": str(job.get("_id")),   # convert ObjectId → string for JSON
            "match_score": score
        })

    return {
        "candidate_id": candidate_id,
        "total_matches": len(results),
        "matches": results
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)