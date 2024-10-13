import { NextFunction, Request, Response } from "express";
import productService from "../../services/productService";

export async function checkProductId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.id;
  try {
    const existingProduct = await productService.checkProductExist(productId);
    if (existingProduct) {
      res.locals.product = existingProduct;
      next();
    } else {
      throw new Error("Invalid product ID");
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
