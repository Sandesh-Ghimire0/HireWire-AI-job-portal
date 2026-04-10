import JobService from "./job.service.js";
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

    const description = await JobService.getJobDescription(jobId);

    return res.status(200).json(
        new ApiResponse(200, { markdownDescription: description }, "Job description fetched successfully")
    );
});

const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await JobService.getAllJobs();

    return res.status(200).json(
        new ApiResponse(200, jobs, "All jobs fetched successfully")
    );
});

export { postJob, getJobsByCompany, getJobDescription, getAllJobs };
