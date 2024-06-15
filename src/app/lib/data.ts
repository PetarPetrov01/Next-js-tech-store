"use server";
import { cookies } from "next/headers";
import { PopulatedProduct, Product } from "../types/Product";
import { User } from "../types/User";
import next from "next";

export const getProds = async (): Promise<Product[]> => {
  const res = await fetch("http://localhost:3030/products", {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();
  console.log(cookies().getAll());
  return data;
};

export const getProduct = async (prodId: string): Promise<PopulatedProduct> => {
  const res = await fetch(`http://localhost:3030/products/${prodId}`);
  console.log(cookies().getAll());
  return res.json();
};

export const login = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch("http://localhost:3030/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    const authCookie = res.headers.getSetCookie()[0];
    cookies().set("auth", authCookie);

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
