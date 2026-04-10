import express from "express";
import { registerCompany } from "./company.controller.js";

import { upload } from "../../../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", upload.single("logo"), registerCompany);

export default router;
