"use server";

import { cookies } from "next/headers";
import { User } from "@/types/User";
import { RegisterSchemaType } from "@/zodSchemas/registerSchema";
import { postProductSchemaType } from "@/zodSchemas/postProductSchema";
import { Product } from "@/types/Product";
import { error } from "console";

const baseUrl = "http://localhost:3001/api";

interface ErrorObject {
  message: string;
}

interface ReturnedImages {
  id: number;
  url: string;
  productId: string;
}

type RegisterData = Omit<RegisterSchemaType, "repassword">;

type ErrorArray = Error[];

type CookieOptions = {
  name: string;
  value: string;
  path: string;
  maxAge: number;
  domain: string;
};

const isErrorObject = (error: any): error is ErrorObject => {
  return (
    error &&
    typeof error == "object" &&
    "message" in error &&
    typeof error.message == "string"
  );
};

const isErrorArray = (error: any): error is ErrorArray => {
  return (
    Array.isArray(error) &&
    "message" in error[0] &&
    typeof error[0].message == "string"
  );
};

const formatError = (error: any) => {
  if (isErrorArray(error)) {
    return {
      message: error[0].message,
    };
  } else if (isErrorObject(error)) {
    return { message: error.message };
  }

  return { message: error.message };
};

const constructCookie = (serializedCookie: string): CookieOptions => {
  const [cookieString, ...rest] = serializedCookie.split("; ");
  const [cookieName, authToken] = cookieString.split("=");
  const [maxAge, domain, path] = rest.map((str) => str.split("=")[1]);

  return {
    name: cookieName,
    value: authToken,
    path,
    maxAge: Number(maxAge),
    domain,
  };
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<{ error: ErrorObject | null; result: User | null }> => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: formatError(error), result: null };
    }

    const authCookie = res.headers.getSetCookie()[0];
    if (authCookie) {
      const cookie = constructCookie(authCookie);
      cookies().set(cookie);
    }

    const result = await res.json();
    return { result, error: null };
  } catch (error: any) {
    console.log(error.message);
    return { error: formatError(error), result: null };
  }
};

export const registerUser = async (
  data: RegisterData
): Promise<{ error: ErrorObject | null; result: User | null }> => {
  try {
    const res = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.json();
      return { error: formatError(error), result: null };
    }

    const authCookie = res.headers.getSetCookie()[0];

    if (authCookie) {
      const cookie = constructCookie(authCookie);
      cookies().set(cookie);
    }

    const result = await res.json();
    return { error: null, result };
  } catch (error: any) {
    console.log(error.message);
    return { error: formatError(error), result: null };
  }
};

export const checkEmail = async (
  email: string
): Promise<{ isFree: boolean; error: { message: string } | null }> => {
  const res = await fetch(`${baseUrl}/auth/checkEmail`, {
    method: "post",
    body: JSON.stringify({ email }),
    headers: { "Content-Type": "application/json" },
    cache: "no-cache",
  });

  if (!res.ok) {
    const error = await res.json();
    return { isFree: false, error: formatError(error) };
  }
  const result = await res.json();
  console.log(result);

  return { isFree: true, error: null };
};

export const postProduct = async (
  data: postProductSchemaType,
  productId: string | null = null
): Promise<{ error: ErrorObject | null; result: Product | null }> => {
  try {
    const method = productId ? "put" : "post";
    const endpoint = productId ? `${productId}/edit` : "upload";

    const res = await fetch(`${baseUrl}/products/${endpoint}`, {
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

export const uploadImages = async (
  productId: string,
  formData: FormData
): Promise<{
  result: { images: ReturnedImages[] } | null;
  error: ErrorObject | null;
}> => {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}/images`, {
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

export const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
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
