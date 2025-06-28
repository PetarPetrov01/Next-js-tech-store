"use server"

import { prisma } from '../config/db-config'
import { Prisma } from '@prisma/client'
import { notFound, redirect } from "next/navigation";
import {
  APIProduct,
  Brands,
  Categories,
  populatedProductInclude,
  PopulatedProduct,
  ProductQueryParams,
  ProductWithImages,
} from "../../types/Product";

const baseUrl = "http://localhost:3001/api";

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

export const getProducts = async (
  searchParams: ProductQueryParams
): Promise<APIProduct[]> => {
  const orderBy = getOrderByClause(searchParams?.sort);

  const prods = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: { contains: searchParams.search || undefined, mode: "insensitive" },
        },
        {
          brand: {
            name: { contains: searchParams.search || undefined, mode: "insensitive" },
          },
        },
        {
          model: { contains: searchParams.search || undefined, mode: "insensitive" },
        },
      ],
      category: { id: Number(searchParams.category) || undefined },
      brand: { id: Number(searchParams.brand) || undefined },
      price: {
        gte: Number(searchParams.price?.gte) || undefined,
        lte: Number(searchParams.price?.lte) || undefined,
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
};

export const getCategories = async (): Promise<Categories> => {
  const res = await fetch(`${baseUrl}/products/categories`, {
    next: { revalidate: 50 },
  });

  const data = await res.json();

  return data;
};

export const getSortedBrands = async (
  catId: number | null
): Promise<Brands> => {
  const res = await fetch(
    `${baseUrl}/brands/sorted${catId ? `?category=${catId}` : ""}`,
    {
      next: { revalidate: 10 },
    }
  );

  const data = await res.json();

  return data;
};

export const getBrandsByCategory = async (
  catId: number | null
): Promise<Brands> => {
  const res = await fetch(
    `${baseUrl}${catId ? `/brands?category=${catId}` : "/brands"}`,
    {
      next: { revalidate: 10 },
    }
  );

  const data = await res.json();

  return data;
};

export const getProduct = async (productId: string): Promise<PopulatedProduct> => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: populatedProductInclude
  });

  if (!product) {
    throw new Error('Product not found');
  }

  console.log(product);

  return product;
};

export const getProductImages = async (
  prodId: string,
  cookie: string
): Promise<ProductWithImages> => {
  const res = await fetch(`${baseUrl}/products/${prodId}/images`, {
    headers: { Cookie: cookie },
    cache: "no-cache",
  });

  if (!res.ok) {
    const error = await res.json();
    redirect("/login");
  }

  const product = await res.json();
  // console.log(res);

  return product;
};
