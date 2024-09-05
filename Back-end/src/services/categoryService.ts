import { prisma } from "../config/db-config";

async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}

export default { getCategories };
