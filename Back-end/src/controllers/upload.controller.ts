import { Response } from "express";
import fs from "fs";

import {
  uploadToCloudinary,
  deleteFromCloudinary,
  uploadMultipleToCloudinary,
} from "../utils/cloudinary";
import authService from "../services/authService";
import userService from "../services/userService";

import { CustomRequest } from "../middlewares/sesssion";
import { MulterError } from "multer";

async function uploadProfileImage(req: CustomRequest, res: Response) {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded." });
  }

  if (!req.user?._id) {
    return res.status(403).send({ message: "You are not logged in" });
  }

  try {
    const existingImage = await userService.getProfileImage(req.user._id);

    const uploadResult = await uploadToCloudinary(req.file.path, "Images");
    const imageUrl = uploadResult.secure_url;

    if (existingImage) {
      const oldImageId = existingImage.substring(
        existingImage.indexOf("Images/"),
        existingImage.lastIndexOf(".")
      );
      console.log("Deleting old image: " + oldImageId);
      const deleted = await deleteFromCloudinary(oldImageId);
      console.log(`Result: ${deleted.result}`);
    }
    await authService.updateImage(imageUrl, req.user?._id);

    res.status(200).send({
      message: "File uploaded successfully.",
      file: req.file,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: "File upload failed.",
      error: error.message,
    });
  } finally {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Sucessfully deleted from file system");
      }
    });
  }
}

async function uploadProductImages(req: CustomRequest, res: Response) {
  
  if (!req.files?.length) {
    return res.status(400).json({ message: "No files uploaded." });
  }


  const files = req.files as Express.Multer.File[];
  const filePaths = files.map((f) => f.path);

  try {
    const uploadResult = await uploadMultipleToCloudinary(
      filePaths,
      "Test/Lenovo"
    );
    const imageUrls = uploadResult.map((f) => f.secure_url);

    console.log(imageUrls);

    res.status(200).json(imageUrls);
  } catch (error: any) {
    res.status(400).json({ message: "fail" });
  } finally {
    filePaths.forEach((path) => {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Sucessfully deleted from file system");
        }
      });
    });
  }
}

const uploadController = { uploadProfileImage, uploadProductImages };
export default uploadController;
