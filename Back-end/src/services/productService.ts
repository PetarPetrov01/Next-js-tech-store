import { prisma } from "../config/db-config";

async function getProducts() {
  const prods = await prisma.product.findMany({
    include: { category: { select: { name: true } } },
  });
  return prods.map((p)=>({...p,category: p.category.name}));
}

export default { getProducts };
