import { z } from "zod";
import { validateRequest } from "zod-express";

const userSchema = z.object({
    email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .min(3, { message: "Username must be atleast 3 characters long" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters long" }),
  repassword: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters long" }),
})
.refine((data) => data.password == data.repassword, {
  message: "Passwords do not match",
  path: ["repassword"],
});