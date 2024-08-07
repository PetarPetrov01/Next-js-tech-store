import express, { Router } from "express";

import upload from "../utils/multer";
import uploadController from "../controllers/upload.controller";

const uploadRouter: Router = express.Router();

uploadRouter.post(
  "/image",
  upload.single("image"),
  uploadController.uploadImage
);

export default uploadRouter;
