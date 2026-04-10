import { Company } from "./company.model.js";
import { User } from "../auth/auth.model.js";

class CompanyRepository {
    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async createUser(userData) {
        return await User.create(userData);
    }

    async createCompany(companyData) {
        return await Company.create(companyData);
    }
}

export default new CompanyRepository();
