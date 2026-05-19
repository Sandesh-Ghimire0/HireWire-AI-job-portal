import JobService from "./job.service.js";
import CandidateService from "../candidate/candidate.service.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { ApiError } from "../../../utils/ApiError.js";

const postJob = asyncHandler(async (req, res) => {
    const { title, salaryRange, type, level, rawDescription } = req.body;

    if (!title || !rawDescription) {
        throw new ApiError(400, "Job title and description are required");
    }

    const job = await JobService.postJob(req.user._id, req.body);

    return res.status(201).json(
        new ApiResponse(201, job, "Job posted successfully")
    );
});

const getRecruiterJobs = asyncHandler(async (req, res) => {
    const jobs = await JobService.getRecruiterJobs(req.user._id);

    return res.status(200).json(
        new ApiResponse(200, jobs, "Recruiter's jobs fetched successfully")
    );
});

const getJobsByCompany = asyncHandler(async (req, res) => {
    const { companyId } = req.params;

    if (!companyId) {
        throw new ApiError(400, "Company ID is required");
    }

    const jobs = await JobService.getJobsByCompany(companyId);

    return res.status(200).json(
        new ApiResponse(200, jobs, "Jobs fetched successfully")
    );
});

const getJobDescription = asyncHandler(async (req, res) => {
    const { jobId } = req.params;

    if (!jobId) {
        throw new ApiError(400, "Job ID is required");
    }

    const job = await JobService.getJobDescription(jobId);

    return res.status(200).json(
        new ApiResponse(200, job, "Job details fetched successfully")
    );
});

const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await JobService.getAllJobs();

    return res.status(200).json(
        new ApiResponse(200, jobs, "All jobs fetched successfully")
    );
});

const getRecommendedJobs = asyncHandler(async (req, res) => {
    // 1. Get the candidate profile for the logged-in user
    const candidate = await CandidateService.getProfile(req.user._id);
    
    if (!candidate) {
        throw new ApiError(404, "Candidate profile not found");
    }

    const candidate_id = candidate._id.toString();

    try {
        const response = await fetch(`http://localhost:8000/match-jobs/${candidate_id}`);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ApiError(response.status, errorData.detail || "Failed to fetch recommendations from the recommendation server");
        }

        const data = await response.json();

        if (!data.matches || !Array.isArray(data.matches)) {
            throw new ApiError(500, "Invalid response format from recommendation server");
        }

        const jobsWithScores = await JobService.getRecommendedJobs(data.matches);

        return res.status(200).json(
            new ApiResponse(200, jobsWithScores, "Recommended jobs fetched successfully")
        );
    } catch (error) {
        if (error instanceof ApiError) throw error;
        
        // Handle connection errors to the recommendation server
        throw new ApiError(500, `Recommendation server error: ${error.message}`);
    }
});

const getJobFeedback = asyncHandler(async (req, res) => {
    const { jobId } = req.params;

    if (!jobId) {
        throw new ApiError(400, "Job ID is required");
    }

    // 1. Get candidate profile
    const candidate = await CandidateService.getProfile(req.user._id);
    if (!candidate || !candidate.resumeText) {
        throw new ApiError(400, "Please upload your resume to receive AI feedback on this job.");
    }

    // 2. Get job
    const job = await JobService.getJobDescription(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    // 3. Generate feedback using OpenAI
    const feedback = await JobService.generateJobFeedback(candidate.resumeText, job);

    return res.status(200).json(
        new ApiResponse(200, feedback, "Job feedback generated successfully")
    );
});

export { postJob, getRecruiterJobs, getJobsByCompany, getJobDescription, getAllJobs, getRecommendedJobs, getJobFeedback };
