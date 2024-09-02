import e, { Request, Response } from "express";

import productService from "../services/productService";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

async function getProducts(req: Request, res: Response) {
  try {
    const prods = await productService.getProducts(req.query);
    res.json(prods);
  } catch (error: any) {
    console.log(error);
    if (error instanceof PrismaClientValidationError) {
      error as PrismaClientValidationError;
      res.status(400).json({ message: "Invalid query" });
      return;
    }
    res.status(400).json(error.message);
  }
}

export default { getProducts };
