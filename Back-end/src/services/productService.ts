import { Prisma, Product } from "@prisma/client";
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

async function uploadProduct(data: {
  description: string;
  price: string;
  stock: string;
  model: string;
  brand: string;
  category: string;
}) {
  const createdProd = await prisma.$transaction(async (tx) => {
    let category = await tx.category.findUnique({
      where: { name: data.category },
    });

    if (!category) {
      category = await tx.category.create({ data: { name: data.category } });
    }

    let brand = await tx.brand.findUnique({ where: { name: data.brand } });

    if (!brand) {
      brand = await tx.brand.create({ data: { name: data.brand } });
    }

    return tx.product.create({
      data: {
        name: `${data.brand} ${data.model}`,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        categoryId: category.id,
        brandId: brand.id,
        model: data.model,
      },
    });
  });

  return createdProd;
}

async function updateProductImages(productId: string, imageUrls: string[]) {
  const result = await prisma.product.update({
    where: { id: productId },
    data: {
      images: { createMany: { data: imageUrls.map((url) => ({ url })) } },
    },
    select: { images: true },
  });

  return result;
}

async function checkProductExist(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, brand: { select: { name: true } } },
  });

  return product ? { id: product.id, brand: product.brand.name } : null;
}

export default {
  getProducts,
  getProductById,
  uploadProduct,
  updateProductImages,
  checkProductExist,
};
