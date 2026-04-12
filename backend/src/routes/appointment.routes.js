import express from "express";
import Appointment from "../models/Appointment.model.js";
import fetch from "node-fetch";
import { sendEmail } from "../services/emailService.js"; // ✅ email import

const router = express.Router();

const N8N_WEBHOOK = "https://n8n-fjnr.onrender.com/webhook/dental-appointment";

// ==========================
// CREATE APPOINTMENT
// ==========================
router.post("/", async (req, res) => {
  try {
    const appointmentData = req.body;

    const appointment = new Appointment(appointmentData);
    await appointment.save();

    console.log("✅ Appointment saved to DB");

    // ==========================
    // 🔥 EMAIL TRIGGER
    // ==========================
    console.log("🔥 EMAIL FUNCTION STARTING");

    // 📧 Email to clinic (you)
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Appointment Request",
      html: `
        <h3>New Appointment</h3>
        <p><b>Name:</b> ${appointment.name}</p>
        <p><b>Phone:</b> ${appointment.phone}</p>
        <p><b>Email:</b> ${appointment.email || "Not provided"}</p>
        <p><b>Date:</b> ${appointment.date}</p>
        <p><b>Time:</b> ${appointment.time || "Not specified"}</p>
        <p><b>Message:</b> ${appointment.message || "None"}</p>
      `,
    });

    // 📧 Email to patient (optional)
    if (appointment.email) {
      await sendEmail({
        to: appointment.email,
        subject: "Appointment Request Received",
        html: `
          <p>Hi ${appointment.name},</p>
          <p>Your appointment request has been received.</p>
          <p>We will contact you shortly.</p>
        `,
      });
    }

    // ==========================
    // 🔄 N8N WEBHOOK (non-blocking)
    // ==========================
    fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: appointment.name,
        phone: "91" + appointment.phone,
        clinic: appointment.clinicId, // ✅ fixed
        type: "appointment",
        date: appointment.date,
        time: appointment.time,
      }),
    }).catch((err) => console.log("n8n failed:", err.message));

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      appointment,
    });

  } catch (error) {
    console.error("❌ Error saving appointment:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
    });
  }
});

// ==========================
// GET ALL APPOINTMENTS
// ==========================
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      clinicId: "krishna-dental",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });

  } catch (error) {
    console.error("❌ Error fetching appointments:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }
});

// ==========================
// UPDATE STATUS
// ==========================
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, date, time } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;

    if (date) appointment.date = date;
    if (time) appointment.time = time;

    await appointment.save();

    console.log("✅ Status updated:", status);

    // 🔄 n8n webhook
    fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: appointment.name,
        phone: "91" + appointment.phone,
        clinic: appointment.clinicId, // ✅ fixed
        type: status,
        date: appointment.date,
        time: appointment.time,
      }),
    }).catch((err) => console.log("n8n failed:", err.message));

    res.json({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });

  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Failed to update appointment" });
  }
});

// ==========================
// DELETE
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

export default router;