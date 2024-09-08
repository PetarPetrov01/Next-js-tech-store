import { prisma } from "../config/db-config";

async function getBrands(query: any) {
  let categoryId: number | undefined = undefined;

  if (query.category && Number(query.category)) {
    categoryId = Number(query.category);
  }

  console.log('catId from serv  -  ' + categoryId);

  const brands = await prisma.brand.findMany({
    where: {
      products: {
        some: { ...(categoryId !== undefined ? { categoryId } : {}) },
      },
    },
    include: { _count: true },
  });

  return brands.map((brand) => ({ ...brand, _count: brand._count.products }));;
}

export default { getBrands };
