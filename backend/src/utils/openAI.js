import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const preprocessJobDescription = async (rawDescription) => {
    try {
        if (!rawDescription) return "";

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // or gpt-3.5-turbo
            messages: [
                {
                    role: "system",
                    content: "You are a professional recruiting assistant. Convert the following raw job description into a clean, well-formatted Markdown version. Use headings, bullet points, and bold text to make it readable. Do not add any extra commentary, just the markdown description.",
                },
                {
                    role: "user",
                    content: rawDescription,
                },
            ],
            temperature: 0.7,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Preprocessing Error:", error);
        return rawDescription; // Fallback to raw if LLM fails
    }
};

export const generateJobFeedback = async (resumeText, jobTitle, jobDescription) => {
    try {
        if (!resumeText || !jobDescription) {
            throw new Error("Resume text and job description are required");
        }

        const prompt = `
You are an expert technical recruiter and resume consultant. 
Compare the candidate's resume with the job description for the position of "${jobTitle}".
Provide detailed, constructive, and highly specific feedback to help the candidate optimize their resume.

Candidate's Resume:
"""
${resumeText}
"""

Job Description:
"""
${jobDescription}
"""

You must respond with a JSON object. The response must EXACTLY follow this JSON structure:
{
  "status": "Green" | "Yellow" | "Red",
  "statusText": "LOOKS GOOD" | "NEEDS POLISH" | "NEEDS WORK",
  "readinessScoreText": "A summary of the candidate's fit (1-2 sentences), e.g. 'The Bottom Line: You\\'re a strong cultural fit, but...'",
  "recruiterFirst6Seconds": {
    "whatSticksOut": "What is the very first impression in 6 seconds? Be specific to their resume and this job.",
    "terminologyAlignment": [
      { "term": "Skill/Keyword 1", "match": true },
      { "term": "Skill/Keyword 2", "match": false }
    ]
  },
  "criticalGaps": [
    "Critical missing skill/experience 1",
    "Critical missing skill/experience 2"
  ],
  "bonusPoints": [
    "Matching strength or bonus skill 1",
    "Matching strength or bonus skill 2"
  ],
  "impactEnhancements": {
    "weakPhrasing": {
      "weak": "A weak or generic sentence from their resume that could be improved",
      "strong": "A heavily optimized, high-impact version of that same sentence showing quantified impact"
    },
    "missingNumbersText": "A custom tip suggesting how they can quantify their achievements based on their resume experiences."
  },
  "checklist": [
    { "text": "Actionable checklist item 1 to optimize the resume", "completed": false },
    { "text": "Actionable checklist item 2 to optimize the resume", "completed": false },
    { "text": "Actionable checklist item 3 to optimize the resume", "completed": false }
  ]
}

Ensure all fields are fully populated with insightful and professional analysis. Avoid generic feedback. Match the candidate's actual experience with the job requirements.
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content: "You are a professional hiring assistant who matches resumes against job descriptions and outputs structured feedback as JSON.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.5,
        });

        const feedbackData = JSON.parse(response.choices[0].message.content);
        return feedbackData;
    } catch (error) {
        console.error("OpenAI Job Feedback Generation Error:", error);
        throw error;
    }
};

