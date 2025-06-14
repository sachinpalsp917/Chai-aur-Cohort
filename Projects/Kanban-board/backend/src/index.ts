import "dotenv/config";
import express from "express";
import connectToDatabase from "./config/db";

const app = express();

app.listen(3000, () => {
  console.log(`Server running on PORT 3000`);
  connectToDatabase();
});
