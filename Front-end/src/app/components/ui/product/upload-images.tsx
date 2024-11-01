import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import { formatDataSize } from "@/app/utils/formatDataSize";

const IMAGE_MAX_SIZE = 1024 * 1024 * 3;

type FileWithPreview = File & {
  previewUrl: string;
};

export default function UploadImages({
}: {
}) {
  const [images, setImages] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setImages((prev) => [
        ...prev,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { previewUrl: URL.createObjectURL(file) })
        ),
      ]);

    },
    []
  );

  const onRemoveImage = (fileName: string) => {
    setImages((files) => files.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: IMAGE_MAX_SIZE,
    validator: (file) => {
      if (images.some((im) => im.name == file.name)) {
        return {
          code: "same-image",
          message: "An image with the same name already exists",
        };
      }
      return null;
    },
  });

  return (
    <article className="bg-new-darkblue min-w-[900px] min-h-[600px] flex flex-col items-center duration-300 overflow-hidden h-full gap-8 py-8 text-new-mint">
      <div
        {...getRootProps({
          className:
            "flex justify-center items-center w-[70%] h-48 border-[3px] border-dashed rounded-3xl border-gray-400 p-4 bg-neutral-200/15 duration-150 hover:bg-neutral-200/20  text-center cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-xl">Drop the files here...</p>
        ) : (
          <p className="text-xl">
            Drag and drop images here, or click to select
          </p>
        )}
      </div>
      <div className="w-full flex flex-col items-center gap-8">
        {images.length > 0 && (
          <>
            <button
              className="py-2 px-4 border-[1px] border-new-peach-100"
            >
              Upload images
            </button>
            <h3>Accepted Images</h3>
            <ul className="w-full flex flex-wrap gap-6 justify-center">
              {images.map((f) => (
                <li key={f.name} className="relative basis-[17%]">
                  <div className="relative w-full aspect-[6/5] h-auto rounded-lg p-2 overflow-hidden">
                    <Image
                      src={f.previewUrl}
                      fill={true}
                      sizes="(max-width:989px) 15%"
                      alt={f.name}
                      onLoad={() => URL.revokeObjectURL(f.previewUrl)}
                      className="object-cover object-center"
                    />
                  </div>
                  <button
                    onClick={() => onRemoveImage(f.name)}
                    className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 p-1 rounded-full duration-150 bg-red-400/90 hover:bg-red-500/95"
                  >
                    <FaXmark size={"1.2em"} />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}
