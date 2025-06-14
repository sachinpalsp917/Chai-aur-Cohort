import mongoose from "mongoose";
import { string } from "zod";
import { compareValue, hashValue } from "../utils/bcrypt";

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
  emailVerificationToken: string;
  emailVerificationExpiry: Date;
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
    | "createdAt"
    | "updatedAt"
  >;
}
const userSchema = new mongoose.Schema<UserDocument>(
  {
    Avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: "https://placehold.co/600x400",
        localpath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
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
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashValue(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (value: string) {
  return compareValue(value, this.password);
};
userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
