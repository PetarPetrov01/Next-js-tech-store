import e, { Request, Response } from "express";

import productService from "../services/productService";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import categoryService from "../services/categoryService";

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

async function getCategories(req: Request, res: Response){
  try {
    const categories = await categoryService.getCategories()
    res.json(categories)
  } catch (error: any) {
    res.status(400).json(error.message)
  }
}

export default { getProducts };
