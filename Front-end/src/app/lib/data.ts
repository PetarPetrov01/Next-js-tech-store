"use server";

import {
  Brands,
  Categories,
  PopulatedProduct,
} from "../../types/Product";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

const baseUrl = "http://localhost:3001/api";

export const getProds = async (
  queryParams: QueryParams
): Promise<PopulatedProduct[]> => {
  const queryParamsArr: string[] = [];

  if (queryParams) {
    Object.entries(queryParams).forEach(
      ([key, val]: [string, QueryParams[keyof QueryParams]]) => {
        if (val) {
          queryParamsArr.push(`${key}=${encodeURIComponent(val.toString())}`);
        }
      }
    );
  }

  const res = await fetch(`${baseUrl}/products?${queryParamsArr.join("&")}`, {
    cache: "no-cache",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getCategories = async (): Promise<Categories> => {
  const res = await fetch(`${baseUrl}/products/categories`, {
    next: { revalidate: 10 },
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

export const getProduct = async (prodId: string): Promise<PopulatedProduct> => {
  const res = await fetch(`${baseUrl}/products/${prodId}`, {
    cache: "no-cache",
  });
  return res.json();
};
