import { z } from "zod";

export const postProductSchema = z.object({
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
  price: z.union([
    z.coerce
      .number({ message: "Price must be a number" })
      .positive({ message: "Price can't be a negative number" })
      .refine(
        (val) => {
          const vStr = val.toString();
          return vStr.includes(".") ? vStr.split(".")[1].length <= 2 : true;
        },
        { message: "Maximum precision is 2 decimal places" }
      ),
    z.literal("").refine((val) => false, { message: "Price is required" }),
  ]),
  stock: z.union([
    z.coerce
      .number({ message: "Stock must be a number" })
      .positive({ message: "Stock can't be a negative number" })
      .int({ message: "Stock must be an integer" })
      .max(1000, { message: "Stock can't be more than 1000" }),
    z.literal("").refine((val) => false, { message: "Stock is required" }),
  ]),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .min(30, { message: "Description must be alteast 30 characters long" })
    .max(250, { message: "Description no more than 250 characters long" }),
});

export type postProductSchemaType = z.infer<typeof postProductSchema>;
