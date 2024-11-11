import { z } from "zod";

export const UserLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export type LoginSchemaType = z.infer<typeof UserLoginSchema>;
