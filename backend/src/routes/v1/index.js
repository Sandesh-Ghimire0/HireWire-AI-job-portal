import express from "express";
import authRouter from "./auth/auth.routes.js";
import companyRouter from "./company/company.routes.js";
import candidateRouter from "./candidate/candidate.routes.js";
import jobRouter from "./job/job.routes.js";
import applicationRouter from "./application/application.routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/company", companyRouter);
router.use("/candidate", candidateRouter);
router.use("/job", jobRouter);
router.use("/application", applicationRouter);


export { router };
export default router;
