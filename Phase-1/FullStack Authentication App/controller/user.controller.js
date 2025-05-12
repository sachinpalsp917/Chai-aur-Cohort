import bcrypt from "bcryptjs";
import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  //steps:
  //get data
  const { name, email, password } = req.body;
  //validate
  if (!name || !email || !password) {
    res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    //check if user alrady exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    //create a user in db
    const newUser = await User.create({ name, email, password });
    console.log(newUser);
    if (!newUser) {
      return res.status(400).json({
        message: "User not registered",
      });
    }
    //create verification token
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);

    //save token in db
    newUser.verificationToken = token;
    await newUser.save();

    //send token as email to user
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAILTRAP_SENDERMAIL,
      to: newUser.email,
      subject: "Verify your email",
      text: `Please verify your account: 
      http://127.0.0.1:3000/api/v1/users/verify/${token}`,
    };

    await transporter.sendMail(mailOptions);

    //send success status to user
    res.status(201).json({
      message: "User registerd successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered",
      error,
      success: false,
    });
  }
};

const verifyUser = async (req, res) => {
  //get token from url
  const { token } = req.params;
  console.log(token);
  //validate
  if (!token) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  //find user based on token
  const user = await User.findOne({ verificationToken: token });
  //if not
  if (!user) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  //set isVerfied fiels to be true
  user.isVerified = true;
  //remove verification token
  user.verificationToken = undefined;
  //save
  await user.save();
  //return response
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, "shhhhh", { expiresIn: 60 });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Login failed",
      error: error,
      success: false,
    });
  }
};

export { registerUser, verifyUser, loginUser };
