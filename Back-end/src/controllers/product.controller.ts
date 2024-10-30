import { Request, Response } from "express";

import productService from "../services/productService";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { CustomRequest } from "../middlewares/sesssion";

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

async function getProductById(req: Request, res: Response) {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);

    if (!product.id) {
      throw new Error("Invalid productID");
    }

    res.json(product);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

async function uploadProduct(req: CustomRequest, res: Response) {
  try {
    const data = req.body;
    const userId = req.user?._id!;
    const createdProd = await productService.uploadProduct(data, userId);
    res.status(200).json(createdProd);
  } catch (error: any) {
    res.status(400).json({ mesage: error.mesage });
  }
}

async function getProductImages(req: CustomRequest, res: Response) {
  try {
    const productWithImages = productService.checkProductExistence(
      req.params.id,
      "images"
    );
    res.json(productWithImages);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export default {
  getProducts,
  getProductById,
  uploadProduct,
  getProductImages,
};
