import { prisma } from "../config/db-config";

async function getProducts() {
  const prods = await prisma.product.findMany({
    include: {
      category: { select: { name: true } },
      brand: { select: { name: true } },
      images: { select: { url: true } },
    },
  });

  return prods.map((p) => ({
    ...p,
    category: p.category.name,
    brand: p.brand.name,
    images: p.images.map((i) => i.url),
  }));
}

export default { getProducts };
