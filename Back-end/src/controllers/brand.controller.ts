import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
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

async function createBrand(req: Request, res: Response) {
  try {
    const brand = await brandService.createBrand(req.body.name);
    res.json(brand);
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.code);
      if (error.code == "P2002") {
        return res
          .status(400)
          .json({ message: "This brand already exists" });
      }
      return res.status(400).json({ message: error.message });
    }

    res.status(400).json(error.message);
  }
}

export default { getBrands, getSortedBrands, createBrand };
