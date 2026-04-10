import { Candidate } from "./candidate.model.js";
import { User } from "../auth/auth.model.js";

class CandidateRepository {
    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async createUser(userData) {
        return await User.create(userData);
    }

    async createCandidate(candidateData) {
        return await Candidate.create(candidateData);
    }
}

export default new CandidateRepository();
