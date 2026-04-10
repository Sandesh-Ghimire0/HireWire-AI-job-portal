import mongoose, { Schema } from "mongoose";

const companySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required"],
        },
        name: {
            type: String,
            required: [true, "Company name is required"],
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
        logo: {
            type: String,
            trim: true,
        },
        industry: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const Company = mongoose.model("Company", companySchema);
