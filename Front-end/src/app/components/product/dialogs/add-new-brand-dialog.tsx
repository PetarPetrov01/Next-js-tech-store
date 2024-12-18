import { Brands, Categories } from "@/types/Product";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { SubmitHandler } from "react-hook-form";

export default function AddNewBrandDialog({
  open = false,
  setShowAddBrand,
  onAddNewBrand,
}: {
  open: boolean;
  setShowAddBrand: Dispatch<SetStateAction<boolean>>;
  onAddNewBrand: (brandId: number) => void;
}) {
  const [brand, setBrand] = useState<string>("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrand(e.target.value);
    setError("");
  };

  const handleCancel = () => {
    setShowAddBrand(false);
    setError("");
    setBrand("");
  };

  const validateInput = (value: string): string | null => {
    if (value == "") return "The field is required";

    if (value.length < 3)
      return "The brand should be atleast 3 characters long";

    if (value.length > 15)
      return "The brand can't be more than 15 characters long";

    return null;
  };

  const handleBlur = () => {
    const validateError = validateInput(brand);
    setError(validateError || "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const validationError = validateInput(brand);
    if (validationError) {
      setError(validationError);
      return;
    }

    const res = await fetch("http://localhost:3001/api/brands", {
      method: "post",
      body: JSON.stringify({ name: brand }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.message);
      return;
    }

    const result = await res.json();
    router.refresh();
    onAddNewBrand(result.id);
    setShowAddBrand(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setShowAddBrand(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="text-center bg-new-midnight-100 text-new-mint">Add new brand</DialogTitle>
      <DialogContent className="min-w-[320px] sm:min-w-[400px]  bg-new-midnight-100">
        <form
          onSubmit={handleSubmit}
          className="w-full p-2 flex flex-col items-center gap-12"
        >
          <div className="w-[80%] relative flex flex-col items-center">
            <input
              type="text"
              placeholder="Brand name"
              value={brand}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="px-2 py-1 text-lg w-full outline-none  bg-slate-300 focus:bg-neutral-100 duration-200"
              
            />
            {error && (
              <span className="text-center text-red-400 italic text-sm absolute bottom-0 translate-y-[110%] leading-3">
                {error}
              </span>
            )}
          </div>
          <div className="flex justify-between gap-6 text-new-mint" >
            <button
              type="submit"
              className="px-4 py-2 bg-red-400/90 hover:bg-red-400 duration-200"
            >
              Add brand
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-black hover:bg-gray-800 duration-150"
              autoFocus
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
