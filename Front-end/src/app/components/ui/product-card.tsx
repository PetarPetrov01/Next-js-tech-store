"use client";

import Image from "next/image";
import { Product } from "../../../types/Product";
import { useRouter } from "next/navigation";
import { HeartIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function ProductCard({ prod }: { prod: Product }) {
  const router = useRouter();
  return (
    <div key={prod.id} className="sm:w-[49%] md:w-[32%] flex flex-col gap-5">
      <div className="relative flex flex-col items-center justify-start gap-2 mt-6 p-3 py-8 shadow-s duration-100 z-10 before:absolute before:top-0 before:left-0 before:right-0 before:w-full before:h-2/3 before:bg-gray-600/70 hover:before:h-full hover:before:bg-gray-400/50 before:duration-500 before:z-[-1]">
        <div className="flex w-full justify-center items-center overflow-hidden self-center">
          <Image
            src={prod.images[0]}
            alt={prod.name}
            width={100}
            height={100}
            className="w-[92%]"
          />
        </div>
        <div className="absolute flex flex-col p-8 items-end justify-center gap-4  top-0 left-0 opacity-0 w-full h-full hover:opacity-100 duration-300">
          <button
            onClick={() => {
              console.log(`${prod.id} added to favs`);
            }}
            className="relative h-12 w-12 cursor-pointer text-new-mint bg-new-gray p-2 after:absolute after:z-0 after:bottom-0 after:right-0 after:left-0 after:w-full after:h-[3px] after:bg-new-peach-90 hover:after:h-full after:duration-500"
          >
            <HeartIcon
              width={30}
              height={30}
              className="z-[10] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            />
          </button>
          <button
            onClick={() => router.push(`/products/${prod.id}`)}
            className="relative h-12 w-12 cursor-pointer text-new-mint bg-new-gray p-2 after:absolute after:z-0 after:bottom-0 after:right-0 after:left-0 after:w-full after:h-[3px] after:bg-new-peach-90 hover:after:h-full after:duration-500"
          >
            <EyeIcon
              width={30}
              height={30}
              className="z-[10] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl ">{prod.name}</h2>
        <h2 className="text-2xl ">${prod.price}</h2>
        <p className="">In stock: {prod.stock} </p>
      </div>
    </div>
  );
}
