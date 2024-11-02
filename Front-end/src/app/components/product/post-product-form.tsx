"use client";

import { getSortedBrands } from "@/app/lib/data";
import {
  postProductSchema,
  postProductSchemaType,
} from "@/zodSchemas/postProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { IoWarning } from "react-icons/io5";
import AddNewCategoryDialog from "./dialogs/add-new-category-dialog";
import { Categories, Product } from "@/types/Product";
import AddNewBrandDialog from "./dialogs/add-new-brand-dialog";
import ProductPostSucessDialog from "./dialogs/product-post-success-dialog";

export default function PostProductForm({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
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
  } = useForm<postProductSchemaType>({
    resolver: zodResolver(postProductSchema),
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
    const res = await fetch("http://localhost:3001/api/products/upload", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      setError("root.apiError", { message: error.message });
      setIsLoading(false);
      return;
    }

    const product: Product = await res.json();
    setIsLoading(false);
    setCreatedProd({ id: product.id, name: product.name });
  });

  return (
    <form
      onSubmit={processSubmit}
      ref={formRef}
      className="relative w-1/2 flex items-center flex-col gap-6"
    >
      <AddNewCategoryDialog
        open={showAddCategory}
        setShowAddCategory={setShowAddCategory}
        onAddNewCategory={onAddNewCategory}
      />
      <div className="relative w-[90%] flex justify-between gap-4">
        <select
          {...register("categoryId", { valueAsNumber: true })}
          className={`bg-transparent text-xl border-[2px] basis-[60%] px-2 py-1 ${
            watchedCatId != 0 ? "border-new-peach-100" : "border-new-mint"
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
        <div className="group text-xl relative p-0.5 bg-new-mint after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2  after:w-0 after:h-full after:bg-new-peach-100 after:duration-700 hover:after:w-full after:z-10">
          <button
            type="button"
            onClick={() => setShowAddCategory(true)}
            className="relative bg-new-darkblue px-2 py-1 z-20 "
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
      <div className="relative w-[90%] flex justify-between gap-4">
        <select
          {...register("brandId", { valueAsNumber: true })}
          className={`bg-transparent text-xl border-[2px] basis-[60%] px-2 py-1 ${
            wathedBrandId != 0 ? "border-new-peach-100" : "border-new-mint"
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
        <div className="group text-xl relative p-0.5 bg-new-mint after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2  after:w-0 after:h-full after:bg-new-peach-100 after:duration-700 hover:after:w-full after:z-10">
          <button
            onClick={(e) => setShowAddBrand(true)}
            type="button"
            className="relative bg-new-darkblue px-2 py-1 z-20 "
          >
            Add new brand
          </button>
        </div>
      </div>
      <div
        className={`w-[90%] relative bg-new-mint p-0.5 after:absolute after:top-0 after:left-0 after:w-0 after:h-full after:duration-700 after:ease-in-out after:bg-new-peach-100 after:z-0 focus-within:after:w-full ${
          dirtyFields.model && "after:w-full"
        } `}
      >
        <input
          type="text"
          {...register("model")}
          placeholder="Model"
          className="text-xl relative w-full h-full bg-new-darkblue outline-none px-2 py-1 z-20"
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
        className={`w-[90%] relative bg-new-mint p-0.5 after:absolute after:top-0 after:left-0 after:w-0 after:h-full after:duration-700 after:ease-in-out after:bg-new-peach-100 after:z-0 focus-within:after:w-full ${
          dirtyFields.price && "after:w-full"
        } `}
      >
        <input
          {...register("price", {
            valueAsNumber: true,
          })}
          type="number"
          placeholder="Price"
          className=" text-xl relative w-full h-full bg-new-darkblue outline-none px-2 py-1 z-20"
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
        className={`w-[90%] relative bg-new-mint p-0.5 after:absolute after:top-0 after:left-0 after:w-0 after:h-full after:duration-700 after:ease-in-out after:bg-new-peach-100 after:z-0 focus-within:after:w-full ${
          dirtyFields.stock && "after:w-full"
        }`}
      >
        <input
          type="number"
          {...register("stock", {
            valueAsNumber: true,
          })}
          placeholder="Stock"
          className=" text-xl relative w-full h-full bg-new-darkblue outline-none px-2 py-1 z-20"
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
        className={`w-[90%] relative bg-new-mint p-[2px_2px_1px_2px] after:absolute after:top-0 after:left-0 after:w-0 after:h-full after:duration-700 after:ease-in-out after:bg-new-peach-100 after:z-0 focus-within:after:w-full ${
          dirtyFields.description && "after:w-full"
        }`}
      >
        <textarea
          {...register("description")}
          placeholder="Description"
          className="relative text-xl w-full bg-new-darkblue min-h-20 max-h-[180px] outline-none px-2 py-1 z-20"
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
        className={`relative capitalize py-2 px-5 z-10 text-lg duration-150 after:absolute after:z-[-1] after:bottom-0 after:right-0 after:left-0 after:h-full after:w-0 after:bg-new-peach-90 after:duration-500 ${
          isValid
            ? "bg-neutral-700 border-b-2 border-new-peach-90 hover:after:w-full"
            : "bg-neutral-500 hover:text-white"
        }`}
      >
        Next
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
