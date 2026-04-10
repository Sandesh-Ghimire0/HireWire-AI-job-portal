import express from "express";
import { registerCandidate } from "./candidate.controller.js";
import { upload } from "../../../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", upload.single("cv"), registerCandidate);

export default router;
