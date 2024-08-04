import express, { Router } from "express";
import uploadController from "../controllers/upload.controller";
import upload from "../utils/multer";
import uploadValidation from "../middlewares/validations/upload-request";

const uploadRouter: Router = express.Router();

uploadRouter.post(
  "/image",
  uploadValidation,
  upload.single("image"),
  uploadController.uploadImage
);

export default uploadRouter;
