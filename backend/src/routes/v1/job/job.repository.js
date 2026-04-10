import { Job } from "./job.model.js";

class JobRepository {
    async createJob(jobData) {
        return await Job.create(jobData);
    }

    async findByCompanyId(companyId) {
        // Exclude rawDescription, preprocessedDescription, and markdownDescription for list view
        return await Job.find({ companyId }).select("-rawDescription -preprocessedDescription -markdownDescription");
    }

    async findDescriptionById(id) {
        return await Job.findById(id).select("markdownDescription");
    }

    async findAll() {
        return await Job.find().select("-rawDescription -preprocessedDescription -markdownDescription");
    }
}

export default new JobRepository();
