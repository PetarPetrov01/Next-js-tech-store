import { Categories } from "@/types/Product";
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
import { ButtonLoaderWrapper } from "../../ui/loaders/button-loader";

export default function AddNewCategoryDialog({
  open = false,
  setShowAddCategory,
  onAddNewCategory,
}: {
  open: boolean;
  setShowAddCategory: Dispatch<SetStateAction<boolean>>;
  onAddNewCategory: (category: Categories[number]) => void;
}) {
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
    setError("");
  };

  const handleCancel = () => {
    setShowAddCategory(false);
    setError("");
    setCategory("");
  };

  const validateInput = (value: string): string | null => {
    if (value == "") return "The field is required";

    if (value.length < 2)
      return "The category should be atleast 2 characters long";

    if (value.length > 15)
      return "The category can't be more than 15 characters long";

    return null;
  };

  const handleBlur = () => {
    const validateError = validateInput(category);
    setError(validateError || "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const validationError = validateInput(category);
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const res = await fetch("http://localhost:3001/api/products/category", {
      method: "post",
      body: JSON.stringify({ name: category }),
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.message);
      setIsLoading(false);
      return;
    }

    const result = await res.json();
    router.refresh();
    setIsLoading(false);
    onAddNewCategory(result);
    setShowAddCategory(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setShowAddCategory(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="text-center bg-new-midnight-100 text-new-mint">
        Add new category
      </DialogTitle>
      <DialogContent className="min-w-[320px] sm:min-w-[400px] bg-new-midnight-100">
        <DialogContentText></DialogContentText>
        <form
          onSubmit={handleSubmit}
          className="w-full p-2 flex flex-col items-center gap-12"
        >
          <div className="w-[80%] relative flex flex-col items-center">
            <input
              type="text"
              placeholder="Category name"
              value={category}
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
          <div className="flex justify-between gap-6 text-new-mint">
            <ButtonLoaderWrapper isLoading={isLoading}>
              <button
                type="submit"
                className={`px-4 py-2 bg-red-400/90 hover:bg-red-400 duration-200 ${
                  isLoading ? "text-transparent pointer-events-none" : ""
                }`}
              >
                Add category
              </button>
            </ButtonLoaderWrapper>
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
