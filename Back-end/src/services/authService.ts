import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../config/db-config";
import { User } from "@prisma/client";

const secret = process.env.jwtsecret || "1qsc2wdv3efv";

export async function login(email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw new Error("Invalid email or password");
  }

  if (existingUser.password) {
    const matchPass = await bcrypt.compare(password, existingUser.password);
    if (!matchPass) {
      throw new Error("Invalid email or password");
    }

    return createToken(existingUser);
  } else {
    throw new Error("Password not provided");
  }
}

async function createToken(user: User) {
  const payload = {
    _id: user.id,
    email: user.email,
  };

  return {
    user: {
      _id: user.id,
      email: user.email,
      username: user.username,
    },
    authToken: jwt.sign(payload, secret),
  };
}

export async function verifyJWT(token: string){
  return jwt.verify(token, secret);
}

export async function register() {}
