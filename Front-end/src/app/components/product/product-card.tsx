"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { FaRegHeart, FaRegEye } from "react-icons/fa";

import useCartStore from "@/app/store/cart";
import { APIProduct } from "../../../types/Product";

export default function ProductCard({ prod }: { prod: APIProduct }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { addToCart } = useCartStore();

  const [isHovered, setIsHovered] = useState(false);

  const viewType = searchParams.get("view") || "grid";

  const handleAddToCart = () => {
    addToCart({ ...prod, quantity: 1 });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={prod.id}
      className={`duration-500 flex gap-5 ${
        viewType == "grid" ? "w-[48%] mdl:w-[32%] flex-col" : "w-full flex-col items-center sm:flex-row"
      }`}
    >
      <div
        className={`relative flex flex-col items-center justify-start gap-2 px-3 py-8 shadow-s duration-100 z-10 before:absolute before:top-0 before:left-0 before:right-0 before:w-full  before:duration-500 before:z-[-1] ${
          viewType == "grid" ? "" : "w-2/3 sm:w-1/3"
        } ${
          isHovered
            ? "before:h-full before:bg-neutral-500/55"
            : "before:h-2/3 before:bg-neutral-600/35"
        }`}
      >
        <div
          className={`flex  justify-center items-center overflow-hidden  ${
            viewType == "grid" ? "w-full self-center" : ""
          }`}
        >
          <Image
            src={prod.images[0] || '/no-image-card.png'}
            alt={prod.name}
            width={200}
            height={200}
            className="w-[92%] aspect-[4/3]"
          />
        </div>
        <div
          className={`absolute flex flex-col p-8 items-end justify-center gap-4 top-0 left-0 w-full h-full duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => {
              console.log(`${prod.id} added to favs`);
            }}
            className="relative h-12 w-12 cursor-pointer text-new-mint bg-new-darkblue p-2 after:absolute after:z-0 after:bottom-0 after:right-0 after:left-0 after:w-full after:h-[3px] after:bg-new-peach-90 hover:after:h-full after:duration-500"
          >
            <FaRegHeart
              size={"1.4em"}
              className="z-[10] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            />
          </button>
          <button
            onClick={() => router.push(`/products/${prod.id}`)}
            className="relative h-12 w-12 cursor-pointer text-new-mint bg-new-darkblue p-2 after:absolute after:z-0 after:bottom-0 after:right-0 after:left-0 after:w-full after:h-[3px] after:bg-new-peach-90 hover:after:h-full after:duration-500"
          >
            <FaRegEye
              size={"1.4em"}
              className="z-[10] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            />
          </button>
        </div>
      </div>
      <div
        className={`flex flex-col duration-150 gap-2 items-center ${
          viewType == "grid" ? "" : "justify-center sm:items-start"
        }`}
      >
        <h2 className="text-2xl">{prod.name}</h2>
        <h2 className="text-2xl text-neutral-300">${prod.price}</h2>
        <p className="">In stock: {prod.stock} </p>
        <button
          onClick={handleAddToCart}
          className="relative bg-neutral-700 py-2 px-5 z-10 text-lg hover:text-white duration-150 after:absolute after:z-[-1] after:bottom-0 after:right-0 after:left-0 after:w-full after:h-[3px] after:bg-new-peach-90 hover:after:h-full after:duration-500"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
