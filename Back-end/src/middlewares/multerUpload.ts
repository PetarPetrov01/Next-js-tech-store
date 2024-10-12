import { NextFunction, Response } from "express";
import multer from "multer";

import { CustomRequest } from "./sesssion";
import { uploadMultiple, uploadSingle } from "../utils/multerValidation";

function profileImage(req: CustomRequest, res: Response, next: NextFunction) {
  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  });
}

function productImages(req: CustomRequest, res: Response, next: NextFunction) {
  uploadMultiple(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}

// const multerUpload = { profileImage, productImages };
export default { profileImage, productImages };
