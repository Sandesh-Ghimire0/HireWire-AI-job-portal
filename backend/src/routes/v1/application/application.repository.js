import { Application } from "./application.model.js";

class ApplicationRepository {
    async create(applicationData) {
        return await Application.create(applicationData);
    }

    async findByJobAndCandidate(jobId, candidateId) {
        return await Application.findOne({ jobId, candidateId });
    }

    async findById(id) {
        return await Application.findById(id).populate("jobId").populate("candidateId");
    }

    async findByCandidateId(candidateId) {
        return await Application.find({ candidateId }).populate({
            path: "jobId",
            populate: {
                path: "companyId",
                select: "name logo",
            },
        });
    }
}

export default new ApplicationRepository();
