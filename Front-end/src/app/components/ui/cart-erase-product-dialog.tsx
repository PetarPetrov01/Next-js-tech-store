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

export default function EraseProductDiaolog({
  open,
  setEraseProduct,
  eraseProduct,
}: {
  open: boolean;
  setEraseProduct: Dispatch<
    SetStateAction<{ productId: string; name: string } | null>
  >;
  eraseProduct: { productId: string; name: string } | null;
}) {
  const { removeFromCart } = useCartStore();

  const handleCancel = () => {
    setEraseProduct(null);
  };

  const handleConfirm = () => {
    if (eraseProduct?.productId) {
      removeFromCart(eraseProduct?.productId);
    }

    setEraseProduct(null);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setEraseProduct(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="text-new-darkblue"
    >
      <DialogTitle id="alert-dialog-title" className="bg-new-mint">
        Remove product?
      </DialogTitle>
      <DialogContent className="bg-new-mint">
        <DialogContentText id="alert-dialog-description">
          <p>
            Are you sure you want to erase{" "}
            <span className="font-bold">{eraseProduct?.name} </span>
            from your cart?
          </p>
        </DialogContentText>
        <div className="flex justify-center gap-4 pt-2 text-new-darkblue">
          <button onClick={handleConfirm} className="px-4 py-2 bg-red-400/70 hover:bg-red-400 duration-200">
            Remove
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 duration-150"
            autoFocus
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
