import express from "express";
import { applyForJob, getApplications } from "./application.controller.js";
import { verifyJWT, authorizeRoles } from "../../../middlewares/auth.middleware.js";

const router = express.Router();

// All application routes require authentication
router.use(verifyJWT);

router.post("/", authorizeRoles("CANDIDATE"), applyForJob);
router.get("/", authorizeRoles("CANDIDATE"), getApplications);

export default router;
