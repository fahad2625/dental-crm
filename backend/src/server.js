import app from "./app.js";
import connectDB from "./config/db.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import treatmentCaseRoutes from "./routes/treatmentCase.routes.js";
import visitRoutes from "./routes/visit.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import express from "express";


const PORT = 5000;

// Connect MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/appointments", appointmentRoutes);
app.use("/payments", paymentRoutes);
app.use("/treatment-cases", treatmentCaseRoutes);
app.use("/visits", visitRoutes);
app.use("/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
