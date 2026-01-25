"use server";

import * as bcrypt from "bcrypt";
import { AuthError } from "next-auth";

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut, auth } from "@/auth";
import { prisma } from "@/app/lib/config/db-config";

import { User } from "@/types/User";
import { RegisterData } from "@/types/Actions";
import { FormattedError } from "@/types/Errors";

const SALT_ROUNDS = 10;

/**
 * Sign in with credentials (email/password)
 */
export async function login(data: {
  email: string;
  password: string;
}): Promise<{ error: FormattedError | null; result: User | null }> {
  try {
    await nextAuthSignIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    // Get the session to return user data
    const session = await auth();

    if (!session?.user) {
      return { error: { message: "Failed to get user session" }, result: null };
    }

    return {
      error: null,
      result: {
        id: session.user.id,
        email: session.user.email,
        username: session.user.username,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        image: session.user.image ?? undefined,
      },
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: { message: "Invalid email or password" }, result: null };
        default:
          return { error: { message: "Authentication failed" }, result: null };
      }
    }
    // Re-throw if it's a redirect (NextAuth handles redirects via errors)
    throw error;
  }
}

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle() {
  await nextAuthSignIn("google", { redirectTo: "/" });
}

/**
 * Sign out the current user
 */
export async function logout() {
  await nextAuthSignOut({ redirectTo: "/login" });
}

/**
 * Register a new user and sign them in
 */
export async function registerUser(
  data: RegisterData
): Promise<{ error: FormattedError | null; result: User | null }> {
  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return { error: { message: "This email is already taken" }, result: null };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: hashedPassword,
      },
    });

    // Sign in the newly created user
    await nextAuthSignIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return {
      error: null,
      result: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        image: newUser.image ?? undefined,
      },
    };
  } catch (error: unknown) {
    console.error("Registration error:", error);
    if (error instanceof Error) {
      return { error: { message: error.message }, result: null };
    }
    return { error: { message: "Registration failed" }, result: null };
  }
}

/**
 * Check if an email is available for registration
 */
export async function checkEmail(
  email: string
): Promise<{ isFree: boolean; error: { message: string } | null }> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });

    return { isFree: !existingUser, error: null };
  } catch (error: unknown) {
    console.error("Check email error:", error);
    return { isFree: false, error: { message: "Failed to check email availability" } };
  }
}

/**
 * Update the current user's username
 */
export async function updateUsername(
  username: string
): Promise<{ error: FormattedError | null; result: User | null }> {
  try {
    const session = await auth();

    if (!session?.user) {
      return { error: { message: "Not authenticated" }, result: null };
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { username },
    });

    return {
      error: null,
      result: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        image: updatedUser.image ?? undefined,
      },
    };
  } catch (error: unknown) {
    console.error("Update username error:", error);
    if (error instanceof Error) {
      return { error: { message: error.message }, result: null };
    }
    return { error: { message: "Failed to update username" }, result: null };
  }
}

/**
 * Get the current user's profile
 */
export async function getProfile(): Promise<{
  error: FormattedError | null;
  result: User | null;
}> {
  try {
    const session = await auth();

    if (!session?.user) {
      return { error: { message: "Not authenticated" }, result: null };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        image: true,
      },
    });

    if (!user) {
      return { error: { message: "User not found" }, result: null };
    }

    return {
      error: null,
      result: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image ?? undefined,
      },
    };
  } catch (error: unknown) {
    console.error("Get profile error:", error);
    if (error instanceof Error) {
      return { error: { message: error.message }, result: null };
    }
    return { error: { message: "Failed to get profile" }, result: null };
  }
}

/**
 * Get the current session (server-side)
 */
export async function getSession() {
  return await auth();
}
