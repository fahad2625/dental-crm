import express from "express";
import TreatmentCase from "../models/TreatmentCase.model.js";
import multer from "multer";

const router = express.Router();

/* STORAGE CONFIG */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* UPLOAD XRAY / REPORT */
router.post("/treatment/:caseId", upload.single("file"), async (req, res) => {
  try {
    const treatment = await TreatmentCase.findById(req.params.caseId);

    if (!treatment) {
      return res.status(404).json({
        success: false,
        message: "Treatment case not found",
      });
    }

    treatment.files.push({
      fileUrl: `/uploads/${req.file.filename}`,
      fileType: req.file.mimetype,
      fileName: req.file.originalname,
    });

    await treatment.save();

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

export default router;
