import AuthRepository from "./auth.repository.js";
import { ApiError } from "../../../utils/ApiError.js";

class AuthService {
    async login(email, password) {
        const user = await AuthRepository.findByEmail(email);

        if (!user) {
            throw new ApiError(404, "User does not exist");
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid user password");
        }

        const accessToken = user.generateAccessToken();

        // Remove password from response
        const loggedInUser = await user.constructor.findById(user._id).select("-password");

        return { user: loggedInUser, accessToken };
    }
}

export default new AuthService();
