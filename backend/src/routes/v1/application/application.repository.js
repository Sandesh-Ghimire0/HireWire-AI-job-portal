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

    async findByJobId(jobId) {
        return await Application.find({ jobId }).populate("candidateId").sort({ createdAt: -1 });
    }

    async updateStatus(id, status) {
        return await Application.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).populate("jobId").populate("candidateId");
    }
}

export default new ApplicationRepository();
