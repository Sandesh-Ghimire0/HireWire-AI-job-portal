import CandidateService from "./candidate.service.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { ApiError } from "../../../utils/ApiError.js";

const registerCandidate = asyncHandler(async (req, res) => {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
        throw new ApiError(400, "Email, password, and full name are required");
    }

    if (!req.file) {
        throw new ApiError(400, "CV PDF file is required");
    }

    const result = await CandidateService.registerCandidate(req.body, req.file.path);

    return res.status(201).json(
        new ApiResponse(201, result, "Candidate registered successfully")
    );
});

export { registerCandidate };
