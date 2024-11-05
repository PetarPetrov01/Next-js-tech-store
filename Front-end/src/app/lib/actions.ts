"use server";

import { cookies } from "next/headers";
import { User } from "@/types/User";
import { RegisterSchemaType } from "@/zodSchemas/registerSchema";

interface ErrorObject {
  message: string;
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
      error: {
        message: error[0].message,
      },
      result: null,
    };
  } else if (isErrorObject(error)) {
    return { error: { message: error.message }, result: null };
  }

  return { error: { message: error.message }, result: null };
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
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.json();
      return formatError(error);
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
    return formatError(error);
  }
};

export const registerUser = async (
  data: RegisterData
): Promise<{ error: ErrorObject | null; result: User | null }> => {
  try {
    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.json();
      return formatError(error);
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
    return formatError(error);
  }
};
