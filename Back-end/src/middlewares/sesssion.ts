import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../services/authService";
const authCookieName = "authcookie";

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

  if (token) {
    try {
      const payload = verifyJWT(token);
      req.user = payload;

      // req.token = token;
    } catch (error) {
      res.status(401).json({ message: "Invalid auth token" });
      return;
    }
  }
  console.log(token);

  next();
}
