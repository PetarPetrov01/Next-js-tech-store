"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IoWarning } from "react-icons/io5";

import {
  postProductSchema,
  postProductSchemaType,
} from "@/zodSchemas/postProductSchema";
import { getSortedBrands } from "@/app/lib/data";

import AddNewCategoryDialog from "./dialogs/add-new-category-dialog";
import AddNewBrandDialog from "./dialogs/add-new-brand-dialog";
import ProductPostSucessDialog from "./dialogs/product-post-success-dialog";

import { Categories, PopulatedProduct, Product } from "@/types/Product";
import { editProduct, postProduct } from "@/app/lib/actions";

const inputWrapperPseudoElClasses =
  "before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-[1px] before:border-[#6a6a6a] after:absolute after:block after:left-0 after:top-0 after:h-full after:duration-500 after:ease-in-out after:border-new-peach-80 after:z-10 focus-within:after:border-[1px] focus-within:after:w-full";
const buttonWrapperPseudoElClasses =
  "before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border-[1px] before:border-[#6a6a6a] after:absolute after:block after:left-1/2 after:-translate-x-1/2 after:top-0 after:h-full after:duration-500 after:w-0 after:ease-in-out after:border-new-peach-80 after:z-10 hover:after:border-[1px] hover:after:w-full";

export default function PostProductForm({
  categories,
  product,
}: {
  categories: { id: number; name: string }[];
  product: PopulatedProduct | null;
}) {
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [cats, setCats] = useState(categories);
  const [isLoading, setIsLoading] = useState(false);
  const [createdProd, setCreatedProd] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [pendingNewCategoryId, setPendingNewCategoryId] = useState<
    number | null
  >(null);

  const [pendingNewBrandId, setPendingNewBrandId] = useState<number | null>(
    null
  );

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddBrand, setShowAddBrand] = useState(false);

  const {
    setValue,
    formState: { dirtyFields, errors, isValid },
    register,
    control,
    setError,
    handleSubmit,
    reset,
  } = useForm<postProductSchemaType>({
    resolver: zodResolver(postProductSchema),
    defaultValues: product
      ? {
          brandId: product.brandId,
          categoryId: product.categoryId,
          model: product.model,
          price: product.price,
          stock: product.stock,
          description: product.description,
        }
      : {
          brandId: 0,
          categoryId: 0,
          model: "",
          price: "",
          stock: "",
          description: "",
        },
  });

  const watchedCatId = useWatch({
    control,
    name: "categoryId",
    defaultValue: 0,
  });
  const wathedBrandId = useWatch({ control, name: "brandId", defaultValue: 0 });

  const onAddNewCategory = (category: Categories[number]) => {
    setCats((prev) => [...prev, { id: category.id, name: category.name }]);
    setPendingNewCategoryId(category.id);
  };

  const onAddNewBrand = (brandId: number) => {
    setPendingNewBrandId(brandId);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const brands = await getSortedBrands(watchedCatId);
      setBrands(brands);
    };
    fetchBrands();
  }, [watchedCatId]);

  useEffect(() => {
    if (pendingNewBrandId) {
      setValue("brandId", pendingNewBrandId);
      setPendingNewCategoryId(null);
    }
  }, [setValue, pendingNewBrandId]);

  useEffect(() => {
    if (pendingNewCategoryId) {
      setValue("categoryId", pendingNewCategoryId);
      setPendingNewCategoryId(null);
    }
  }, [setValue, pendingNewCategoryId]);

  const processSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const { result, error } = product?.id
      ? await editProduct(data, product.id)
      : await postProduct(data);

    if (error) {
      setError("root.apiError", error);
      setIsLoading(false);
      return;
    }
    if (result) {
      const newProduct: Product = result;

      if (product) {
        setIsLoading(false);
        router.push(`/products/${product.id}`);
      } else {
        setCreatedProd(newProduct);
        setIsLoading(false);
        reset();
      }
    }
  });

  return (
    <form
      onSubmit={processSubmit}
      ref={formRef}
      className="relative w-[90%] sm:w-2/3 mdl:w-1/2 flex items-center flex-col gap-6"
    >
      <AddNewCategoryDialog
        open={showAddCategory}
        setShowAddCategory={setShowAddCategory}
        onAddNewCategory={onAddNewCategory}
      />
      <div className="relative w-full flex justify-between gap-4">
        <select
          {...register("categoryId", { valueAsNumber: true })}
          className={`bg-transparent text-xl border-[1px] basis-[60%] py-2 px-3 cursor-pointer ${
            watchedCatId != 0 ? "border-new-peach-90" : "border-[#6a6a6a]"
          }`}
          defaultValue={0}
        >
          <option
            key={0}
            value={0}
            disabled
            className="text-new-darkblue text-xl"
          >
            Choose category
          </option>
          {cats.map((cat) => (
            <option
              key={`${cat.id}-${cat.name}`}
              value={cat.id}
              className="text-new-darkblue"
            >
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <span className="absolute text-[0.9em] bottom-[-1.5em] left-1 text-red-400">
            {errors.categoryId.message}
          </span>
        )}
        <div
          className={`bg-transparent text-xl relative p-0.5 z-0 ${buttonWrapperPseudoElClasses}`}
        >
          <button
            type="button"
            onClick={() => setShowAddCategory(true)}
            className="relative bg-new-darkblue px-3 py-2 z-20"
          >
            Add new category
          </button>
        </div>
      </div>
      <AddNewBrandDialog
        open={showAddBrand}
        setShowAddBrand={setShowAddBrand}
        onAddNewBrand={onAddNewBrand}
      />
      <div className="relative w-full flex justify-between gap-4">
        <select
          {...register("brandId", { valueAsNumber: true })}
          className={`bg-transparent text-xl border-[1px] basis-[60%] py-2 px-3 cursor-pointer ${
            wathedBrandId != 0 ? "border-new-peach-90" : "border-[#6a6a6a]"
          }`}
          defaultValue={0}
        >
          <option
            key={0}
            value={0}
            disabled
            className="text-new-darkblue text-xl"
          >
            Choose brand
          </option>
          {brands.length &&
            brands.map((brand) => (
              <option
                key={`${brand.id}-${brand.name}`}
                value={brand.id}
                className="text-new-darkblue"
              >
                {brand.name}
              </option>
            ))}
        </select>
        {errors.brandId && (
          <span className="absolute text-[0.9em] bottom-[-1.5em] left-1 text-red-400">
            {errors.brandId.message}
          </span>
        )}
        <div
          className={`bg-transparent text-xl relative p-0.5 z-0 ${buttonWrapperPseudoElClasses}`}
        >
          <button
            onClick={(e) => setShowAddBrand(true)}
            type="button"
            className="relative bg-new-darkblue px-3 py-2 z-20"
          >
            Add new brand
          </button>
        </div>
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoElClasses} ${
          dirtyFields.model ? "after:w-full after:border-[1px]" : "after:w-0"
        } `}
      >
        <input
          type="text"
          {...register("model")}
          placeholder="Model"
          className="text-lg relative w-full h-full bg-new-darkblue outline-none py-2 px-3 z-20"
        />
        {errors.model && (
          <>
            <span className="absolute text-[0.9em] bottom-[-1.5em] left-1 text-red-400">
              {errors.model.message}
            </span>
            <IoWarning
              size={"1.4em"}
              className="absolute top-1/2 -translate-y-1/2 right-2 z-20 text-red-400"
            />
          </>
        )}
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoElClasses} ${
          dirtyFields.price ? "after:w-full after:border-[1px]" : "after:w-0"
        } `}
      >
        <input
          {...register("price", {
            valueAsNumber: true,
          })}
          type="string"
          placeholder="Price"
          className="text-lg relative w-full h-full bg-new-darkblue outline-none py-2 px-3 z-20"
        />
        {errors.price && (
          <>
            <span className="absolute text-[0.9em] bottom-[-1.5em] left-1 text-red-400">
              {errors.price.message}
            </span>
            <IoWarning
              size={"1.4em"}
              className="absolute top-1/2 -translate-y-1/2 right-2 z-20 text-red-400"
            />
          </>
        )}
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoElClasses} ${
          dirtyFields.stock ? "after:w-full after:border-[1px]" : "after:w-0"
        } `}
      >
        <input
          type="number"
          {...register("stock", {
            valueAsNumber: true,
          })}
          placeholder="Stock"
          className="text-lg relative w-full h-full bg-new-darkblue outline-none py-2 px-3 z-20"
        />
        {errors.stock && (
          <>
            <span className="absolute text-[0.9em] bottom-[-1.5em] left-1 text-red-400">
              {errors.stock.message}
            </span>
            <IoWarning
              size={"1.4em"}
              className="absolute top-1/2 -translate-y-1/2 right-2 z-20 text-red-400"
            />
          </>
        )}
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoElClasses} ${
          dirtyFields.description
            ? "after:w-full after:border-[1px]"
            : "after:w-0"
        }`}
      >
        <textarea
          {...register("description")}
          placeholder="Description"
          className="relative text-lg w-full bg-new-darkblue min-h-20 max-h-[180px] outline-none px-2 py-1 z-20"
        />
        {errors.description && (
          <>
            <span className="absolute text-[0.9em] bottom-[-1.5em] left-1 text-red-400">
              {errors.description.message}
            </span>
            <IoWarning
              size={"1.4em"}
              className="absolute top-1/2 -translate-y-1/2 right-2 z-20 text-red-400"
            />
          </>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`relative capitalize py-2 px-5 z-10 text-lg duration-150 after:absolute after:z-[-1] after:bottom-0 after:right-0 after:left-0 after:h-full after:w-0 after:bg-new-peach-90 after:duration-500 ${
          isValid
            ? "bg-neutral-700 border-b-2 border-new-peach-90 hover:after:w-full"
            : "bg-neutral-500 hover:text-white"
        } ${isLoading ? "after:w-full pointer-events-none" : ""}`}
      >
        {isLoading ? (
          <div className="flex flex-row justify-around gap-1.5 py-[0.4rem] px-0.5">
            <div className="w-[0.7rem] aspect-square h-auto rounded-full bg-white animate-bounce"></div>
            <div className="w-[0.7rem] aspect-square h-auto rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-[0.7rem] aspect-square h-auto rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : (
          <p className="text-lg uppercase">Post</p>
        )}
      </button>
      {errors.root?.apiError && (
        <span className="absolute text-[0.9em] bottom-[-1.5em] left-1/2 -translate-x-1/2 text-red-400">
          {errors.root.apiError.message}
        </span>
      )}
      {createdProd?.id && (
        <ProductPostSucessDialog open={true} product={createdProd} />
      )}
    </form>
  );
}
