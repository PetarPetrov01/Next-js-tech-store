import express, { Router } from "express";

import uploadController from "../controllers/upload.controller";
import {
  uploadProductImages,
  uploadProfileImage,
} from "../middlewares/multerUpload";

const uploadRouter: Router = express.Router();

uploadRouter.post(
  "/image",
  uploadProfileImage,
  uploadController.uploadProfileImage
);

uploadRouter.post(
  "/images",
  uploadProductImages,
  uploadController.uploadProductImages
);

export default uploadRouter;
