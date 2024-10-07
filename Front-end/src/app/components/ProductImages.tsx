"use client";

import { PopulatedProduct } from "@/types/Product";
import Image from "next/image";
import { useState } from "react";

export default function ProductImages({
  images,
}: {
  images: { url: string }[];
}) {
  const [displayImageIndex, setDisplayImageIndex] = useState(0);

  const changeImageIndex = (index: number) => {
    setDisplayImageIndex(index);
  };

  console.log(images);

  return (
    <div className="w-full flex flex-col gap-6 overflow-hidden">
      <div className="flex justify-center ">
        <Image
          src={images[displayImageIndex].url}
          alt={`image-${displayImageIndex.toString()}`}
          className="w-[90%] object-cover"
          width={600}
          height={600}
        />
      </div>
      <div className="flex gap-2">
        {images.map((image, i) => (
          <div
            key={i}
            onClick={() => changeImageIndex(i)}
            className={`w-[25%] p-2 border-[1px] rounded-md cursor-pointer flex justify-center items-center hover:bg-gray-50/20 duration-75 ${
              i == displayImageIndex ? "border-new-mint" : "border-transparent"
            }`}
          >
            <Image
              src={image.url}
              width={100}
              height={100}
              alt={`image-${i.toString()}`}
              className=" object-contain w-[90%]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
