import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
  verifyUser,
} from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", isLoggedIn, userProfile);

export default router;
