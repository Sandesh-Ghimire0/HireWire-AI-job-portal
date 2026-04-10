import mongoose, { Schema } from "mongoose";

const candidateSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },
        cvLink: {
            type: String,
            trim: true,
        },
        resumeText: {
            type: String,
        },
        preprocessedResume: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Candidate = mongoose.model("Candidate", candidateSchema);
