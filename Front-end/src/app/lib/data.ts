"use server";

import {
  Brands,
  Categories,
  PopulatedProduct,
  Product,
} from "../../types/Product";

type QueryParams = Record<string, string | number | boolean | null | undefined>;

const baseUrl = "http://localhost:3001/api/products";

export const getProds = async (
  queryParams: QueryParams
): Promise<Product[]> => {
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

  console.log(queryParamsArr);

  const res = await fetch(`${baseUrl}?${queryParamsArr.join("&")}`, {
    cache: "no-cache",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getCategories = async (): Promise<Categories> => {
  const res = await fetch("http://localhost:3001/api/products/categories", {
    next: { revalidate: 10 },
  });

  const data = await res.json();

  return data;
};

export const getBrands = async (catId: number | null): Promise<Brands> => {
  console.log("from data  -  " + catId);

  const res = await fetch(
    `${baseUrl}${catId ? `/brands?category=${catId}` : "/brands"}`,
    {
      cache: "no-cache",
    }
  );

  const data = await res.json();

  return data;
};

export const getProduct = async (prodId: string): Promise<PopulatedProduct> => {
  const res = await fetch(`http://localhost:3001/api/products/${prodId}`, {
    cache: "no-cache",
  });
  return res.json();
};
