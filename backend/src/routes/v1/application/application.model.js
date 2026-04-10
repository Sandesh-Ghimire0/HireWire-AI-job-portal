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
    },
    {
        timestamps: true,
    }
);

export const Application = mongoose.model("Application", applicationSchema);
