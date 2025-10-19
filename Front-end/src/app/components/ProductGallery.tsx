'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useMemo, useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { RiImageEditFill } from 'react-icons/ri'
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useAuthContext } from '@/contexts/AuthProvider'
import useMounted from '@/hooks/useMounted'

import { ProductImageSkeleton } from '@/components/ui/loaders/skeletons'

import type { Swiper as SwiperType } from 'swiper'

export default function ProductGallery({ images, ownerId }: { images: string[]; ownerId: string }) {
  const { user } = useAuthContext()
  const pathname = usePathname()
  const hasMounted = useMounted()

  const isOwner = useMemo(() => user?.id == ownerId, [ownerId, user?.id])

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

  const navigationPrevRef = useRef<HTMLDivElement>(null)
  const navigationNextRef = useRef<HTMLDivElement>(null)


  return (
    <div className="relative w-full flex flex-col items-center gap-6 overflow-hidden">
      {hasMounted ? (
        <>
          <div className="group relative w-[90%] aspect-[5/4] h-auto flex justify-center">
            <Swiper className="w-full" thumbs={{ swiper: thumbsSwiper }} modules={[Thumbs, Navigation]} spaceBetween={10}>
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image || '/no-image.png'}
                    alt=""
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
                className="absolute top-2 right-2 rounded-lg z-[1] md:opacity-65 md:group-hover:opacity-90 md:group-hover:scale-110 duration-300 bg-neutral-500/25"
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
              modules={[Thumbs, Navigation]}
              // onBeforeInit={(swiper) => {
              //   swiperRef.current = swiper;
              // }}
              // onSlideChange={onSlideChange}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
            >
              {images.map((image, i) => (
                <SwiperSlide
                  key={i}
                  className={
                    'p-2 aspect-[5/4] h-auto border-[1px] border-transparent rounded-md cursor-pointer flex justify-center items-center'
                  }
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      fill={true}
                      sizes="(min-width: 1280px) 98px, (min-width: 1024px) 86px,(min-width: 768px) 7vw, 20vw"
                      alt={`image-${i.toString()}`}
                      className="object-contain pointer-events-none"
                    />
                  </div>
                </SwiperSlide>
              ))}
              <div ref={navigationPrevRef} className="swiper-button-prev">
                <IoIosArrowBack size={'1.3em'} />
              </div>
              <div ref={navigationNextRef} className="swiper-button-next">
                <IoIosArrowForward size={'1.3em'} />
              </div>
            </Swiper>
          </div>
        </>
      ) : (
        <ProductImageSkeleton />
      )}
    </div>
  )
}
