import { z } from "zod";

export const UserRegisterSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: "First name is required" })
      .min(3, { message: "First name must be atleast 3 characters long" }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" })
      .min(3, { message: "Last name must be atleast 3 characters long" }),
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

  export type RegisterSchemaType = z.infer<typeof UserRegisterSchema>