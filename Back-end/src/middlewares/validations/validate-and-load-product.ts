import { NextFunction, Request, Response } from "express";
import productService from "../../services/productService";
import { CustomRequest } from "../sesssion";

export async function checkProductId(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.id;
  try {
    const existingProduct = await productService.checkProductExistence(
      productId
    );
    if (existingProduct) {
      if (req.user!._id != existingProduct.ownerId) {
        throw new Error("You are not the owner of this product!");
      }
      res.locals.product = existingProduct;
      next();
    } else {
      throw new Error("Invalid product ID");
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}
