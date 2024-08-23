import { User } from "@/types/User";
import { customFetch } from "./customFetch";

export async function checkAuth(): Promise<User | null> {
  try {
    const user = await customFetch.interceptedFetch(
      "http://localhost:3001/api/auth/validate",
      {
        method: "GET",
        credentials: "include",
        cache: "no-cache",
      }
    );

    return user;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}
