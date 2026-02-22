"use server";

import { auth } from "@/auth";
import { prisma } from "@/app/lib/config/db-config";
import { FormattedError } from "@/types/Errors";
import { Categories } from "@/types/Product";

export async function createCategory(
  name: string
): Promise<{ error: FormattedError | null; result: Categories[number] | null }> {
  const session = await auth();
  if (!session?.user) {
    return { error: { message: "Not authenticated" }, result: null };
  }

  try {
    const category = await prisma.category.create({ data: { name } });
    return { error: null, result: { id: category.id, name: category.name, _count: 0 } };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: { message: "A category with this name already exists" }, result: null };
    }
    console.error("Create category error:", error);
    return { error: { message: "Failed to create category" }, result: null };
  }
}
