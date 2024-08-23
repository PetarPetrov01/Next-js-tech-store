import { User } from "@/types/User";

export async function checkAuth(): Promise<User | null> {
  try {
    const res = await fetch("http://localhost:3001/api/auth/validate", {
      method: "GET",
      credentials: "include",
      cache: "no-cache",
    });

    if (res.ok) {
      const user = await res.json();
      return user;
    } else {
      throw new Error(await res.json());
    }
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
}
