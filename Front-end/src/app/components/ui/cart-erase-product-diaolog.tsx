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
      className="text-new-gray"
    >
      <DialogTitle id="alert-dialog-title" className="bg-new-mint">Remove product?</DialogTitle>
      <DialogContent className="bg-new-mint">
        <DialogContentText id="alert-dialog-description">
          <p>
            Are you sure you want to erase{" "}
            <span className="font-bold">{eraseProduct?.name} </span>
            from your cart?
          </p>
        </DialogContentText>
        <DialogActions>
          <button onClick={handleConfirm} className="text-new-mint p-2 bg-gray-500">Remove</button>
          <button onClick={handleCancel} className="text-new-mint p-2 bg-gray-500" autoFocus>
            Cancel
          </button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
