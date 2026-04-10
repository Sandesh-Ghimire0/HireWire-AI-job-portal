import express from "express";
import { postJob, getJobsByCompany, getJobDescription, getAllJobs } from "./job.controller.js";
import { verifyJWT, authorizeRoles } from "../../../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/",verifyJWT, getAllJobs);
router.post("/", verifyJWT, authorizeRoles("COMPANY"), postJob);
router.get("/company/:companyId", verifyJWT, authorizeRoles("COMPANY"), getJobsByCompany);
router.get("/description/:jobId", verifyJWT, getJobDescription);

export default router;
