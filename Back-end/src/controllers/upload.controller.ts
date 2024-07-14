import { Request, Response } from "express";

async function uploadImage(req: Request, res: Response) {
    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded." });
      }
    
      res.status(200).send({
        message: "File uploaded successfully.",
        file: req.file
      });
}

const uploadController = { uploadImage };
export default uploadController;
