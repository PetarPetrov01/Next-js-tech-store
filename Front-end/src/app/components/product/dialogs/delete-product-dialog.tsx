import { deleteProduct } from "@/app/lib/actions/product";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import {
  ButtonLoader,
  ButtonLoaderWrapper,
} from "../../ui/loaders/button-loader";
import Link from "next/link";

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
  const [isSuccessful, setIsSuccessful] = useState(false);

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
    setIsSuccessful(true);
  };

  const onClose = () => {
    setShowDeleteProduct(false);
    setError("");
    setIsLoading(false);
    setIsSuccessful(false);

    if (isSuccessful) router.replace("/");
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
        {isSuccessful ? (
          <p className="text-new-mint">
            Product {productName} successfully deleted!
          </p>
        ) : (
          <>
            <p className="text-new-mint">
              Are you sure you want to delete {productName}?
            </p>
            {error && <p className={"text-red-300"}>Failed: {error}</p>}
          </>
        )}
        <div className="flex justify-center gap-4 pt-3 text-new-mint">
          {isSuccessful ? (
            <>
              <Link
                href={"/"}
                className="px-4 py-2 bg-black hover:bg-gray-800 duration-150"
              >
                Home
              </Link>
            </>
          ) : (
            <>
              <ButtonLoaderWrapper isLoading={isLoading}>
                <button
                  onClick={handleDeleteProduct}
                  className={`px-4 py-2 bg-red-400/90 hover:bg-red-400 duration-200 ${
                    isLoading && "text-transparent"
                  }`}
                >
                  {error ? "Try again" : "Delete"}
                </button>
              </ButtonLoaderWrapper>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-black hover:bg-gray-800 duration-150"
                autoFocus
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
