import dotenv from "dotenv";
dotenv.config();

import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import TreatmentCase from "../models/TreatmentCase.model.js";

const router = express.Router();

/* ---------- Multer Memory Storage ---------- */
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error("Only JPG and PNG images are allowed"));
    } else {
      cb(null, true);
    }
  },
});

/* ---------- Upload Route ---------- */
router.post("/treatment/:caseId", upload.single("file"), async (req, res) => {
  try {
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

    // Upload to Cloudinary using buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "treatment_xrays",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    if (!treatment.files) {
      treatment.files = [];
    }

    treatment.files.push({
      fileUrl: uploadResult.secure_url,
      fileType: req.file.mimetype,
      fileName: req.file.originalname,
      publicId: uploadResult.public_id,
    });

    await treatment.save();

    res.json({
      success: true,
      message: "File uploaded successfully",
      treatment,
    });
console.log("Cloudinary result:", uploadResult.secure_url);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;