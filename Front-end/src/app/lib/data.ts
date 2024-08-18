"use server";

import { cookies } from "next/headers";
import { PopulatedProduct, Product } from "../../types/Product";


export const getProds = async (): Promise<Product[]> => {
  const authCookie = cookies().get("auth-cookie");

  const headers = authCookie
    ? { Cookie: `${authCookie.name}=${authCookie.value}` }
    : undefined;

  const res = await fetch("http://localhost:3030/api/products", {
    headers,
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
