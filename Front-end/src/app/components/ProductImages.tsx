"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MobileProductImages from "./product/mobile-product.images";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthProvider";
import { RiImageEditFill } from "react-icons/ri";
import Link from "next/link";

const IMAGE_CONTAINER_WIDTH_IN_PERCENT = 23.5 / 100;
const IMAGES_GAP_IN_PERCENT = 2 / 100;

export default function ProductImages({
  images,
  ownerId,
}: {
  images: string[];
  ownerId: string;
}) {
  const [displayImageIndex, setDisplayImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user } = useAuthContext();
  const [currentScrollPage, setCurrentScrollPage] = useState(1);

  const totalImages = images.length;
  const scrollPages = Math.ceil(totalImages / 4);
  const isOwner = useMemo(() => user?.id == ownerId, [ownerId, user?.id]);

  const { windowWidth } = useWindowWidth();

  const changeImageIndex = (index: number) => {
    setDisplayImageIndex(index);
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: sliderWidth + IMAGES_GAP_IN_PERCENT * sliderWidth,
      });
      setCurrentScrollPage((prev) => prev + 1);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current?.clientWidth;
      let scrollAmount: number;

      if (currentScrollPage == scrollPages) {
        const lastPageItemsCount = totalImages % 4;

        scrollAmount =
          (IMAGE_CONTAINER_WIDTH_IN_PERCENT + IMAGES_GAP_IN_PERCENT) *
          sliderWidth *
          lastPageItemsCount;
      } else {
        scrollAmount = sliderWidth + IMAGES_GAP_IN_PERCENT * sliderWidth;
      }

      console.log(scrollAmount);
      sliderRef.current?.scrollBy({ left: -scrollAmount });
      setCurrentScrollPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 overflow-hidden">
      {windowWidth < 640 ? (
        <MobileProductImages
          isOwner={isOwner}
          images={images}
          pathname={pathname}
        />
      ) : (
        <>
          <div className="group relative w-[90%] aspect-[5/4] h-auto flex justify-center">
            <Image
              src={images[displayImageIndex] || "/no-image.png"}
              alt={`image-${displayImageIndex.toString()}`}
              className="w-[90%] object-contain pointer-events-none"
              fill={true}
              sizes="(min-width: 1280px) 549px, (min-width: 1024px) 486px,(min-width: 768px) 42vw, 70vw"
            />
            {isOwner && (
              <Link
                href={`${pathname}/images`}
                className="absolute top-2 right-2 rounded-lg md:opacity-65 md:group-hover:opacity-90 md:group-hover:scale-110 duration-300 bg-neutral-500/25"
              >
                <RiImageEditFill className="text-[3em] md:text-[2.4em]" />
              </Link>
            )}
          </div>
          <div className="relative flex justify-center w-full">
            {currentScrollPage > 1 && (
              <button
                onClick={scrollLeft}
                className="absolute left-[4%] top-1/2 -translate-y-1/2 rounded-full bg-transparent p-2 duration-200 hover:bg-neutral-600"
              >
                <IoIosArrowBack size={"1.3em"} />
              </button>
            )}
            <div
              id="slider"
              ref={sliderRef}
              className="flex gap-[2%] overflow-x-scroll w-[80%] scrollbar-hide scroll-smooth touch-none"
            >
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
                      // sizes="(max-width: 768px) 13vw, (max-width: 1024px) 7vw, (max-width: 1280px) 8vw"
                      sizes="(min-width: 1280px) 98px, (min-width: 1024px) 86px,(min-width: 768px) 7vw, 20vw"
                      alt={`image-${i.toString()}`}
                      className="object-contain pointer-events-none"
                    />
                  </div>
                </div>
              ))}
            </div>
            {currentScrollPage < scrollPages && (
              <button
                onClick={scrollRight}
                className="absolute right-[4%] top-1/2 -translate-y-1/2 rounded-full bg-transparent p-2 duration-200 hover:bg-neutral-600"
              >
                <IoIosArrowForward size={"1.3em"} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
