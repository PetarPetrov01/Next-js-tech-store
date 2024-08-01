import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../config/db-config";
import { User } from "@prisma/client";

const secret = process.env.JWT_SECRET || "1qsc2wdv3efv";

interface UserPayload extends JwtPayload {
  _id: string;
  email: string;
}

export interface SecuredUser {
  id: string;
  email: string;
  username: string;
  image: string
}

async function login(email: string, password: string) {
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

async function register(email: string, username: string, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("This email is already taken");
  }

  const newUser = await prisma.user.create({
    data: { email, username, password: await bcrypt.hash(password, 10) },
  });

  return createToken(newUser);
}

async function updateImage(imageUrl: string, id: string) {
  return await prisma.user.update({
    where: { id: id },
    data: { image: imageUrl },
  });
}

function createToken(user: User) {
  const payload: UserPayload = {
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

export function verifyJWT(token: string): UserPayload {
  return jwt.verify(token, secret) as UserPayload;
}

const authService = {
  login,
  register,
  updateImage,
};
export default authService;
