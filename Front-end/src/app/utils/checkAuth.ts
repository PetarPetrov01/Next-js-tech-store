import { getSession } from "@/app/lib/actions/auth";
import { User } from "@/types/User";

export async function checkAuth(): Promise<User | null> {
  try {
    const session = await getSession();

    if (!session?.user) return null;

    return {
      id: session.user.id,
      email: session.user.email,
      username: session.user.username,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
      image: session.user.image ?? undefined,
    };
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
