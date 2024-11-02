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
  handleUploadImages,
}: {
  handleUploadImages: (data: File[]) => void;
}) {
  const [images, setImages] = useState<FileWithPreview[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setImages((prev) => [
        ...prev,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { previewUrl: URL.createObjectURL(file) })
        ),
      ]);

      if (rejectedFiles.length > 0) {
        setRejectedFiles((prev) => {
          return [
            ...prev,
            ...rejectedFiles.filter(
              ({ file }) =>
                !prev.some(({ file: prevFile }) => prevFile.name == file.name)
            ),
          ];
        });
      }
    },
    []
  );

  const onRemoveImage = (fileName: string) => {
    setImages((files) => files.filter((file) => file.name !== fileName));
  };

  const onRemoveRejected = (fileName: string) => {
    setRejectedFiles((files) =>
      files.filter(({ file }) => file.name !== fileName)
    );
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

  const handleUploadClick = () => {
    handleUploadImages(images);
    setImages([]);
    setRejectedFiles([]);
  };

  return (
    <article className="bg-new-darkblue w-full min-h-[300px] flex flex-col items-center duration-300 overflow-hidden gap-8 py-8 text-new-mint">
      <div
        {...getRootProps({
          className:
            "flex justify-center items-center w-[90%] sm:w-[70%] h-48 border-[3px] border-dashed rounded-3xl border-gray-400 p-4 bg-neutral-200/15 duration-150 hover:bg-neutral-200/20  text-center cursor-pointer",
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
              onClick={handleUploadClick}
              className="py-2 px-4 border-[1px] border-new-peach-100"
            >
              Upload images
            </button>
            <h3>Accepted Images</h3>
            <ul className="w-full flex flex-wrap gap-6 justify-center">
              {images.map((f) => (
                <li key={f.name} className="relative basis-[40%] sm:basis-[30%] md:basis-[22%] mdl:basis-[17%]">
                  <div className="relative w-full aspect-[6/5] h-auto rounded-lg p-2 overflow-hidden">
                    <Image
                      src={f.previewUrl}
                      fill={true}
                      sizes="(min-width: 1280px) 292px, (min-width: 1024px) 20vw, (min-width: 768px) 10vw, 14vw"
                      /* (min-width: 1280px) 98px, (min-width: 1024px) 86px,(min-width: 768px) 7vw, 20vw */
                      alt={f.name}
                      onLoad={() => URL.revokeObjectURL(f.previewUrl)}
                      className="object-cover object-center"
                    />
                  </div>
                  <button
                    onClick={() => onRemoveImage(f.name)}
                    className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 p-1 rounded-full duration-150 bg-red-400/90 hover:bg-red-500/95"
                  >
                    <FaXmark className="text-3xl md:text-xl lg:text-lg"/>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        {rejectedFiles.length > 0 && (
          <>
            <h3>Rejected images</h3>
            <ul className="flex flex-col w-full">
              {rejectedFiles.map(({ file, errors }, i) => (
                <li
                  key={i + file.name}
                  className="flex items-start justify-between"
                >
                  <div className="flex flex-col gap-2">
                    <p>{file.name}</p>
                    <ul className="text-sm text-red-400">
                      {errors.map((er, i) => (
                        <li key={er.code + i}>
                          {er.code == "file-too-large"
                            ? `File is too large. Maximum allowed size is ${formatDataSize(
                                IMAGE_MAX_SIZE
                              )}`
                            : er.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => onRemoveRejected(file.name)}
                    className="p-2 border-[1px] border-new-mint"
                  >
                    Remove
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
