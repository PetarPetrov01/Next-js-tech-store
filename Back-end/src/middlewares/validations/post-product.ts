import { z } from "zod";
import { validateRequestBody } from "zod-express";

const postProductSchema = z.object({
  categoryId: z
    .number({ message: "Please select category" })
    .refine((num) => num > 0, { message: "Please select category" }),
  brandId: z
    .number({ message: "Please select brand" })
    .refine((num) => num > 0, { message: "Please select category" }),
  model: z
    .string()
    .trim()
    .min(1, { message: "Model is required" })
    .min(3, { message: "Model must be atleast 3 characters long" })
    .max(15, { message: "Model must no more than 15 characters long" }),
  price: z
    .number({ message: "Must be a number" })
    .min(1, { message: "Price can't be a negative number" }),
  stock: z
    .number({ message: "Must be a number" })
    .min(1, { message: "Stock can't be a negative number" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .min(30, { message: "Description must be alteast 30 characters long" })
    .max(250, { message: "Description no more than 250 characters long" }),
});

const validatePostProduct = validateRequestBody(postProductSchema, {
  sendErrors(errors, res) {
    const errs = errors[0].errors.issues.map((err) => {
      return {
        message: err.message,
      };
    });
    res.status(400).json(errs);
  },
});

export type PostProductSchemaType = z.infer<typeof postProductSchema>;

export default validatePostProduct;
