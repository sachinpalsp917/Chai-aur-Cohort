<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { email, password, name, phone } = req.body;
  if (!email || !password || !name || !phone) {
    return res.status(400).json({
      message: "Please provide all the fields",
    });
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }, // `phone` can't be used like this in `findUnique`
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: {
        email,
        phone,
        name,
        password: hashedPassword,
        verificationToken,
      },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_HOST,
      port: process.env.MAIL_TRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAIL_TRAP_SENDEREMAIL,
      to: user.email,
      subject: "Verify your email",
      text: `http://127.0.0.1:3000/api/v1/users/verify/${verificationToken}`,
    };

    transporter.sendMail(mailOption);

    res.status(200).json({
      message: "User created successfully",
      user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      message: "please provide all the details",
    });

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return res.status(400).json({
        message: "Please provide a valid mail",
      });

    const check = await bcryptjs.compare(password, user.password);
    if (!check)
      return res.status(400).json({
        message: "Please provide correct password",
      });
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    const cookieOption = {
      httpOnly: true,
      maxAge: 24 * 1000 * 60 * 60,
    };
    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      message: "Login successfull",
      token,
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });
    res.status(200).json({
      message: "User successfully fetched",
      user: user,
    });
  } catch (error) {}
};

const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token)
      return res.status(400).json({
        message: "Please enter a valid token",
      });
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
      },
    });
    if (!user)
      return res.status(400).json({
        message: "Failed to validate token",
      });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: "",
      },
    });
    res.status(200).json({
      message: "user verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      messsage: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "");
    res.status(200).json({
      message: "successfully loggeed out",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "please provide a valid email" });
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordResetToken: token,
      },
    });

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_TRAP_HOST,
      port: process.env.MAIL_TRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAIL_TRAP_SENDEREMAIL,
      to: user.email,
      subject: "Verify your email",
      text: `Please click on the following link ${process.env.BASE_URL}/api/v1/resetPassword/${token}`,
    };

    transporter.sendMail(mailOption);
    res.status(200).json({
      message: "Reset password token has been sent",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const resetPasswordVerifcation = async (req, res) => {
  try {
    const { password } = req.body;
    const { passwordResetToken } = req.params;
    if (!password)
      return res.status(400).json({
        message: "please enter a password",
      });
    if (!passwordResetToken) {
      return res.status(400).json("invalid token");
    }
    const encryptedPassword = await bcryptjs.hash(password, 10);
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: encryptedPassword,
        passwordResetToken: "",
      },
    });
    res.status(200).json({
      message: "Password successfully updated",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.user;

    // Build the update object dynamically
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isVerified: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
  registerUser,
  loginUser,
  getUser,
  verifyUser,
  logoutUser,
  resetPassword,
  resetPasswordVerifcation,
  updateUser,
};
=======
const registerUser = async function (req, res) {
  console.log("user registers success");
};

export { registerUser };
>>>>>>> origin/main
