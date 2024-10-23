"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ProductImages({ images }: { images: string[] }) {
  const [displayImageIndex, setDisplayImageIndex] = useState(0);
  const { windowWidth } = useWindowWidth();

  const changeImageIndex = (index: number) => {
    setDisplayImageIndex(index);
  };

  console.log(images);

  return (
    <div className="w-full flex flex-col gap-6 overflow-hidden">
      <div className="flex justify-center">
        <Image
          src={images[displayImageIndex]}
          alt={`image-${displayImageIndex.toString()}`}
          className="w-[90%] object-cover"
          width={600}
          height={600}
        />
      </div>
      <div className="relative flex justify-center w-full">
        <button className="absolute left-[4%] top-1/2 -translate-y-1/2 rounded-full bg-transparent p-2 duration-200 hover:bg-neutral-600">
          <IoIosArrowBack size={"1.3em"} />
        </button>
        <div className="flex gap-[2%] overflow-x-scroll w-[80%] scrollbar-hide">
          {images.map((image, i) => (
            <div
              key={i}
              onClick={() => changeImageIndex(i)}
              className={`min-w-[23.5%] p-2 aspect-[5/4] h-auto border-[1px] rounded-md cursor-pointer flex justify-center items-center hover:bg-gray-50/20 duration-75 ${
                i == displayImageIndex
                  ? "border-neutral-400"
                  : "border-transparent"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  fill={true}
                  alt={`image-${i.toString()}`}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        <button className="absolute right-[4%] top-1/2 -translate-y-1/2 rounded-full bg-transparent p-2 duration-200 hover:bg-neutral-600">
          <IoIosArrowForward size={"1.3em"} />
        </button>
      </div>
    </div>
  );
}
