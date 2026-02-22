"use server";

import { auth } from "@/auth";
import { prisma } from "@/app/lib/config/db-config";
import { cloudinary, extractPublicId } from "@/app/lib/utils/cloudinary";
import { FormattedError } from "@/types/Errors";

export async function saveProductImages(
  productId: string,
  imageUrls: string[]
): Promise<{ error: FormattedError | null; result: { id: number; url: string }[] | null }> {
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

    await prisma.productImage.createMany({
      data: imageUrls.map((url) => ({ url, productId })),
    });

    const allImages = await prisma.productImage.findMany({
      where: { productId },
      select: { id: true, url: true },
    });

    return { error: null, result: allImages };
  } catch (error: any) {
    console.error("Save images error:", error);
    return { error: { message: "Failed to save images" }, result: null };
  }
}

export async function deleteProductImages(
  productId: string,
  imageUrls: string[]
): Promise<{ error: FormattedError | null; result: { id: number; url: string }[] | null }> {
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

    // Delete from Cloudinary
    const publicIds = imageUrls
      .map(url => extractPublicId(url))
      .filter((id): id is string => id !== null);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
    }

    // Delete from database
    await prisma.productImage.deleteMany({
      where: { productId, url: { in: imageUrls } },
    });

    // Return remaining images
    const remainingImages = await prisma.productImage.findMany({
      where: { productId },
      select: { id: true, url: true },
    });

    return { error: null, result: remainingImages };
  } catch (error: any) {
    console.error("Delete images error:", error);
    return { error: { message: "Failed to delete images" }, result: null };
  }
}
