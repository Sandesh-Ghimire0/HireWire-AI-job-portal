import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
    {
        companyId: {
            type: Schema.Types.ObjectId,
            ref: "Company",
            required: [true, "Company ID is required"],
        },
        title: {
            type: String,
            required: [true, "Job title is required"],
            trim: true,
        },
        salaryRange: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            trim: true,
        },
        level: {
            type: String,
            trim: true,
        },
        rawDescription: {
            type: String,
        },
        preprocessedDescription: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Job = mongoose.model("Job", jobSchema);
