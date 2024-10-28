import { Request, Response } from "express";
import categoryService from "../services/categoryService";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

async function getCategories(req: Request, res: Response) {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
}

async function createCategory(req: Request, res: Response) {
  try {
    const category = await categoryService.createCategory(req.body.name);
    res.json(category);
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.code);
      if (error.code == "P2002") {
        return res
          .status(400)
          .json({ message: "This category already exists" });
      }
      return res.status(400).json({ message: error.message });
    }
    
    res.status(400).json(error.message);
  }
}

export default { getCategories, createCategory };
