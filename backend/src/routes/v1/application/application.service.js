import ApplicationRepository from "./application.repository.js";
import { Candidate } from "../candidate/candidate.model.js";
import { ApiError } from "../../../utils/ApiError.js";

class ApplicationService {
    async submitApplication(userId, applicationData) {
        // 1. Find the candidate associated with the user
        const candidate = await Candidate.findOne({ userId });
        if (!candidate) {
            throw new ApiError(404, "Candidate profile not found. Please complete your profile first.");
        }

        // 2. Check if the candidate has already applied for this job
        const existingApplication = await ApplicationRepository.findByJobAndCandidate(
            applicationData.jobId,
            candidate._id
        );

        if (existingApplication) {
            throw new ApiError(400, "You have already applied for this job.");
        }

        // 3. Prepare application details
        const finalApplicationData = {
            ...applicationData,
            candidateId: candidate._id,
        };

        // 4. Create the application
        const application = await ApplicationRepository.create(finalApplicationData);
        return application;
    }

    async getCandidateApplications(userId) {
        const candidate = await Candidate.findOne({ userId });
        if (!candidate) {
            throw new ApiError(404, "Candidate profile not found.");
        }
        return await ApplicationRepository.findByCandidateId(candidate._id);
    }
}

export default new ApplicationService();
