import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
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

    amount: {
      type: Number,
      required: true,
    },

    method: {
      type: String,
      enum: ["cash", "upi", "card", "bank"],
      default: "cash",
    },

    note: String,

    paidAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
