import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.listen(process.env.PORT || 5000);

