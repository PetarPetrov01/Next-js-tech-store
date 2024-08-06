import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary-config";

export function uploadToCloudinary(file: string, folder: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result!);
        }
      }
    );
  });
}

export function deleteFromCloudinary(publicId: string): Promise<{result: string}> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, {}, (error, result) => {
      if (error) {
        // reject(error); Should not reject as that would stop the update of the next image!
        resolve(error)
      } else {
        resolve(result);
      }
    });
  });
}

