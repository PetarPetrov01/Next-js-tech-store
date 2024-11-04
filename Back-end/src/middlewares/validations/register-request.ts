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
    .min(3, { message: "Must be atleast 3 characters long" }),
  lastName: z
    .string()
    .trim()
    .min(3, { message: "Must be atleast 3 characters long" }),
  username: z
    .string()
    .trim()
    .min(3, { message: "Must be atleast 3 characters long" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Must be atleast 6 characters long" }),
});

const validateRegister = validateRequestBody(userSchema, {
  sendErrors(errors, res) {
    const errs = errors[0].errors.issues.map((err) => {
      return {
        //consider path
        message: `${err.path} - ${err.message}`,
      };
    });
    res.status(400).json(errs);
  },
});

export type RegisterSchemaType = typeof userSchema;

export default validateRegister;
