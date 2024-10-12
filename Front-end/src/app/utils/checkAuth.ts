import { User } from "@/types/User";

export async function checkAuth(
  cookie: string | null = null
): Promise<User | null> {
  try {
    const options: RequestInit = {
      method: "GET",
      cache: "no-cache",
    };

    if (cookie) {
      // server component
      options.headers = { Cookie: cookie };
    } else {
      // client component
      options.credentials = "include"
    }

    const res = await fetch("http://localhost:3001/api/auth/validate", options);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err);
    }

    const user = await res.json();

    return user;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
