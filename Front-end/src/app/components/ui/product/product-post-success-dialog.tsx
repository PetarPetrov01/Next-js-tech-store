import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Link from "next/link";

export default function ProductPostSucessDialog({
  open,
  product,
}: {
  open: boolean;
  product: {
    id: string;
    name: string;
  };
}) {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={`text-center p-4 font-playfair-display`}>
        Product Created Successfully!
      </DialogTitle>
      <DialogContent className="min-w-[350px] flex flex-col items-center gap-4">
        <DialogContentText className="font-source-sans px-2">
          <p className="text-new-darkblue">
            Your product <span className="italic font-bold">{product.name}</span>{" "}
            has been created successfully. Would you like to upload images for
            the product now or do this later?
          </p>
        </DialogContentText>
        <div className="flex justify-center gap-6 w-[70%]">
          <Link
            href={`/products/${product.id}/images`}
            className="px-4 py-2 border-2 text-new-darkblue border-new-darkblue hover:bg-new-darkblue hover:text-new-mint duration-150"
          >
            Upload images
          </Link>
          <Link
            href={`/products/${product.id}`}
            className="px-4 py-2 text-new-mint bg-black hover:bg-gray-700 duration-150"
          >
            Do this later
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
