import dotenv from "dotenv";
dotenv.config(); // MUST BE FIRST

import express from "express";
import path from "path";

import app from "./app.js";
import connectDB from "./config/db.js";

import appointmentRoutes from "./routes/appointment.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import treatmentCaseRoutes from "./routes/treatmentCase.routes.js";
import visitRoutes from "./routes/visit.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

/* ---------- TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ---------- HEALTH ROUTE (for uptime monitoring) ---------- */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* ---------- ROUTES ---------- */
app.use("/appointments", appointmentRoutes);
app.use("/payments", paymentRoutes);
app.use("/treatment-cases", treatmentCaseRoutes);
app.use("/visits", visitRoutes);
app.use("/upload", uploadRoutes);

/* ---------- SERVE UPLOAD FILES ---------- */
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});