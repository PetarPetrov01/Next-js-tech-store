import * as bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { prisma } from "@/app/lib/config/db-config";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    image?: string | null;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    image?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.image,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          // Link the Google account to existing user
          user.id = existingUser.id;
          user.username = existingUser.username;
          user.firstName = existingUser.firstName;
          user.lastName = existingUser.lastName;
          user.image = existingUser.image || user.image;
        } else {
          // Create new user for Google sign-in
          const nameParts = user.name?.split(" ") || ["User"];
          const firstName = nameParts[0] || "User";
          const lastName = nameParts.slice(1).join(" ") || "";
          const username = user.email!.split("@")[0];

          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              firstName,
              lastName,
              username,
              image: user.image,
              password: null,
            },
          });

          user.id = newUser.id;
          user.username = newUser.username;
          user.firstName = newUser.firstName;
          user.lastName = newUser.lastName;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email!;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.image = user.image;
      }

      // Handle session update (e.g., when username is updated)
      if (trigger === "update" && session) {
        token.username = session.username ?? token.username;
        token.firstName = session.firstName ?? token.firstName;
        token.lastName = session.lastName ?? token.lastName;
        token.image = session.image ?? token.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days (matching Express implementation)
  },
  secret: process.env.NEXTAUTH_SECRET,
});
