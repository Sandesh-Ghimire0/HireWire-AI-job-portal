import JobRepository from "./job.repository.js";
import { Company } from "../company/company.model.js";
import { ApiError } from "../../../utils/ApiError.js";
import { preprocessJobDescription } from "../../../utils/openAI.js";

class JobService {
    async postJob(userId, jobDetails) {
        // 1. Find the company associated with the user
        const company = await Company.findOne({ userId });
        if (!company) {
            throw new ApiError(404, "Company profile not found for this user");
        }

        // 2. Preprocess job description using LLM
        const markdownDescription = await preprocessJobDescription(jobDetails.rawDescription);

        // 3. Add companyId and markdownDescription to job details
        const jobData = {
            ...jobDetails,
            companyId: company._id,
            markdownDescription,
        };

        // 4. Create the job
        const job = await JobRepository.createJob(jobData);
        return job;
    }

    async getJobsByCompany(companyId) {
        return await JobRepository.findByCompanyId(companyId);
    }

    async getJobDescription(jobId) {
        const job = await JobRepository.findDescriptionById(jobId);
        if (!job) {
            throw new ApiError(404, "Job not found");
        }
        return job.markdownDescription;
    }

    async getAllJobs() {
        return await JobRepository.findAll();
    }
}

export default new JobService();
