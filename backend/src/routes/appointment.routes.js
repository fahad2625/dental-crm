import express from "express";
import Appointment from "../models/Appointment.model.js";
import fetch from "node-fetch";
import { sendEmail } from "../services/emailService.js";

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
    // 📧 EMAIL (NEW APPOINTMENT)
    // ==========================
    console.log("🔥 EMAIL FUNCTION STARTING");

    await sendEmail({
      to: process.env.EMAIL_USER, // sandbox
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

    // ==========================
    // 🔄 N8N (optional)
    // ==========================
    /*
    fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: appointment.name,
        phone: "91" + appointment.phone,
        clinic: appointment.clinicId,
        type: "appointment",
        date: appointment.date,
        time: appointment.time,
      }),
    }).catch((err) => console.log("n8n failed:", err.message));
    */

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
// UPDATE STATUS (CONFIRM / CANCEL / RESCHEDULE)
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

    // ==========================
    // 📧 EMAIL TEMPLATE LOGIC
    // ==========================
    let subject = "";
    let html = "";

    if (status === "confirmed") {
      subject = "Appointment Confirmed";
      html = `
        <p>Hi ${appointment.name},</p>
        <p>Your appointment has been <b>confirmed</b>.</p>
        <p><b>Date:</b> ${appointment.date}</p>
        <p><b>Time:</b> ${appointment.time || "Not specified"}</p>
      `;
    }

    if (status === "cancelled") {
      subject = "Appointment Cancelled";
      html = `
        <p>Hi ${appointment.name},</p>
        <p>Your appointment has been <b>cancelled</b>.</p>
        <p>If this was a mistake, please contact us.</p>
      `;
    }

    if (status === "rescheduled") {
      subject = "Appointment Rescheduled";
      html = `
        <p>Hi ${appointment.name},</p>
        <p>Your appointment has been <b>rescheduled</b>.</p>
        <p><b>New Date:</b> ${appointment.date}</p>
        <p><b>New Time:</b> ${appointment.time || "Not specified"}</p>
      `;
    }

    // ==========================
    // 📧 SEND EMAIL
    // ==========================
    if (subject && html) {
      console.log("🔥 STATUS EMAIL TRIGGER");

      await sendEmail({
        to: process.env.EMAIL_USER, // sandbox
        subject,
        html,
      });
    }

    // ==========================
    // 🔄 N8N (optional)
    // ==========================
    /*
    fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: appointment.name,
        phone: "91" + appointment.phone,
        clinic: appointment.clinicId,
        type: status,
        date: appointment.date,
        time: appointment.time,
      }),
    }).catch((err) => console.log("n8n failed:", err.message));
    */

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