import { Job } from "./job.model.js";

class JobRepository {
    async createJob(jobData) {
        return await Job.create(jobData);
    }

    async findByCompanyId(companyId) {
        // Exclude rawDescription, preprocessedDescription, and markdownDescription for list view
        return await Job.find({ companyId }).select("-rawDescription -preprocessedDescription -markdownDescription").populate("companyId");
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
