import ApplicationService from "./application.service.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { ApiError } from "../../../utils/ApiError.js";

const applyForJob = asyncHandler(async (req, res) => {
    const { 
        jobId, 
        name, 
        email, 
        phone, 
        location, 
        experience, 
        lastTitle, 
        notice, 
        salary, 
        coverLetter 
    } = req.body;

    if (!jobId) {
        throw new ApiError(400, "Job ID is required");
    }

    if (!name || !email || !phone || !location || !experience) {
        throw new ApiError(400, "Required application fields are missing");
    }

    const applicationData = {
        jobId,
        name,
        email,
        phone,
        location,
        experience,
        lastTitle,
        notice,
        salary,
        coverLetter
    };

    const application = await ApplicationService.submitApplication(req.user._id, applicationData);

    return res
        .status(201)
        .json(new ApiResponse(201, application, "Application submitted successfully"));
});

const getApplications = asyncHandler(async (req, res) => {
    const applications = await ApplicationService.getCandidateApplications(req.user._id);
    return res
        .status(200)
        .json(new ApiResponse(200, applications, "Applications fetched successfully"));
});

const getJobApplications = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    if (!jobId) {
        throw new ApiError(400, "Job ID is required");
    }

    const applications = await ApplicationService.getJobApplications(jobId);
    return res
        .status(200)
        .json(new ApiResponse(200, applications, "Job applications fetched successfully"));
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!applicationId || !status) {
        throw new ApiError(400, "Application ID and status are required");
    }

    const application = await ApplicationService.updateApplicationStatus(applicationId, status);
    return res
        .status(200)
        .json(new ApiResponse(200, application, "Application status updated successfully"));
});

const getApplicationById = asyncHandler(async (req, res) => {
    const { applicationId } = req.params;
    if (!applicationId) {
        throw new ApiError(400, "Application ID is required");
    }

    const application = await ApplicationService.getApplicationById(applicationId);
    return res
        .status(200)
        .json(new ApiResponse(200, application, "Application details fetched successfully"));
});

export { applyForJob, getApplications, getJobApplications, updateApplicationStatus, getApplicationById };
