import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { RiImageEditFill } from 'react-icons/ri'
import { Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { Swiper as SwiperType } from 'swiper'

export default function DesktopProductImages({
  images,
  isOwner,
  pathname,
}: {
  images: string[]
  isOwner: boolean
  pathname: string
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  return (
    <>
      <div className="group relative w-[90%] aspect-[5/4] h-auto flex justify-center"
      >
        <Swiper className="w-full"  thumbs={{ swiper: thumbsSwiper }} modules={[Thumbs]}>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image || '/no-image.png'}
                alt=''
                className="w-[90%] object-contain pointer-events-none"
                fill={true}
                sizes="(min-width: 1280px) 549px, (min-width: 1024px) 486px,(min-width: 768px) 42vw, 70vw"
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
        <Swiper
          className="w-full thumb-slider"
          slidesPerView={4}
          spaceBetween={6}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress={true}
          modules={[Thumbs]}
        >
          {/* <button className="absolute left-[4%] top-1/2 -translate-y-1/2 rounded-full bg-neutral-300/20 p-1.5 md:p-2 duration-200 hover:bg-neutral-600">
          <IoIosArrowBack size={'1.3em'} />
        </button> */}
          {images.map((image, i) => (
            <SwiperSlide
              key={i}
              className={'p-2 aspect-[5/4] h-auto border-[1px] border-transparent rounded-md cursor-pointer flex justify-center items-center'}
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
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <button className="absolute right-[4%] top-1/2 -translate-y-1/2 rounded-full bg-neutral-300/20 p-1.5 md:p-2 duration-200 hover:bg-neutral-600">
          <IoIosArrowForward size={'1.3em'} />
        </button> */}
      </div>
    </>
  )
}
