import { Prisma } from "@prisma/client";
import { prisma } from "../config/db-config";
import categoryService from "./categoryService";

async function getProducts(params: any) {
  const getOrderByClause = (sortParam: any) => {
    if (!sortParam) {
      return { name: "asc" } as Prisma.ProductOrderByWithRelationInput;
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

  const orderBy = getOrderByClause(params?.sort);

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
        {
          model: { contains: params.search || undefined, mode: "insensitive" },
        },
      ],
      category: { id: Number(params.category) || undefined },
      brand: { id: Number(params.brand) || undefined },
      price: {
        gte: Number(params.price?.gte) || undefined,
        lte: Number(params.price?.lte) || undefined,
      },
    },
    include: {
      category: { select: { name: true } },
      brand: { select: { name: true } },
      images: { select: { url: true } },
    },
    orderBy,
  });

  return prods.map((p) => ({
    ...p,
    category: p.category.name,
    brand: p.brand.name,
    images: p.images.map((i) => i.url),
  }));
}

async function getProductById(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: { select: { name: true } },
      brand: { select: { name: true } },
      images: { select: { url: true } },
    },
  });

  return {
    ...product,
    category: product?.category.name,
    brand: product?.brand.name,
    images: product?.images.map((img) => img.url),
  };
}

export default { getProducts, getProductById };
