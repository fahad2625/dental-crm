import express from "express";
import Appointment from "../models/Appointment.model.js";
import fetch from "node-fetch";

const N8N_WEBHOOK = "http://localhost:5678/webhook-test/dental-appointment";
// later change to production URL

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const appointmentData = req.body;

    const appointment = new Appointment(appointmentData);
    await appointment.save();

    console.log("✅ Appointment saved to DB");

    // 🔥 Trigger n8n automation
    await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: appointment.name,
        phone: "91" + appointment.phone,

        clinic: appointment.clinic,
        type: "appointment",
        date: appointment.date,
        time: appointment.time
      }),
    });

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


// Get all appointments (admin)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      clinicId: "krishna-dental", // for now
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

// Update appointment status (admin action)
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

    // 🔥 Trigger n8n based on status
    await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: appointment.name,
       phone: "91" + appointment.phone,

        clinic: appointment.clinic,
        type: status, // confirm / cancel / reschedule
        date: appointment.date,
        time: appointment.time
      }),
    });

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


// ❌ Delete appointment
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});





export default router;
