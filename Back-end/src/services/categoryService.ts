import { prisma } from "../config/db-config";

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: { _count: true },
    orderBy: { products: { _count: "desc" } },
  });

  return categories.map((cat) => ({ ...cat, _count: cat._count.products }));
}

async function createCategory(name: string) {
  const category = await prisma.category.create({
    data: { name },
  });

  return category;
}

export default { getCategories, createCategory };
