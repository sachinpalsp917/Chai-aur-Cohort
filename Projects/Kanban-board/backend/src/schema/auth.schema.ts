import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(3).max(13),
    email: z.string().email("Email is invalid"),
    fullname: z.string().min(3).max(15),
    password: z.string().min(6).max(15),
    confirmPassword: z.string().min(6).max(15),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });
