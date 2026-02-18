import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    clinicId: {
      type: String,
      required: true,
    },

    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TreatmentCase",
      required: true,
    },

    visitDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", visitSchema);
export default Visit;
