import { z } from "zod";
import { validateRequestBody } from "zod-express";

const userSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  firstName: z
    .string()
    .trim()
    .min(1, { message: "first name is required" })
    .min(3, { message: "first name be atleast 3 characters long" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "last name is required" })
    .min(3, { message: "last name be atleast 3 characters long" }),
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
});

const validateRegister = validateRequestBody(userSchema, {
  sendErrors(errors, res) {
    const errs = errors[0].errors.issues.map((err) => {
      return {
        //consider path
        message: err.message,
      };
    });
    res.status(400).json(errs);
  },
});

export type RegisterSchemaType = typeof userSchema;

export default validateRegister;
