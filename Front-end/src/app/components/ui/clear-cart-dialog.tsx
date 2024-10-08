"use client";
import useCartStore from "@/app/store/cart";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
export default function ClearCartDialog({
  showClearDialog,
  setShowClearDialog,
}: {
  showClearDialog: boolean;
  setShowClearDialog: Dispatch<SetStateAction<boolean>>;
}) {
  const { clearCart } = useCartStore();

  const handleConfirm = () => {
    clearCart();
    setShowClearDialog(false);
  };

  const handleCancel = () => {
    setShowClearDialog(false);
  };

  return (
    <Dialog
      open={showClearDialog}
      onClose={() => setShowClearDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="text-new-gray"
    >
      <DialogTitle id="alert-dialog-title" className="bg-new-mint">
        Remove product?
      </DialogTitle>
      <DialogContent className="bg-new-mint">
        <DialogContentText id="alert-dialog-description">
          <p>Are you sure you want to clear the whole cart?</p>
        </DialogContentText>
        <div className="flex justify-center gap-4 pt-2 text-new-gray">
          <button onClick={handleConfirm} className=" px-4 py-2 bg-red-400/70 hover:bg-red-400 duration-200">
            Clear
          </button>
          <button
            onClick={handleCancel}
            className=" px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-150"
            autoFocus
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
