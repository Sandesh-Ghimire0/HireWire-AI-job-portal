import CompanyRepository from "./company.repository.js";
import { ApiError } from "../../../utils/ApiError.js";

import { uploadOnCloudinary } from "../../../utils/cloudinary.js";

class CompanyService {
    async registerCompany(companyDetails, logoLocalPath) {
        const { email, password, name, website, industry, description, location } = companyDetails;

        // 1. Check if user already exists
        const existingUser = await CompanyRepository.findUserByEmail(email);
        if (existingUser) {
            throw new ApiError(400, "User with this email already exists");
        }

        // 2. Upload logo to Cloudinary
        let logoUrl = "";
        if (logoLocalPath) {
            const cloudinaryResponse = await uploadOnCloudinary(logoLocalPath);
            if (cloudinaryResponse) {
                logoUrl = cloudinaryResponse.secure_url;
            }
        }

        // 3. Create User with COMPANY role
        const user = await CompanyRepository.createUser({
            email,
            password,
            role: "COMPANY",
        });

        // 4. Create Company linked to user
        const company = await CompanyRepository.createCompany({
            userId: user._id,
            name,
            location,
            website,
            logo: logoUrl || "",
            industry,
            description,
        });

        return { user, company };
    }
}

export default new CompanyService();
