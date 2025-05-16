import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  resetPasswordVerifcation,
  updateUser,
  verifyUser,
} from "../controller/auth.controller.js";
import isLoggedIn from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/verify/:token", verifyUser);
userRoutes.get("/me", isLoggedIn, getUser);
userRoutes.post("/logout", logoutUser);
userRoutes.post("/resetPassword", resetPassword);
userRoutes.post(
  "/resetPasswordVerify/:passwordResetToken",
  resetPasswordVerifcation
);
userRoutes.patch("/update", isLoggedIn, updateUser);

export default userRoutes;
