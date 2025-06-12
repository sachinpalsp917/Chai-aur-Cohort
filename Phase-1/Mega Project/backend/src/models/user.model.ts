import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../constants/env";
import crypto from "crypto";

interface Avatar {
  url: string;
  localpath: string;
}

export interface UserDocument extends mongoose.Document {
  Avatar: Avatar;
  username: string;
  email: string;
  fullname: string;
  password: string;
  isEmailVerified: boolean;
  forgotPasswordToken: string;
  forgotPasswordExpiry: Date;
  emailVerficationToken: string;
  emailVerficationExpiry: Date;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Pick<
    UserDocument,
    | "_id"
    | "Avatar"
    | "username"
    | "email"
    | "fullname"
    | "isEmailVerified"
    | "forgotPasswordToken"
    | "forgotPasswordExpiry"
    | "emailVerficationToken"
    | "emailVerficationExpiry"
    | "refreshToken"
    | "createdAt"
    | "updatedAt"
  >;
  generateAccessToken(): string;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    Avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: `https://placehold.co/600x400`,
        localpath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerficationToken: {
      type: String,
    },
    emailVerficationExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashValue(this.password);
  next();
});

UserSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

UserSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: Number(ACCESS_TOKEN_EXPIRY) },
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: Number(REFRESH_TOKEN_EXPIRY) },
  );
};

UserSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 20 * 60 * 1000;

  return { unHashedToken, hashedToken, tokenExpiry };
};
const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
