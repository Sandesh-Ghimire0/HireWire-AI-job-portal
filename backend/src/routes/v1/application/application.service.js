import ApplicationRepository from "./application.repository.js";
import { Candidate } from "../candidate/candidate.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import mongoose from "mongoose";

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

        // 3. Find match score
        const matchScoreDoc = await mongoose.connection.db.collection('matchscores').findOne({
            jobId: applicationData.jobId.toString(),
            candidateId: candidate._id.toString()
        });

        // 4. Prepare application details
        const finalApplicationData = {
            ...applicationData,
            candidateId: candidate._id,
            matchScoreId: matchScoreDoc ? matchScoreDoc._id : undefined
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

    async getJobApplications(jobId) {
        const applications = await ApplicationRepository.findByJobId(jobId);
        
        const matchScoreIds = applications
            .map(app => app.matchScoreId)
            .filter(id => id != null);
            
        let matchScores = [];
        if (matchScoreIds.length > 0) {
            matchScores = await mongoose.connection.db.collection('matchscores')
                .find({ _id: { $in: matchScoreIds } })
                .toArray();
        }
        
        const matchScoreMap = {};
        matchScores.forEach(score => {
            matchScoreMap[score._id.toString()] = score;
        });
        
        const enrichedApplications = applications.map(app => {
            const appObj = app.toObject();
            if (appObj.matchScoreId && matchScoreMap[appObj.matchScoreId.toString()]) {
                appObj.matchScoreData = matchScoreMap[appObj.matchScoreId.toString()];
            }
            return appObj;
        });
        
        enrichedApplications.sort((a, b) => {
            const scoreA = a.matchScoreData ? a.matchScoreData.matchScore : 0;
            const scoreB = b.matchScoreData ? b.matchScoreData.matchScore : 0;
            return scoreB - scoreA;
        });
        
        return enrichedApplications;
    }

    async updateApplicationStatus(applicationId, status) {
        const application = await ApplicationRepository.updateStatus(applicationId, status);
        if (!application) {
            throw new ApiError(404, "Application not found");
        }
        return application;
    }

    async getApplicationById(id) {
        const application = await ApplicationRepository.findById(id);
        if (!application) {
            throw new ApiError(404, "Application not found");
        }
        return application;
    }
}

export default new ApplicationService();
