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
    model: z.string().trim().min(1, { message: "Model is required" }),
    price: z.number().min(1, { message: "Price is required" }),
    description: z
      .string()
      .trim()
      .min(1, { message: "Description is required" }),
    stock: z.number().min(1, { message: "Stock is required" }),
  });
}
