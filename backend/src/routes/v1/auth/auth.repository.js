import { User } from "./auth.model.js";

class AuthRepository {
    async findByEmail(email) {
        // password has select: false, so we need to explicitly select it for validation
        return await User.findOne({ email }).select("+password");
    }
}

export default new AuthRepository();
