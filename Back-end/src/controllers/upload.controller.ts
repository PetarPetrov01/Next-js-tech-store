import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/cloudinary";
import fs from "fs";

async function uploadImage(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded." });
  }

  try {
    const result = await uploadToCloudinary(req.file.path, "Images");
    const imageUrl = result.secure_url;
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
