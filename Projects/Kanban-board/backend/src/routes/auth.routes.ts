import { Router } from "express";
import { registerUser } from "../controller/auth.controller";

const authRoutes = Router();

//prefix: "/auth"
authRoutes.get("/register", registerUser);

export default authRoutes;
