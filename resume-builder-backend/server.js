import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.js";

const app = express();

const cors = require("cors");

app.use(cors({
  origin: "https://resume-builder-frontend-gold-nu.vercel.app/"
}));

app.use(express.json());

app.use("/api/ai", aiRoutes);

app.listen(process.env.PORT || 5000);

