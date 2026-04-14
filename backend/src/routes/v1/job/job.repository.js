import mongoose from "mongoose";
import { Job } from "./job.model.js";

class JobRepository {
    async createJob(jobData) {
        return await Job.create(jobData);
    }

    async findByCompanyId(companyId) {
        return await Job.aggregate([
            { $match: { companyId: new mongoose.Types.ObjectId(companyId) } },
            {
                $lookup: {
                    from: "applications",
                    localField: "_id",
                    foreignField: "jobId",
                    as: "applications"
                }
            },
            {
                $addFields: {
                    applicantCount: { $size: "$applications" }
                }
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "companyId",
                    foreignField: "_id",
                    as: "company"
                }
            },
            { $unwind: "$company" },
            { 
                $project: { 
                    applications: 0, 
                    rawDescription: 0, 
                    preprocessedDescription: 0, 
                    markdownDescription: 0,
                    "company.userId": 0,
                    "company.description": 0
                } 
            },
            { $sort: { createdAt: -1 } }
        ]);
    }

    async findDescriptionById(id) {
        return await Job.findById(id).select("-rawDescription -preprocessedDescription ").populate("companyId");
    }

    async findAll() {
        return await Job.find().select("-rawDescription -preprocessedDescription -markdownDescription").populate("companyId");
    }

    async findById(id) {
        return await Job.findById(id).populate("companyId");
    }
}

export default new JobRepository();
