import { User } from "@/types/User";
import { customFetch } from "./customFetch";

export async function checkAuth(): Promise<User | null> {
  try {
    const res = await fetch("http://localhost:3001/api/auth/validate", {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    });

    if (!res.ok) {
      const err = await res.json()
      throw new Error(err)
    }

    const user = await res.json();

    return user;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}
