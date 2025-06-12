import "dotenv/config";
import express from "express";
import { PORT } from "./constants/env";
import connectToDatabase from "./config/db";
import healthRoutes from "./routes/health.route";

const app = express();

app.use("/api/v1", healthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectToDatabase();
});
