import express from "express";
import authRouter from "./auth/auth.routes.js";
import companyRouter from "./company/company.routes.js";
import candidateRouter from "./candidate/candidate.routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/company", companyRouter);
router.use("/candidate", candidateRouter);

export { router };
export default router;
