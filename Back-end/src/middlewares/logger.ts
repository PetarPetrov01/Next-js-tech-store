import { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  const { method, url } = req;
  console.log(`${method} - ${url}`);
  next();
}
