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
      className="text-new-mint"
    >
      <DialogTitle id="alert-dialog-title" className="bg-new-midnight-100 text-new-mint">
        Remove product?
      </DialogTitle>
      <DialogContent className="bg-new-midnight-100">
        <DialogContentText id="alert-dialog-description">
          <p className="text-new-mint">
            Are you sure you want to erase{" "}
            <span className="font-bold">{eraseProduct?.name} </span>
            from your cart?
          </p>
        </DialogContentText>
        <div className="flex justify-center gap-4 pt-3 text-new-mint">
          <button onClick={handleConfirm} className="px-4 py-2 bg-red-400/90 hover:bg-red-400 duration-200">
            Remove
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-black hover:bg-gray-800 duration-150"
            autoFocus
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
