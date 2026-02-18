import express from "express";
import Payment from "../models/Payment.model.js";

const router = express.Router();

/* ➕ Add Payment */
router.post("/", async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.json({ success: true, payment });
  } catch {
    res.status(500).json({ success: false });
  }
});

/* 📄 Payment History by Case */
router.get("/:caseId", async (req, res) => {
  const payments = await Payment.find({
    caseId: req.params.caseId,
  }).sort({ paidAt: -1 });

  res.json({ success: true, payments });
});

// ❌ Delete payment
router.delete("/:id", async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});


export default router;
