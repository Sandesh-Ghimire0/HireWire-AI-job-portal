import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.options(/.*/, cors());
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// ---------------------------------------------------------------------------------

import v1Router from "./routes/v1/index.js";

app.use("/api/v1", v1Router);
