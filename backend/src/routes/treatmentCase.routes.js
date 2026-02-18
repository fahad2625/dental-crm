import express from "express";
import TreatmentCase from "../models/TreatmentCase.model.js";

const router = express.Router();

/**
 * Create a new treatment case
 */
router.post("/", async (req, res) => {
  try {
    const treatmentCase = new TreatmentCase(req.body);
    await treatmentCase.save();

    console.log("🦷 Treatment case created");

    res.status(201).json({
      success: true,
      treatmentCase,
    });
  } catch (error) {
    console.error("❌ Error creating treatment case:", error);
    res.status(500).json({ success: false });
  }
});

/**
 * GET all ongoing treatment cases
 */
router.get("/", async (req, res) => {
  try {
    const cases = await TreatmentCase.find({
      clinicId: "krishna-dental",
      status: "active",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      cases,
    });
  } catch (error) {
    console.error("❌ Error fetching treatment cases:", error);
    res.status(500).json({ success: false });
  }
});

/**
 * GET single treatment case by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const treatment = await TreatmentCase.findById(req.params.id);

    if (!treatment) {
      return res.status(404).json({ success: false });
    }

    res.status(200).json({
      success: true,
      treatment,
    });
  } catch (error) {
    console.error("❌ Error fetching treatment case:", error);
    res.status(500).json({ success: false });
  }
});


router.post("/", async (req, res) => {
  try {
    const {
      clinicId,
      patientName,
      phone,
      treatmentType,
      startDate,
      totalAmount,
    } = req.body;

    const newCase = await TreatmentCase.create({
      clinicId,
      patientName,
      phone,
      treatmentType,
      startDate,
      totalAmount,
    });

    res.json({ success: true, treatment: newCase });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create treatment case",
    });
  }
});


router.put("/:id/next-visit", async (req, res) => {
  try {
    const updated = await TreatmentCase.findByIdAndUpdate(
      req.params.id,
      { nextVisitDate: req.body.nextVisitDate },
      { new: true }
    );

    res.json({ success: true, treatment: updated });
  } catch {
    res.status(500).json({ success: false });
  }
});


export default router;
