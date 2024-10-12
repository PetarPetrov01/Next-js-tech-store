import { NextFunction, Response } from "express";
import { CustomRequest } from "./sesssion";
import { uploadMultiple, uploadSingle } from "../utils/multerValidation";
import multer from "multer";

export function uploadProfileImage(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({message: err.message})
    }
    next(err);
  });
}

export function uploadProductImages(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  uploadMultiple(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({message: err.message})
    }
    next();
  });
}
