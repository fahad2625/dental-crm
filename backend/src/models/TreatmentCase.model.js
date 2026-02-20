import mongoose from "mongoose";

const treatmentCaseSchema = new mongoose.Schema(
  {
    clinicId: {
      type: String,
      required: true,
      index: true // important for multi clinic SaaS later
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

    // START DATE
    startDate: {
      type: Date,
      required: true,
    },

    // TOTAL TREATMENT COST
    totalAmount: {
      type: Number,
      required: true,
    },

    // ⭐ HOW MUCH PAID SO FAR
    amountPaid: {
      type: Number,
      default: 0,
    },

    // ⭐ AUTO CALCULATED REMAINING
    remainingAmount: {
      type: Number,
      default: function () {
        return this.totalAmount;
      },
    },

    // ⭐ PAYMENT STATUS
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "paid"],
      default: "pending",
    },

    // ⭐ PAYMENT HISTORY (VERY IMPORTANT FOR CLINICS)
    payments: [
      {
        amount: Number,
        method: String, // cash, upi, card
        paidAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    nextVisitDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },

    // ⭐ FILE UPLOADS (XRAY / REPORTS / PHOTOS)
    files: [
      {
        fileUrl: String,
        fileType: String, // image/pdf/xray
        fileName: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TreatmentCase = mongoose.model("TreatmentCase", treatmentCaseSchema);

export default TreatmentCase;
