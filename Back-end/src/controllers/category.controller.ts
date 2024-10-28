import { Request, Response } from "express";
import categoryService from "../services/categoryService";

async function getCategories(req: Request, res: Response) {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

export default { getCategories };
