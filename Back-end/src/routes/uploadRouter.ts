import express, { Router } from "express";
import uploadController from "../controllers/upload.controller";
import upload from "../utils/multer";

const uploadRouter: Router = express.Router();

uploadRouter.post(
  "/image",
  upload.single("image"),
  uploadController.uploadImage
);

export default uploadRouter;
