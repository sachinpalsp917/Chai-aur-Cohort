import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("server running");
});

app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`server listerning at port ${port}`);
});
