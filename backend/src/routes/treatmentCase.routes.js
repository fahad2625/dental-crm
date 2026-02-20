import express from "express";
import TreatmentCase from "../models/TreatmentCase.model.js";

const router = express.Router();

/**
 * CREATE TREATMENT CASE
 */
router.post("/", async (req, res) => {
  try {
    const treatmentCase = await TreatmentCase.create(req.body);

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
 * GET ALL ACTIVE CASES
 */
router.get("/", async (req, res) => {
  try {
    const cases = await TreatmentCase.find({
      clinicId: "krishna-dental",
      status: "active",
    }).sort({ createdAt: -1 });

    res.json({ success: true, cases });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

/**
 * GET SINGLE CASE
 */
router.get("/:id", async (req, res) => {
  try {
    const treatment = await TreatmentCase.findById(req.params.id);

    if (!treatment) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true, treatment });
  } catch {
    res.status(500).json({ success: false });
  }
});

/**
 * UPDATE NEXT VISIT DATE
 */
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
