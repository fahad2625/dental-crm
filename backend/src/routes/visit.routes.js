import express from "express";
import Visit from "../models/Visit.model.js";

const router = express.Router();

/* ➕ Add visit */
router.post("/", async (req, res) => {
  try {
    const visit = await Visit.create(req.body);
    res.json({ success: true, visit });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* 📄 Get visits by case */
router.get("/:caseId", async (req, res) => {
  const visits = await Visit.find({
    caseId: req.params.caseId,
  }).sort({ visitDate: -1 });

  res.json({ success: true, visits });
});

// ❌ Delete visit note
router.delete("/:id", async (req, res) => {
  try {
    await Visit.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});


export default router;
