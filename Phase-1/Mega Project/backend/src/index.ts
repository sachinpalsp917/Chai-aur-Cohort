import "dotenv/config";
import express from "express";
import { PORT } from "./constants/env";
import connectToDatabase from "./config/db";

const app = express();

connectToDatabase()
  .then()
  .catch((err) => {
    console.error(`MongoDB connection error`, err);
    process.exit(1);
  });
