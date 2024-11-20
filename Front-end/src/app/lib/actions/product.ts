"use server";

import { cookies } from "next/headers";

import formatError from "../../utils/formatError";

import { postProductSchemaType } from "@/zodSchemas/postProductSchema";
import { Product } from "@/types/Product";
import { ReturnedImages } from "@/types/Actions";
import { FormattedError } from "@/types/Errors";

const baseUrl = "http://localhost:3001/api/products";

export const postProduct = async (
  data: postProductSchemaType,
  productId: string | null = null
): Promise<{ error: FormattedError | null; result: Product | null }> => {
  try {
    const method = productId ? "put" : "post";
    const endpoint = productId ? `${productId}/edit` : "upload";

    const res = await fetch(`${baseUrl}/${endpoint}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      cache: "no-cache",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: formatError(error), result: null };
    }

    const product: Product = await res.json();
    return { result: product, error: null };
  } catch (error: any) {
    console.log(error.message);
    return { error: formatError(error), result: null };
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(`${baseUrl}/${productId}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Cookie: cookies().toString(),
      },
      cache: "no-cache",
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: formatError(error), result: null };
    }

    return { error: null, result: true };
  } catch (error: any) {
    console.log(error.message);
    return { error: formatError(error), result: null };
  }
};

export const editProduct = (data: postProductSchemaType, productId: string) => {
  return postProduct(data, productId);
};

export const uploadImages = async (
  productId: string,
  formData: FormData
): Promise<{
  result: { images: ReturnedImages[] } | null;
  error: FormattedError | null;
}> => {
  try {
    const response = await fetch(`${baseUrl}/${productId}/images`, {
      method: "post",
      body: formData,
      headers: {
        Cookie: cookies().toString(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: formatError(error), result: null };
    }

    const images = await response.json();

    return { error: null, result: images };
  } catch (error: any) {
    console.log(error.message);
    return { error: formatError(error), result: null };
  }
};