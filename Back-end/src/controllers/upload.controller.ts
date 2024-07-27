import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinary";
import fs from "fs";
import authService from "../services/authService";
import { CustomRequest } from "../middlewares/sesssion";

async function uploadImage(req: CustomRequest, res: Response) {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded." });
  }

  if(!req.user?._id){
    return res.status(403).send({message: "You are not logged in"})
  }

  try {
    const result = await uploadToCloudinary(req.file.path, "Images");
    const imageUrl = result.secure_url;

    await authService.updateImage(imageUrl, req.user?._id)
    console.log(imageUrl);

    fs.unlink(req.file.path,(err)=>{
        if(err){
            console.error(err)
        } else {
            console.log('Sucessfully deleted from file system')
        }
    })

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
  }
}

const uploadController = { uploadImage };
export default uploadController;
