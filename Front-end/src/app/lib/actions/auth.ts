"use server";

import { cookies } from "next/headers";

import formatError from "@/app/utils/formatError";
import constructCookie from "@/app/utils/constructCookie";

import { User } from "@/types/User";
import { RegisterData } from "@/types/Actions";
import { FormattedError } from "@/types/Errors";

const baseUrl = "http://localhost:3001/api/auth";

export const login = async (data: {
  email: string;
  password: string;
}): Promise<{ error: FormattedError | null; result: User | null }> => {
  try {
    const res = await fetch(`${baseUrl}/login`, {
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
): Promise<{ error: FormattedError | null; result: User | null }> => {
  try {
    const res = await fetch(`${baseUrl}/register`, {
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
