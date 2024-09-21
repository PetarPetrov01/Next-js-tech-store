import { NextFunction, Request, Response } from "express";

export default function queryParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (Object.keys(req.query).length > 0) {
    if (req.query.sort) {
      const [key, order] = (req.query.sort as string).split(":");
      req.query.sort = {
        key,
        order,
      };
    }

    if (req.query.price) {
      const [gte, lte] = (req.query.price as string).split(":");
      req.query.price = { gte, lte };
    }
  }

  next();
}
