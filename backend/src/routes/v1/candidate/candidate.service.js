import CandidateRepository from "./candidate.repository.js";
import { uploadOnCloudinary } from "../../../utils/cloudinary.js";
import { extractTextFromPdf } from "../../../utils/pdfParser.js";
import { ApiError } from "../../../utils/ApiError.js";

class CandidateService {
    async registerCandidate(candidateDetails, localFilePath) {
        const { email, password, fullName } = candidateDetails;

        // 1. Check if user already exists
        const existingUser = await CandidateRepository.findUserByEmail(email);
        if (existingUser) {
            throw new ApiError(400, "User with this email already exists");
        }

        // 2. Extract text from PDF before uploading to Cloudinary (or after, but we have the local path)
        const resumeText = await extractTextFromPdf(localFilePath);

        // 3. Upload CV to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
        if (!cloudinaryResponse) {
            throw new ApiError(500, "Failed to upload CV to Cloudinary");
        }

        // 4. Create User with CANDIDATE role
        const user = await CandidateRepository.createUser({
            email,
            password,
            role: "CANDIDATE",
        });

        // 5. Create Candidate record
        const candidate = await CandidateRepository.createCandidate({
            userId: user._id,
            fullName,
            cvLink: cloudinaryResponse.secure_url,
            resumeText,
            preprocessedResume: "", // As requested, keep it empty for now
        });

        return { user, candidate };
    }
}

export default new CandidateService();
