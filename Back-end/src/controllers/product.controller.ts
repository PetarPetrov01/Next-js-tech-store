import { Request, Response } from "express";

import productService from "../services/productService";

async function getProducts(req: Request, res: Response) {
  try {
    const prods = await productService.getProducts();
    res.json(prods)
  } catch (error) {
    console.log(error);
  }
}

export default {getProducts}
