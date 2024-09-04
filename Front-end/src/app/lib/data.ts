"use server";

import { PopulatedProduct, Product } from "../../types/Product";

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

  const res = await fetch(`${baseUrl}?${queryParamsArr.join('&')}`, {
    next: {
      revalidate: 10,
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const getProduct = async (prodId: string): Promise<PopulatedProduct> => {
  const res = await fetch(`http://localhost:3030/products/${prodId}`);
  return res.json();
};
