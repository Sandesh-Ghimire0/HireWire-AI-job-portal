import CompanyService from "./company.service.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { ApiError } from "../../../utils/ApiError.js";

const registerCompany = asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        throw new ApiError(400, "Email, password and company name are required");
    }

    const logoLocalPath = req.file?.path;

    const result = await CompanyService.registerCompany(req.body, logoLocalPath);

    return res.status(201).json(
        new ApiResponse(201, result, "Company registered successfully")
    );
});

export { registerCompany };
