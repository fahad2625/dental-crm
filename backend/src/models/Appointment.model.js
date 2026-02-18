import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    clinicId: {
      type: String,
      required: true,
      default: "krishna-dental", // for now (multi-clinic later)
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
    },

    message: {
      type: String,
    },

    expiresAt: {
  type: Date,
},


status: {
  type: String,
  enum: ["pending", "confirmed", "cancelled", "rescheduled"],
  default: "pending",
}

  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
