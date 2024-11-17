import { Response } from "express";
import fs from "fs";

import {
  uploadToCloudinary,
  deleteFromCloudinary,
  uploadMultipleToCloudinary,
  deleteMultipleFromCloudinary,
} from "../utils/cloudinary";
import authService from "../services/authService";
import userService from "../services/userService";

import { CustomRequest } from "../middlewares/sesssion";
import productService from "../services/productService";

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
      console.log(deleted);
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
    return res.status(400).json({ message: "No files provided" });
  }

  const files = req.files as Express.Multer.File[];
  const filePaths = files.map((f) => f.path);

  try {
    const uploadResult = await uploadMultipleToCloudinary(
      filePaths,
      `Images/${res.locals.product.brand || "Other"}`
    );
    const imageUrls = uploadResult.map((f) => f.secure_url);

    const uploadedImages = await productService.updateProductImages(
      res.locals.product.id,
      imageUrls
    );

    res.status(200).json(uploadedImages);
  } catch (error: any) {
    res.status(400).json({ message: "Upload failed" });
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

async function deleteProductImage(imageUrl: string) {
  try {
    const imageId = imageUrl.substring(
      imageUrl.indexOf("Images/"),
      imageUrl.lastIndexOf(".")
    );
    const deleted = await deleteFromCloudinary(imageId);
  } catch (error) {}
}

async function deleteProductImages(req: CustomRequest, res: Response) {
  try {
    const imageUrls = req.body.images;
    const productBrand = res.locals.product.brand;

    const { cloudinaryImages, otherImages } = imageUrls.reduce(
      (acc: { cloudinaryImages: []; otherImages: [] }, imageUrl: string) =>
        imageUrl.includes("res.cloudinary.com")
          ? {
              cloudinaryImages: [...acc.cloudinaryImages, imageUrl],
              otherImages: [...acc.otherImages],
            }
          : {
              cloudinaryImages: [...acc.cloudinaryImages],
              otherImages: [...acc.otherImages, imageUrl],
            },
      { cloudinaryImages: [], otherImages: [] }
    );

    const imagePublicIds = cloudinaryImages.map((imageUrl: string) =>
      imageUrl.substring(
        imageUrl.indexOf(`Images/${productBrand}/`),
        imageUrl.lastIndexOf(".")
      )
    );

    const deletedFromCloudinary = await deleteMultipleFromCloudinary(
      imagePublicIds
    );
    const [failedDeletedURLs, successfullyDeletedURLs]: [string[], string[]] = [
      [],
      [],
    ];

    deletedFromCloudinary.forEach((img, index) => {
      if (img.result == "ok") {
        successfullyDeletedURLs.push(imageUrls[index]);
      } else {
        failedDeletedURLs.push(imageUrls[index]);
      }
    });

    const remainingImages = await productService.deleteProductImages(
      req.params.id,
      [...successfullyDeletedURLs, ...otherImages]
    );

    res.status(200).json(remainingImages);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

const uploadController = {
  uploadProfileImage,
  uploadProductImages,
  deleteProductImages,
};
export default uploadController;
