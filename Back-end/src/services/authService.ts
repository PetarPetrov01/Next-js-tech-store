import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prisma } from "../config/db-config";

import { User } from "@prisma/client";
import { signJWT, UserPayload } from "../utils/jwt";

const secret = process.env.JWT_SECRET || "1qsc2wdv3efv";

export interface SecuredUser {
  id: string;
  email: string;
  username: string;
  image: string;
}

async function login(email: string, password: string) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  console.log(existingUser)

  if (!existingUser || !existingUser.password) {
    throw new Error("Invalid email or password");
  }

  const matchPass = await bcrypt.compare(password, existingUser.password);
  if (!matchPass) {
    throw new Error("Invalid email or password");
  }

  const userPayload = {
    _id: existingUser.id,
    email: existingUser.email,
  }

  return {
    user:{
      ...userPayload,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      username: existingUser.username,
    },
    authToken: await signJWT(userPayload)
  }
}

async function register(
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  password: string
) {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("This email is already taken");
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      username,
      password: await bcrypt.hash(password, 10),
    },
  });

  const userPayload = {
    _id: newUser.id,
    email: newUser.email,
  }

  return {
    user:{
      ...userPayload,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
    },
    authToken: await signJWT(userPayload)
  }
}

async function updateImage(imageUrl: string, id: string) {
  return await prisma.user.update({
    where: { id: id },
    data: { image: imageUrl },
  });
}

export function verifyJWT(token: string): UserPayload {
  return jwt.verify(token, secret) as UserPayload;
}

const authService = {
  login,
  register,
  updateImage,
};
export default authService;
