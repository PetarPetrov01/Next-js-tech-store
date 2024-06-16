"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: null | string;
};

const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters long" }),
});

export const login = async (prevState: State, formData: FormData) => {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

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
      console.log(result);
      throw new Error(result.message);
    }
  } catch (error: any) {
    console.log("in catch");
    const message = error.message;
    return message;
  }
  console.log("out of try");
  redirect("/");
};
