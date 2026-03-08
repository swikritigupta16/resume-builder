import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import aiRoutes from "./routes/ai.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Connect Database */
connectDB();

/* Routes */
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
