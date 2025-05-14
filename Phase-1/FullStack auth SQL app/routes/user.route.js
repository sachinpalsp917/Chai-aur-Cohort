import express from "express";
import { registerUser } from "../controller/auth.controller.js";

const userRoutes = express.Router();

userRoutes.get("/register", registerUser);

export default userRoutes;
