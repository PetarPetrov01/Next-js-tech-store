"use server"

import { prisma } from '../config/db-config'
import { Brands, Categories } from "../../../types/Product";

export const getCategories = async (): Promise<Categories> => {
  const categories = await prisma.category.findMany({
    include: { _count: true },
    orderBy: { products: { _count: "desc" } },
  });

  return categories.map((cat) => ({ ...cat, _count: cat._count.products }));
};

export const getSortedBrands = async (
  catId: number | null
): Promise<Brands> => {

  const allBrands = await prisma.brand.findMany({
    include: {
      products: { select: { categoryId: true } },
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: "asc" },
  });

  if (catId) {
    const sortedBrands = allBrands.sort((a, b) => {
      const aMatchesCategory = a.products.some(
        (p) => p.categoryId == catId
      );
      const bMatchesCategory = b.products.some(
        (p) => p.categoryId == catId
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
};

export const getBrandsByCategory = async (
  catId: number | null
): Promise<Brands> => {
  let categoryId: number | undefined = undefined;

  if (catId) {
    categoryId = Number(catId);
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

};


