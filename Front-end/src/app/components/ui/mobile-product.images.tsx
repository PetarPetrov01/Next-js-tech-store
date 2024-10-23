import Image from "next/image";

export default function MobileProductImages({ images }: { images: string[] }) {
  return (
      <div className="w-full flex justify-between overflow-x-scroll scrollbar-hide snap-mandatory snap-x">
        {images.map((imageUrl, i) => (
          <div key={i} className="flex-shrink-0 w-full flex justify-center snap-center">
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
  );
}
