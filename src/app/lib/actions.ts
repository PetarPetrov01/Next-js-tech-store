"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ErrorsState } from "../../types/Errors";

const UserLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
});

const UserRegisterSchema = UserLoginSchema.extend({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long" }),
  repassword: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
});

export const login = async (prevState: ErrorsState, formData: FormData) => {
  try {
    const validatedFields = UserLoginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing fields",
      };
    }

    const data = validatedFields.data;

    const res = await fetch("http://localhost:3030/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
    });

    const authCookie = res.headers.getSetCookie()[0];

    if (authCookie && res.statusText == "OK") {
      const [cookieString, cookiePathString] = authCookie.split("; ");
      const [cookieName, authToken] = cookieString.split("=");
      const cookiePath = cookiePathString.split("=")[1];

      cookies().set(cookieName, authToken, { path: cookiePath });
    }
    const result = await res.json();

    if (res.statusText != "OK") {
      throw new Error(result.message);
    }
  } catch (error: any) {
    const message = error.message;
    return { message };
  }
  redirect("/");
};

export const register = async (prevState: ErrorsState, formData: FormData) => {
  try {
    const validatedFields = UserRegisterSchema.safeParse({
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      repassword: formData.get("repassword"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing fields",
      };
    }

    if (validatedFields.data.password != validatedFields.data.repassword) {
      return {
        message: "Passwords do not match",
      };
    }

    const data = validatedFields.data;

    const res = await fetch("http://localhost:3030/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
    });

    const authCookie = res.headers.getSetCookie()[0];

    if (authCookie && res.statusText == "OK") {
      const [cookieString, cookiePathString] = authCookie.split("; ");
      const [cookieName, authToken] = cookieString.split("=");
      const cookiePath = cookiePathString.split("=")[1];

      cookies().set(cookieName, authToken, { path: cookiePath });
    }
    const result = await res.json();

    if (res.statusText != "OK") {
      throw new Error(result.message);
    }
  } catch (error) {}
};
