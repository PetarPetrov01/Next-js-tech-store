"use server";

import { auth } from "@/auth";
import { prisma } from "@/app/lib/config/db-config";
import { postProductSchemaType } from "@/zodSchemas/postProductSchema";
import { Product } from "@/types/Product";
import { FormattedError } from "@/types/Errors";

export async function postProduct(
  data: postProductSchemaType,
  productId: string | null = null
): Promise<{ error: FormattedError | null; result: Product | null }> {
  const session = await auth();
  if (!session?.user) {
    return { error: { message: "Not authenticated" }, result: null };
  }

  try {
    const product = await prisma.$transaction(async (tx) => {
      const category = await tx.category.findUnique({ where: { id: data.categoryId } });
      if (!category) throw new Error("Category not found");

      const brand = await tx.brand.findUnique({ where: { id: data.brandId } });
      if (!brand) throw new Error("Brand not found");

      if (productId) {
        // Edit - verify ownership
        const existing = await tx.product.findUnique({ where: { id: productId }, select: { ownerId: true } });
        if (!existing || existing.ownerId !== session.user.id) throw new Error("Forbidden");

        return tx.product.update({
          where: { id: productId },
          data: {
            name: `${brand.name} ${data.model}`,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            categoryId: category.id,
            brandId: brand.id,
            model: data.model,
          },
        });
      } else {
        // Create
        return tx.product.create({
          data: {
            name: `${brand.name} ${data.model}`,
            description: data.description,
            price: Number(data.price),
            stock: Number(data.stock),
            categoryId: category.id,
            brandId: brand.id,
            model: data.model,
            ownerId: session.user.id,
          },
        });
      }
    });

    return { error: null, result: product };
  } catch (error: any) {
    console.error("Product action error:", error);
    return { error: { message: error.message || "Operation failed" }, result: null };
  }
}

export async function deleteProduct(productId: string): Promise<{ error: FormattedError | null; result: boolean | null }> {
  const session = await auth();
  if (!session?.user) {
    return { error: { message: "Not authenticated" }, result: null };
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { ownerId: true },
    });

    if (!product || product.ownerId !== session.user.id) {
      return { error: { message: "Forbidden" }, result: null };
    }

    await prisma.product.delete({ where: { id: productId } });
    return { error: null, result: true };
  } catch (error: any) {
    console.error("Delete product error:", error);
    return { error: { message: "Failed to delete product" }, result: null };
  }
}

export async function editProduct(data: postProductSchemaType, productId: string) {
  return postProduct(data, productId);
}
