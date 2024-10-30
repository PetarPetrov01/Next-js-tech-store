import { Prisma, Product } from "@prisma/client";
import { prisma } from "../config/db-config";
import categoryService from "./categoryService";
import { PostProductSchemaType } from "../middlewares/validations/post-product";

type CheckProductReturnType = "brand" | "images";

type ProductWithBrand = {
  id: string;
  ownerId: string;
  brand: { name: string };
};

type ProductWithImages = {
  id: string;
  ownerId: string;
  name: string;
  images: { id: string; url: string }[];
};

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

async function uploadProduct(data: PostProductSchemaType, userId: string) {
  const createdProd = await prisma.$transaction(async (tx) => {
    let category = await tx.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw new Error("The category does not exist!");
    }

    let brand = await tx.brand.findUnique({ where: { id: data.brandId } });

    if (!brand) {
      throw new Error("The brand does not exist!");
    }

    return tx.product.create({
      data: {
        name: `${data.brandId} ${data.model}`,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        categoryId: category.id,
        brandId: brand.id,
        model: data.model,
        ownerId: userId,
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

async function checkProductExistence(
  productId: string,
  returnType: CheckProductReturnType = "brand"
) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      ownerId: true,
      ...(returnType == "brand"
        ? {
            brand: { select: { name: true } },
          }
        : {
            name: true,
            images: { select: { id: true, url: true } },
          }),
    },
  });

  if (product) {
    if (returnType == "brand") {
      return {
        ...product,
        brand: (product as ProductWithBrand).brand.name,
      };
    } else {
      return product as ProductWithImages;
    }
  }
  return null;
}

export default {
  getProducts,
  getProductById,
  uploadProduct,
  updateProductImages,
  checkProductExistence,
};
