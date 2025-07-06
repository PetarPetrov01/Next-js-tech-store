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
} from "../../../types/Product";

const baseUrl = "http://localhost:3001/api";

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


