import { Schema, model } from "mongoose";

const ApplicationSchema = new Schema(
  {
    // User Reference
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic Info
    companyName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },

    // Kanban Logic (The Core)
    status: {
      type: String,
      enum: ["Wishlist", "Applied", "Interview", "Offer", "Rejected"],
      default: "Wishlist",
    },

    // Tracking Links & Dates
    jobLink: {
      type: String,
      trim: true,
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },

    // Detail Fields
    salary: {
      type: String, // String allows for ranges like "50k-70k"
      default: "N/A",
    },
    location: {
      type: String,
      default: "Remote", // Remote, Onsite, Hybrid
    },
    notes: {
      type: String,
      maxLength: [500, "Notes cannot be more than 500 characters"],
    },

    // Extra Flair (Optional for Day 4)
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

export default model("Application", ApplicationSchema);
