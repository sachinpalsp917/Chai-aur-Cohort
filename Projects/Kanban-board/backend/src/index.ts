import "dotenv/config";
import express from "express";
import connectToDatabase from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import { APP_ORIGIN } from "./constants/env";
import { OK } from "./constants/statusCode";

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

app.listen(3000, () => {
  console.log(`Server running on PORT 3000`);
  connectToDatabase();
});
