"use client";

import { getBrands } from "@/app/lib/data";
import createProductSchema from "@/zodSchemas/postProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IoWarning } from "react-icons/io5";

export default function PostProductForm({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const postProductSchema = useMemo(() => {
    return createProductSchema(categories);
  }, [categories]);

  type Inputs = z.infer<typeof postProductSchema>;

  const {
    formState: { dirtyFields, errors, isValid },
    register,
    watch,
    handleSubmit,
  } = useForm<Inputs>({
    resolver: zodResolver(postProductSchema),
    // defaultValues: {
    //   brandId: 0,
    //   categoryId: 0,
    //   model: "",
    //   price: 0,
    //   stock: 0,
    //   description: "",
    // },
  });

  const watchedCatId = watch("categoryId");
  const wathedBrandId = watch("brandId");

  useEffect(() => {
    const fetchBrands = async () => {
      const brands = await getBrands(watchedCatId);
      setBrands(brands);
    };
    fetchBrands();
  }, [watchedCatId]);

  const processSubmit = handleSubmit(async (data) => {
    console.log(data);
    console.log(errors);
    console.log(isValid);
  });

  return (
    <form
      onSubmit={processSubmit}
      ref={formRef}
      className="w-1/2 flex flex-col gap-6"
    >
      <div className="w-full flex justify-between gap-10">
        <h2 className="basis-[30%]">Category:</h2>
        <div className="flex justify-between gap-4 basis-[65%]">
          <select
            {...register("categoryId")}
            className={`bg-transparent border-[1px] basis-[50%] px-4 ${
              watchedCatId != 0 ? "border-new-peach-100" : "border-new-mint"
            }`}
            defaultValue={0}
          >
            <option value={0} disabled className="text-new-darkblue text-xl">
              Choose category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="text-new-darkblue">
                {cat.name}
              </option>
            ))}
          </select>
          <button className="border-[1px] border-new-mint px-4">
            Add new category
          </button>
        </div>
      </div>
      <div className="w-full flex justify-between gap-10">
        <h2 className="basis-[30%]">Brand:</h2>
        <div className="flex justify-between gap-4 basis-[65%]">
          <select
            {...register("brandId")}
            className={`bg-transparent border-[1px] basis-[50%] px-4 ${
              wathedBrandId != 0 ? "border-new-peach-100" : "border-new-mint"
            }`}
            defaultValue={0}
          >
            <option value={0} disabled className="text-new-darkblue text-xl">
              Choose brand
            </option>
            {brands.length &&
              brands.map((brand) => (
                <option
                  key={brand.id}
                  value={brand.id}
                  className="text-new-darkblue"
                >
                  {brand.name}
                </option>
              ))}
          </select>
          <button className="border-[1px] border-new-mint px-4">
            Add new brand
          </button>
        </div>
      </div>
      <div className="w-full flex justify-between gap-10">
        <h2 className="basis-[30%]">Model: </h2>
        <div
          className={`relative basis-[65%] bg-new-mint p-[1px] after:absolute after:top-0 after:left-0 after:w-0 after:h-full after:duration-700 after:ease-in-out after:bg-new-peach-100 after:z-0 focus-within:after:w-full ${
            dirtyFields.model && "after:w-full"
          } `}
        >
          <input
            type="text"
            {...register("model")}
            placeholder="Model"
            className="relative w-full h-full bg-new-darkblue outline-none px-4 z-20"
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
      </div>
      <div className="w-full flex justify-between gap-10">
        <h2 className="basis-[30%]">Price: </h2>
        <div className="relative basis-[65%] bg-new-mint p-[1px] after:absolute after:top-0 after:left-0 after:w-0 after:h-full after:duration-700 after:ease-in-out after:bg-new-peach-100 after:z-0 focus-within:after:w-full">
          <input
            {...register("price", {
              valueAsNumber: true,
            })}
            type="number"
            placeholder="Price"
            className="relative w-full h-full bg-new-darkblue outline-none px-4 z-20"
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
      </div>
      <div className="w-full flex justify-between gap-10">
        <h2 className="basis-[30%]">Stock: </h2>
        <div className="relative basis-[65%] bg-new-mint p-[1px] after:absolute after:top-0 after:left-0 after:w-0 after:h-full after:duration-700 after:ease-in-out after:bg-new-peach-100 after:z-0 focus-within:after:w-full">
          <input
            type="number"
            {...register("stock", {
              valueAsNumber: true,
            })}
            placeholder="Stock"
            className="relative w-full h-full bg-new-darkblue outline-none px-4 z-20"
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
      </div>
      <div className="w-full flex items-stretch justify-between gap-10">
        <h2 className="basis-[30%]">Description: </h2>
        <div className="relative basis-[65%] bg-new-mint p-[1px] after:absolute after:top-0 after:left-0 after:w-0 after:h-full after:duration-700 after:ease-in-out after:bg-new-peach-100 after:z-0 focus-within:after:w-full">
          <textarea
            {...register("description")}
            placeholder="Description"
            className="relative w-full bg-new-darkblue min-h-20 max-h-[200px] outline-none px-4 z-20"
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
      </div>
      <button type="submit">POST</button>
    </form>
  );
}
