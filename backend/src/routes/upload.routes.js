import dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import TreatmentCase from "../models/TreatmentCase.model.js";



const router = express.Router();

/* ---------- Ensure uploads folder exists ---------- */
const uploadDir = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
} 

/* ---------- Multer storage ---------- */
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ---------- Upload Route ---------- */
router.post("/treatment/:caseId", upload.single("file"), async (req, res) => {
  try {
    console.log("Upload request received");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const treatment = await TreatmentCase.findById(req.params.caseId);

    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: "Treatment case not found",
      });
    }

    // ensure files array exists
    if (!treatment.files) {
      treatment.files = [];
    }

    treatment.files.push({
      fileUrl: `${process.env.BASE_URL}/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      fileName: req.file.originalname,
    });

    await treatment.save();

    res.json({ success: true });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;