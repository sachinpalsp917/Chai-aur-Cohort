import "dotenv/config";
import express from "express";
import connectToDatabase from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import { APP_ORIGIN, PORT } from "./constants/env";
import { OK } from "./constants/statusCode";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.use("/health", (req, res) => {
  res.status(OK).json({ message: "Server is running" });
});

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
  connectToDatabase();
});
