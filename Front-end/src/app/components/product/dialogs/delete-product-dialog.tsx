import { deleteProduct } from "@/app/lib/actions";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { ButtonLoader } from "../../ui/loaders/button-loader";

export default function DeleteProductDialog({
  open,
  setShowDeleteProduct,
  productName,
  productId,
}: {
  open: boolean;
  setShowDeleteProduct: Dispatch<SetStateAction<boolean>>;
  productName: string;
  productId: string;
}) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteProduct = async () => {
    setError("");
    setIsLoading(true);
    const { error, result } = await deleteProduct(productId);

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    router.push("/products");
  };

  const onClose = () => {
    setShowDeleteProduct(false);
    setError("");
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        id="alert-dialog-title"
        className="bg-new-midnight-100 text-new-mint"
      >
        Delete product
      </DialogTitle>
      <DialogContent className="bg-new-midnight-100">
        <>
          <p className="text-new-mint">
            Are you sure you want to delete {productName}?
          </p>
          {error && <p className={"text-red-300"}>Failed: {error}</p>}
        </>
        <div className="flex justify-center gap-4 pt-3 text-new-mint">
          <div className="relative">
            <button
              onClick={handleDeleteProduct}
              className={`px-4 py-2 bg-red-400/90 hover:bg-red-400 duration-200 ${
                isLoading && "text-transparent"
              }`}
            >
              {error ? "Try again" : "Delete"}
            </button>
            {isLoading && <ButtonLoader />}
          </div>
          <button
            onClick={onClose}
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
