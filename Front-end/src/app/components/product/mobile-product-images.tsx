import Image from "next/image";
import Link from "next/link";
import { RiImageEditFill } from "react-icons/ri";

export default function MobileProductImages({
  images,
  isOwner,
  pathname,
}: {
  images: string[];
  isOwner: boolean;
  pathname: string;
}) {
  return (
    <>
      <div className="relative w-full aspect-[5/4] h-auto flex justify-between overflow-x-scroll scrollbar-hide snap-mandatory snap-x">
        {images.map((imageUrl, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full flex justify-center snap-center"
          >
            <Image
              src={imageUrl}
              alt={`Product image - ${i}`}
              width={800}
              height={800}
              className="w-[90%] object-contain pointer-events-none"
            />
          </div>
        ))}
      </div>
      {isOwner && (
        <Link
          href={`${pathname}/images`}
          className="absolute top-8 right-8 rounded-lg md:opacity-65 md:group-hover:opacity-90 md:group-hover:scale-110 duration-300 bg-neutral-500/25"
        >
          <RiImageEditFill className="text-[3em] md:text-[2.4em]" />
        </Link>
      )}
    </>
  );
}
