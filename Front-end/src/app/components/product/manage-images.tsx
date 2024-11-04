"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { FaRegSquare, FaSquare, FaSquareCheck, FaXmark } from "react-icons/fa6";
import { BiSolidGridAlt, BiSolidGrid } from "react-icons/bi";

import DeleteImagesDialog from "./dialogs/delete-images-dialog";
import LayoutToggle from "./product-layout-toggle";
import { ProductWithImages } from "@/types/Product";
import UploadImages from "./upload-images";
import useWindowWidth from "@/hooks/useWindowWidth";

interface ReturnedImages {
  id: number;
  url: string;
  productId: string;
}

export default function ManageProductImages({
  product,
}: {
  product: ProductWithImages;
}) {
  const [images, setImages] = useState(product.images);
  const [selectedImageURLs, setSelectedImageURLs] = useState<string[]>([]);
  const [showDeleteImages, setShowDeleteImages] = useState(false);
  const [showUploadImages, setShowUploadImages] = useState(false);

  const { windowWidth } = useWindowWidth();

  const searchParams = useSearchParams();

  const gridSize = useMemo(() => searchParams.get("grid-size"), [searchParams]);

  const handleSelectImage = (url: string) => {
    setSelectedImageURLs((prev) => [...prev, url]);
  };

  const handleDeselectImage = (url: string) => {
    setSelectedImageURLs((prev) => prev.filter((imageUrl) => imageUrl != url));
  };

  const toggleUploadImages = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowUploadImages((prev) => !prev);
  };

  const handleClearSelection = () => {
    setSelectedImageURLs([]);
  };

  const handleDeleteImages = async () => {
    const res = await fetch(
      `http://localhost:3001/api/products/${product.id}/images`,
      {
        method: "delete",
        body: JSON.stringify({ images: selectedImageURLs }),
        headers: { "Content-type": "application/json" },
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.log("Failed");
      return;
    }

    setSelectedImageURLs([]);
    setImages((images) =>
      images.filter((img) => selectedImageURLs.includes(img.url) == false)
    );
  };

  const handleUploadImages = async (data: File[]) => {
    const formData = new FormData();
    if (data && data.length > 0) {
      data.forEach((file) => formData.append("images", file));
    }

    const res = await fetch(
      `http://localhost:3001/api/products/${product.id}/images`,
      {
        method: "post",
        body: formData,
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.log("error");
      return;
    }

    const returnedData: { images: ReturnedImages[] } = await res.json();
    const { images } = returnedData;

    setImages(images.map((image) => ({ id: image.id, url: image.url })));
    console.log(images);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4">
      <h1>Manage images</h1>
      {showDeleteImages && (
        <DeleteImagesDialog
          open={showDeleteImages}
          setShowDeleteImages={setShowDeleteImages}
          handleDeleteImages={handleDeleteImages}
          imagesCount={selectedImageURLs.length}
        />
      )}
      {images.length ? (
        <>
          <div
            className={`w-[90%] sm:w-[80%] flex items-end justify-between pb-2 min-h-16 duration-200 overflow-hidden border-b-2 border-new-mint`}
          >
            <div className="flex gap-2 items-center">
              <LayoutToggle
                paramName="grid-size"
                options={[
                  {
                    value: "normal",
                    icon:
                      windowWidth < 640 ? (
                        <BiSolidGridAlt className="w-full h-full" />
                      ) : (
                        <BiSolidGrid className="w-full h-full" />
                      ),
                  },
                  {
                    value: "big",
                    icon:
                      windowWidth < 640 ? (
                        <FaSquare className="w-[80%] h-[80%]" />
                      ) : (
                        <BiSolidGridAlt className="w-full h-full" />
                      ),
                  },
                ]}
                defaultValue="normal"
              />
              <div
                className={`flex gap-2 items-center duration-300 ${
                  selectedImageURLs.length > 0
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
                <h3>selected: {selectedImageURLs.length}</h3>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteImages(true)}
              className={`py-2 duration-300 bg-red-400/85 hover:bg-red-400 ${
                selectedImageURLs.length > 0
                  ? "px-4 opacity-100 pointer-events-auto tracking-normal"
                  : "px-0 opacity-0 pointer-events-none tracking-[-0.12em]"
              }`}
            >
              Delete selected
            </button>
          </div>
          <div
            className={`w-[90%] sm:w-[80%] flex flex-wrap duration-150 overflow-hidden ${
              gridSize == "big"
                ? "gap-0 gap-y-10 sm:gap-[4%] sm:gap-y-8 mdl:gap-[2%] mdl:gap-y-6"
                : "gap-[4%] gap-y-8 sm:gap-[2%] sm:gap-y-6 mdl:gap-[1%] mdl:gap-y-2"
            }`}
          >
            {images.map((im, i) => (
              <div
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleSelectImage(im.url);
                }}
                key={`${i}-${im.id}`}
                className={`relative group h-auto aspect-[4/3] duration-200 p-4 hover:bg-neutral-300/30 rounded-lg ${
                  gridSize == "big"
                    ? "flex-[0_0_100%] sm:flex-[0_0_48%] mdl:flex-[0_0_32%]"
                    : "flex-[0_0_48%] sm:flex-[0_0_32%] mdl:flex-[0_0_19.2%]"
                } ${
                  selectedImageURLs.includes(im.url)
                    ? "bg-neutral-300/30"
                    : "bg-neutral-400/25"
                }`}
              >
                <div className="relative w-full h-full group-hover:opacity-75 duration-200">
                  <Image
                    fill={true}
                    sizes="(min-width: 1280px) 292px, (min-width: 940px) 23vw, (min-width: 640px) 34vw, 82vw"
                    src={im.url}
                    alt={`${product.id}-image-${i}`}
                    className="object-cover pointer-events-none group-hover:scale-105 duration-150"
                  />
                </div>
                <div
                  className={`absolute duration-200 top-6 right-6 ${
                    selectedImageURLs.length > 0
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <button>
                    {selectedImageURLs.includes(im.url) ? (
                      <FaSquareCheck
                        onClick={(e) => {
                          console.log("click deselect");
                          e.stopPropagation();
                          e.preventDefault();
                          handleDeselectImage(im.url);
                        }}
                        size={"1.85em"}
                        className="text-new-peach-100"
                      />
                    ) : (
                      <FaRegSquare
                        onClick={(e) => {
                          console.log("click select");
                          e.stopPropagation();
                          e.preventDefault();
                          handleSelectImage(im.url);
                        }}
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
      <div className="flex flex-col items-center gap-8 w-[90%] sm:w-[80%]">
        <a
          onClick={toggleUploadImages}
          className="py-2 px-4 border-2 border-new-peach-100 cursor-pointer duration-200 hover:text-new-darkblue hover:bg-new-peach-100"
        >
          Upload {images.length > 0 && "more "}images
        </a>
        {showUploadImages && (
          <UploadImages handleUploadImages={handleUploadImages} />
        )}
      </div>
    </div>
  );
}
