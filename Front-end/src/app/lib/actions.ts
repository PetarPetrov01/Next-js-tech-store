"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ErrorsState } from "../../types/Errors";

interface User {
  email: string,
  username: string,
  password: string,
  repassword: string
}

const UserLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .trim()
    .min(1,{message: 'Password is required'})
    .min(6, { message: "Password must be atleast 6 characters long" }),
});

export const login = async (email: string, password: string) => {
  try {
    const data = {email, password}

    const res = await fetch("http://localhost:3001/auth/login", {
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

export const registerUser = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries())
    
    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      cache: "no-store",
    });

    const authCookie = res.headers.getSetCookie()[0];
    console.log(authCookie);

    if (authCookie && res.statusText == "OK") {
      const [cookieString, cookiePathString] = authCookie.split("; ");
      const [cookieName, authToken] = cookieString.split("=");
      const cookiePath = cookiePathString.split("=")[1];

      console.log('setting cookie!!')
      cookies().set(cookieName, authToken, { path: cookiePath });
    }
    const result = await res.json();

    if (res.statusText != "OK") {
      throw new Error(result.message);
    }
  } catch (error) {
    console.log(error);
  }
};
