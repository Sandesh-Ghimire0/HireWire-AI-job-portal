import { registerCandidate, getProfile } from "./candidate.controller.js";
import { upload } from "../../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.post("/register", upload.single("cv"), registerCandidate);
router.get("/profile", verifyJWT, getProfile);

export default router;

