import { NextFunction, Request, Response } from "express";

import { expiredCookie } from "../controllers/auth.controller";
import { verifyJWT } from "../utils/jwt";
const authCookieName = "authToken";

export interface CustomRequest extends Request {
  user?: {
    _id: string;
    email: string;
  };
}

export default function session(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies[authCookieName];
  console.log(`Token - ${token}`);
  if (token) {
    try {
      const verifiedToken = verifyJWT(token);

      if (!verifiedToken.payload) {
        throw new Error("Expired access token!");
      }

      req.user = verifiedToken.payload;

    } catch (error: any) {
      res.cookie("authToken", "", expiredCookie);
      res.status(401).json({ message: error.message });
      return;
    }
  }

  next();
}
