import mongoose from "mongoose";

const treatmentCaseSchema = new mongoose.Schema(
  {
    clinicId: {
      type: String,
      required: true,
    },

    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    treatmentType: {
      type: String,
      enum: ["braces", "aligners", "other"],
      default: "braces",
    },

    // ✅ KEEP START DATE
    startDate: {
      type: Date,
      required: true,
    },

    // ⭐ MAIN FINANCIAL TRUTH
    totalAmount: {
      type: Number,
      required: true,
    },

    nextVisitDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const TreatmentCase = mongoose.model(
  "TreatmentCase",
  treatmentCaseSchema
);

export default TreatmentCase;
