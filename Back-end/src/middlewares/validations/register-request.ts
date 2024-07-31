import { z } from "zod";
import { validateRequest, validateRequestBody } from "zod-express";

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

const validateRegister = validateRequestBody(userSchema,{
    sendErrors(errors, res) {
        const errs = errors[0].errors.issues.map((err)=>{
            return {
                //consider path
                message: err.message
            }
        })
        res.status(400).json(errs);
    }
})

export default validateRegister