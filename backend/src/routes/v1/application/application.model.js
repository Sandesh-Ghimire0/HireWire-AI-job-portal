import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
    {
        jobId: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: [true, "Job ID is required"],
        },
        candidateId: {
            type: Schema.Types.ObjectId,
            ref: "Candidate",
            required: [true, "Candidate ID is required"],
        },
        status: {
            type: String,
            enum: ["PENDING", "REVIEWING", "ACCEPTED", "REJECTED"],
            default: "PENDING",
        },
        score: {
            type: Number,
            default: 0,
        },
        name: {
            type: String,
            required: [true, "Candidate name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },
        experience: {
            type: String,
            required: [true, "Experience level is required"],
        },
        lastTitle: {
            type: String,
            trim: true,
        },
        notice: {
            type: String,
            trim: true,
        },
        salary: {
            type: String,
            trim: true,
        },
        coverLetter: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Application = mongoose.model("Application", applicationSchema);
