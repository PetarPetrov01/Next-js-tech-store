import { prisma } from "../config/db-config";

async function getProducts(params: any) {
  console.log("params");

  const getOrderByCluase = (sortParam: any) => {
    if(!sortParam){
      return undefined
    }

    if (sortParam.key == "brand") {
      return {
        ["brand"]: {
          ["name"]: sortParam.order,
        },
      };
    } else {
      return {
        [sortParam.key]: sortParam.order,
      };
    }
  };

  const orderBy = getOrderByCluase(params?.sort)
  console.log(orderBy)

  const prods = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: { contains: params.search || undefined, mode: "insensitive" },
        },
        {
          brand: {
            name: { contains: params.search || undefined, mode: "insensitive" },
          },
        },
      ],
      category: { id: Number(params.category) || undefined },
      brand: { name: params.brand || undefined },
      price: {
        gte: params.price?.gte || undefined,
        lte: params.price?.lte || undefined,
      },
    },
    include: {
      category: { select: { name: true } },
      brand: { select: { name: true } },
      images: { select: { url: true } },
    },
    orderBy,
    // orderBy: { [params.sort?.key]: params.sort?.order || undefined },
  });

  return prods.map((p) => ({
    ...p,
    category: p.category.name,
    brand: p.brand.name,
    images: p.images.map((i) => i.url),
  }));
}

export default { getProducts };
