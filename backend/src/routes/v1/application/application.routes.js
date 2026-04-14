import express from "express";
import { applyForJob, getApplications, getJobApplications, updateApplicationStatus, getApplicationById } from "./application.controller.js";
import { verifyJWT, authorizeRoles } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

// All application routes require authentication
router.use(verifyJWT);

router.post("/", authorizeRoles("CANDIDATE"), applyForJob);
router.get("/", authorizeRoles("CANDIDATE"), getApplications);

// Company routes
router.get("/job/:jobId", authorizeRoles("COMPANY"), getJobApplications);
router.get("/:applicationId", authorizeRoles("COMPANY"), getApplicationById);
router.patch("/:applicationId/status", authorizeRoles("COMPANY"), updateApplicationStatus);

export default router;
