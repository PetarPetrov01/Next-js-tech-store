import { prisma } from "../config/db-config";

async function getBrands(query: any) {
  let categoryId: number | undefined = undefined;
  
  if (query.category || !Number(query.category)) {
    categoryId = Number(query.category);
  }

  const brand = await prisma.brand.findMany({
    where: {
      products: { some: { ...(categoryId !== undefined && { categoryId }) } },
    },
    include: { _count: true },
  });

  return brand;
}

export default { getBrands };
