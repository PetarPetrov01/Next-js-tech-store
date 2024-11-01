"use client";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
export default function DeleteImagesDialog({
  open,
  setShowDeleteImages,
  handleDeleteImages,
  imagesCount
}: {
  open: boolean;
  setShowDeleteImages: Dispatch<SetStateAction<boolean>>;
  handleDeleteImages: () => void;
  imagesCount: number
}) {
  const handleConfirm = () => {
    handleDeleteImages();
    setShowDeleteImages(false);
  };

  const handleCancel = () => {
    setShowDeleteImages(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setShowDeleteImages(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="text-new-darkblue"
    >
      <DialogTitle
        id="alert-dialog-title"
        className="bg-new-midnight-100 text-new-mint"
      >
        Deleted images
      </DialogTitle>
      <DialogContent className="bg-new-midnight-100">
        <p className="text-new-mint">
            Are you sure you want to delete all selected images &#40;{imagesCount}&#41;?
        </p>
        <div className="flex justify-center gap-4 pt-3 text-new-mint">
          <button
            onClick={handleConfirm}
            className=" px-4 py-2 bg-red-400/90 hover:bg-red-400 duration-200"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className=" px-4 py-2 bg-black hover:bg-gray-800 duration-150"
            autoFocus
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
