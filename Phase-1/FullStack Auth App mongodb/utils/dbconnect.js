import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((value) => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("Error connecting DB", err);
    });
};

export default db;
