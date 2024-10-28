"use client";

import { getSortedBrands } from "@/app/lib/data";
import {
  postProductSchema,
  postProductSchemaType,
} from "@/zodSchemas/postProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { IoWarning } from "react-icons/io5";

export default function PostProductForm({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    formState: { dirtyFields, errors, isValid },
    register,
    watch,
    handleSubmit,
  } = useForm<postProductSchemaType>({
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
  console.log(errors.brandId);

  useEffect(() => {
    const fetchBrands = async () => {
      const brands = await getSortedBrands(watchedCatId);
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
      className="w-1/2 flex items-center flex-col gap-6"
    >
      <div className="relative w-[90%] flex justify-between gap-4">
        <select
          {...register("categoryId", { valueAsNumber: true })}
          className={`bg-transparent text-xl border-[2px] basis-[60%] px-2 py-1 ${
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
        {errors.categoryId && (
          <>
            <span className="absolute text-[0.9em] bottom-[-1.5em] left-1 text-red-400">
              {errors.categoryId.message}
            </span>
            {/* <IoWarning
              size={"1.4em"}
              className="absolute top-1/2 -translate-y-1/2 right-2 z-20 text-red-400"
            /> */}
          </>
        )}
        <div className="group text-xl relative p-0.5 bg-new-mint after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2  after:w-0 after:h-full after:bg-new-peach-100 after:duration-700 hover:after:w-full after:z-10">
          <button className="relative bg-new-darkblue px-2 py-1 z-20 ">
            Add new category
          </button>
        </div>
      </div>
      <div className="relative w-[90%] flex justify-between gap-4">
        <select
          {...register("brandId", { valueAsNumber: true })}
          className={`bg-transparent text-xl border-[2px] basis-[60%] px-2 py-1 ${
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
        {errors.brandId && (
          <>
            <span className="absolute text-[0.9em] bottom-[-1.5em] left-1 text-red-400">
              {errors.brandId.message}
            </span>
            {/* <IoWarning
              size={"1.4em"}
              className="absolute top-1/2 -translate-y-1/2 right-2 z-20 text-red-400"
            /> */}
          </>
        )}
        <div className="group text-xl relative p-0.5 bg-new-mint after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2  after:w-0 after:h-full after:bg-new-peach-100 after:duration-700 hover:after:w-full after:z-10">
          <button className="relative bg-new-darkblue px-2 py-1 z-20 ">
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
          dirtyFields.price && "after:w-full"
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
          dirtyFields.price && "after:w-full"
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
        className="relative bg-neutral-700 py-2 px-5 z-10 text-lg duration-150 hover:text-white after:absolute after:z-[-1] after:bottom-0 after:right-0 after:left-0 after:w-full after:h-0.5 after:bg-new-peach-90 hover:after:h-full after:duration-500"
      >
        POST
      </button>
    </form>
  );
}
