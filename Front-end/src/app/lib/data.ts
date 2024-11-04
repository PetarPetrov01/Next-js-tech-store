"use server";

import { redirect } from "next/navigation";
import {
  Brands,
  Categories,
  PopulatedProduct,
  ProductWithImages,
} from "../../types/Product";

const baseUrl = "http://localhost:3001/api";

export const getProds = async (
  queryParams: URLSearchParams
): Promise<PopulatedProduct[]> => {
  const queryParamsArr: string[] = [];

  if (queryParams) {
    Object.values(queryParams).forEach(
      ([key, val]: [string, [keyof URLSearchParams]]) => {
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
  console.log("fetcihg cats...");
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

export const getProduct = async (prodId: string): Promise<PopulatedProduct> => {
  const res = await fetch(`${baseUrl}/products/${prodId}`, {
    cache: "no-cache",
  });
  return res.json();
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
