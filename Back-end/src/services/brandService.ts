import { prisma } from "../config/db-config";

async function getBrands(query: any) {
  let categoryId: number | undefined = undefined;

  if (query.category && Number(query.category)) {
    categoryId = Number(query.category);
  }

  const brands = await prisma.brand.findMany({
    where: {
      products: {
        some: { ...(categoryId !== undefined ? { categoryId } : {}) },
      },
    },
    include: { _count: true },
    orderBy: { name: "asc" },
  });

  return brands.map((brand) => ({ ...brand, _count: brand._count.products }));
}

async function getSortedBrands(query: any) {
  let categoryId: number | undefined = undefined;

  if (query.category && Number(query.category)) {
    categoryId = Number(query.category);
  }

  const allBrands = await prisma.brand.findMany({
    include: {
      products: { select: { categoryId: true } },
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: "asc" },
  });

  if (categoryId) {
    const sortedBrands = allBrands.sort((a, b) => {
      const aMatchesCategory = a.products.some(
        (p) => p.categoryId == categoryId
      );
      const bMatchesCategory = b.products.some(
        (p) => p.categoryId == categoryId
      );

      if (aMatchesCategory && !bMatchesCategory) return -1;
      if (!aMatchesCategory && bMatchesCategory) return 1;

      return a.name.localeCompare(b.name);
    });

    return sortedBrands.map((brand) => ({
      id: brand.id,
      name: brand.name,
      _count: brand._count.products,
    }));
  }

  return allBrands.map((brand) => ({
    id: brand.id,
    name: brand.name,
    _count: brand._count.products,
  }));
}

async function createBrand(name: string) {
  const brand = await prisma.brand.create({ data: { name } });

  return brand;
}

export default { getBrands, getSortedBrands, createBrand };
