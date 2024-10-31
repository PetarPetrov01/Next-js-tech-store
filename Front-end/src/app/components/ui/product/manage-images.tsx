"use client";

import { ProductWithImages } from "@/types/Product";
import Image from "next/image";
import { useState } from "react";
import { FaRegSquare, FaSquareCheck, FaXmark } from "react-icons/fa6";
import DeleteImagesDialog from "./delete-images-dialog";

export default function ManageProductImages({
  product,
}: {
  product: ProductWithImages;
}) {
  const [images, setImages] = useState(product.images);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showDeleteImages, setShowDeleteImages] = useState(false);

  const handleSelectImage = (id: string) => {
    console.log("Selecting");
    setSelectedImages((prev) => [...prev, id]);
  };

  const handleDeselectImage = (id: string) => {
    setSelectedImages((prev) => prev.filter((imgId) => imgId != id));
  };

  const handleClearSelection = () => {
    setSelectedImages([]);
  };

  const handleDeleteImages = () => {
    console.log(selectedImages);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4">
      <h1>Manage images</h1>
      {showDeleteImages && (
        <DeleteImagesDialog
          open={showDeleteImages}
          setShowDeleteImages={setShowDeleteImages}
          handleDeleteImages={handleDeleteImages}
          imagesCount={selectedImages.length}
        />
      )}
      {images.length ? (
        <>
          <div className="w-[80%] flex items-end justify-between pb-2 min-h-16 border-b-2 border-new-mint">
            <div
              className={`flex gap-2 items-center duration-300 ${
                selectedImages.length > 0
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={handleClearSelection}
                className="rounded-full p-1.5 hover:bg-neutral-200/15 duration-150"
              >
                <FaXmark size={"1.3em"} />
              </button>
              <h3>selected: {selectedImages.length}</h3>
            </div>
            <button
              onClick={() => setShowDeleteImages(true)}
              className={`py-2 duration-300 bg-red-400 ${
                selectedImages.length > 0
                  ? "px-4 opacity-100 pointer-events-auto"
                  : "px-0 opacity-0 pointer-events-none"
              }`}
            >
              Delete selected
            </button>
          </div>
          <div className="w-[80%] min-h-[300px] flex gap-8 overflow-x-scroll snap-mandatory snap-x ">
            {images.map((im, i) => (
              <div
                key={`${i}-${im.id}`}
                className="relative group h-auto aspect-[5/4] basis-[23%] snap-center p-4 bg-neutral-400/25 rounded-sm"
              >
                <div className="relative w-full h-full">
                  <Image
                    fill={true}
                    src={im.url}
                    alt={`${product.id}-image-${i}`}
                    className="object-contain"
                  />
                </div>
                <div
                  className={`absolute duration-200 top-6 right-6 ${
                    selectedImages.length > 0
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <button>
                    {selectedImages.includes(im.id) ? (
                      <FaSquareCheck
                        onClick={(e) => handleDeselectImage(im.id)}
                        size={"1.85em"}
                        className="text-new-peach-100"
                      />
                    ) : (
                      <FaRegSquare
                        onClick={(e) => handleSelectImage(im.id)}
                        size={"1.85em"}
                      />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>
            The product &quot;{product.name}&quot; still doesn&apos;t have any
            images
          </h2>
        </>
      )}
      <button className="py-2 px-4 border-2 border-new-peach-100 duration-200 hover:text-new-darkblue hover:bg-new-peach-100">
        Upload images
      </button>
    </div>
  );
}
