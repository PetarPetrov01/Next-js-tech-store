import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import brandService from "../services/brandService";
import { Request, Response } from "express";

async function getBrands(req: Request, res: Response) {
  try {
    const brands = await brandService.getBrands(req.query);
    res.json(brands);
  } catch (error: any) {
    if (error instanceof PrismaClientValidationError) {
      error as PrismaClientValidationError;
      console.log(error.message);
      res.status(400).json({ message: "Invalid query" });
      return;
    }
    res.status(400).json(error.message);
  }
}

async function getSortedBrands(req: Request, res: Response) {
  try {
    const brands = await brandService.getSortedBrands(req.query);
    res.json(brands);
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
}

export default { getBrands, getSortedBrands };
