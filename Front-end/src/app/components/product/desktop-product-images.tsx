import { useThrottle } from "@/hooks/useThrottle";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiImageEditFill } from "react-icons/ri";

const IMAGE_CONTAINER_WIDTH_IN_PERCENT = 23.5 / 100;
const IMAGES_GAP_IN_PERCENT = 2 / 100;

export default function DesktopProductImages({
  images,
  isOwner,
  pathname,
}: {
  images: string[];
  isOwner: boolean;
  pathname: string;
}) {
  const [displayImageIndex, setDisplayImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentScrollPage, setCurrentScrollPage] = useState(1);

  const totalImages = images.length;
  const scrollPages = useMemo(() => Math.ceil(totalImages / 4), [totalImages]);
  const changeImageIndex = (index: number) => {
    setDisplayImageIndex(index);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.clientWidth;
      const fullPageWidth =
        (IMAGE_CONTAINER_WIDTH_IN_PERCENT + IMAGES_GAP_IN_PERCENT) *
        sliderWidth *
        4;

      let scrollPosition = 0;
      if (currentScrollPage == scrollPages) {
        const itemsOnLastPage = totalImages % 4 || 4;

        scrollPosition =
          fullPageWidth * (currentScrollPage - 2) +
          itemsOnLastPage * sliderWidth;
      } else {
        scrollPosition = fullPageWidth * (currentScrollPage - 1);
      }

      sliderRef.current.scrollTo({ left: scrollPosition });
    }
  }, [currentScrollPage, scrollPages, totalImages]);

  const scrollRight = useThrottle(() => {
    if (sliderRef.current) {
      setCurrentScrollPage((prev) => prev + 1);
    }
  }, 300);

  const scrollLeft = useThrottle(() => {
    if (sliderRef.current) {
      setCurrentScrollPage((prev) => prev - 1);
    }
  }, 300);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.deltaX > 0 || e.deltaY > 0) {
      scrollRight();
    } else {
      scrollLeft();
    }
  };

  return (
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
            className="absolute left-[4%] top-1/2 -translate-y-1/2 rounded-full bg-neutral-300/20 p-2 duration-200 hover:bg-neutral-600"
          >
            <IoIosArrowBack size={"1.3em"} />
          </button>
        )}
        <div
          id="slider"
          ref={sliderRef}
          onWheel={handleWheel}
          className="flex gap-[2%] overflow-hidden w-[80%] scroll-smooth touch-none"
        >
          {images.map((image, i) => (
            <div
              key={i}
              onClick={() => changeImageIndex(i)}
              className={`flex-[0_0_23.5%] p-2 aspect-[5/4] h-auto border-[1px] rounded-md cursor-pointer flex justify-center items-center hover:bg-gray-50/20 duration-75 ${
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
            className="absolute right-[4%] top-1/2 -translate-y-1/2 rounded-full bg-neutral-300/20 p-2 duration-200 hover:bg-neutral-600"
          >
            <IoIosArrowForward size={"1.3em"} />
          </button>
        )}
      </div>
    </>
  );
}
