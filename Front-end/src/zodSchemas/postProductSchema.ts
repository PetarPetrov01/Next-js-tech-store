import { z, ZodTypeAny } from "zod";

const createNumbersEnumFromObject = (arr: { id: number; name: string }[]) =>
  arr.map((obj) => obj.id).map((value) => z.literal(value)) as [
    z.ZodLiteral<number>,
    z.ZodLiteral<number>,
    ...z.ZodLiteral<number>[]
  ];

export default function createProductSchema(
  categories: { id: number; name: string }[]
) {
  return z.object({
    categoryId: z.union(createNumbersEnumFromObject(categories), {
      message: "Invalid category",
    }),
    brandId: z.number(),
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
}
