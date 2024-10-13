import express, { Router } from "express";

import uploadController from "../controllers/upload.controller";
import multerUpload from "../middlewares/multerUpload";

const uploadRouter: Router = express.Router();

uploadRouter.post(
  "/image",
  multerUpload.profileImage,
  uploadController.uploadProfileImage
);

export default uploadRouter;
