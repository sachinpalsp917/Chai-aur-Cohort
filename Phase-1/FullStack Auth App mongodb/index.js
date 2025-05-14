import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/dbconnect.js";
import cookieParser from "cookie-parser";

//import all routes
import userRoutes from "./route/user.route.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); //express allows user to send json data
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello from sachin");
});
//connect to db
db();

//user routes
app.use("/api/v1/users", userRoutes);

app.listen(port, (req, res) => {
  console.log("Server running on port ", port);
});
