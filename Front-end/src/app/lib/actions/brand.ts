"use server";

import { auth } from "@/auth";
import { prisma } from "@/app/lib/config/db-config";
import { FormattedError } from "@/types/Errors";

export async function createBrand(
  name: string
): Promise<{ error: FormattedError | null; result: { id: number; name: string } | null }> {
  const session = await auth();
  if (!session?.user) {
    return { error: { message: "Not authenticated" }, result: null };
  }

  try {
    const brand = await prisma.brand.create({ data: { name } });
    return { error: null, result: brand };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: { message: "A brand with this name already exists" }, result: null };
    }
    console.error("Create brand error:", error);
    return { error: { message: "Failed to create brand" }, result: null };
  }
}
