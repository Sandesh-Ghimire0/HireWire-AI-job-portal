import express from "express";
import { postJob, getRecruiterJobs, getJobsByCompany, getJobDescription, getAllJobs, getRecommendedJobs, getJobFeedback } from "./job.controller.js";
import { verifyJWT, authorizeRoles } from "../../../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/",verifyJWT, getAllJobs);
router.get("/recommend", verifyJWT, getRecommendedJobs);
router.post("/", verifyJWT, authorizeRoles("COMPANY"), postJob);


router.get("/my-jobs", verifyJWT, authorizeRoles("COMPANY"), getRecruiterJobs);
router.get("/company/:companyId", verifyJWT, authorizeRoles("COMPANY"), getJobsByCompany);
router.get("/description/:jobId", verifyJWT, getJobDescription);
router.get("/feedback/:jobId", verifyJWT, getJobFeedback);

export default router;
