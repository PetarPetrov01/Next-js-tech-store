import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import { formatDataSize } from "@/app/utils/formatDataSize";
import { ButtonLoader, ButtonLoaderWrapper } from "../ui/loaders/button-loader";
import { uploadImages } from "@/app/lib/actions/product";

const IMAGE_MAX_SIZE = 1024 * 1024 * 3;
const MAX_FILES = 7;

type FileWithPreview = File & {
  previewUrl: string;
};

export default function UploadImages({
  toggleUploadImages,
  productId,
  setImages,
}: {
  toggleUploadImages: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  productId: string;
  setImages: Dispatch<SetStateAction<{ id: number; url: string }[]>>;
}) {
  const [uploadedImages, setUploadedImages] = useState<FileWithPreview[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setUploadedImages((prev) => {
        if (prev.length + acceptedFiles.length > MAX_FILES) {
          setError("Max files exceeded");
          return prev;
        }

        return [
          ...prev,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { previewUrl: URL.createObjectURL(file) })
          ),
        ];
      });

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
    setUploadedImages((files) =>
      files.filter((file) => file.name !== fileName)
    );
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
    maxFiles: MAX_FILES,
    validator: (file) => {
      if (uploadedImages.some((im) => im.name == file.name)) {
        return {
          code: "same-image",
          message: "An image with the same name already exists",
        };
      }
      return null;
    },
  });

  const handleUploadImages = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    const data = uploadedImages;

    const formData = new FormData();
    if (data && data.length > 0) {
      data.forEach((file) => formData.append("images", file));
    }

    const { result, error } = await uploadImages(productId, formData);

    if (error) {
      setIsLoading(false);
      setError(error.message);
      return;
    }

    if (result) {
      const { images } = result;
      setImages(images.map((image) => ({ id: image.id, url: image.url })));
      setIsLoading(false);
      setRejectedFiles([]);
      setUploadedImages([]);
    }
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    toggleUploadImages(e);
    setUploadedImages([]);
    setRejectedFiles([]);
  };

  return (
    <>
      <a
        onClick={handleCloseClick}
        className="py-2 px-4 border-2 border-new-peach-100 cursor-pointer duration-200 hover:text-new-darkblue hover:bg-new-peach-100"
      >
        Cancel
      </a>
      <article className="bg-new-darkblue w-full min-h-[300px] flex flex-col items-center duration-300 overflow-hidden gap-8 py-8 text-new-mint">
        <div
          {...getRootProps({
            className: `${
              uploadedImages.length < MAX_FILES
                ? "h-48 w-[90%] sm:w-[70%] border-[3px] p-4"
                : "h-0 w-0 border-0 p-0"
            } flex flex-col gap-1 justify-center items-center border-dashed rounded-3xl border-gray-400 bg-neutral-200/15 duration-150 hover:bg-neutral-200/20  text-center cursor-pointer`,
          })}
        >
          <input {...getInputProps()} />
          {uploadedImages.length < MAX_FILES &&
            (isDragActive ? (
              <p className="text-xl">Drop the files here...</p>
            ) : (
              <>
                <p className="text-xl">
                  Drag and drop images here, or click to select
                </p>
                <p className="text-xs">
                  *The maximum amount of files to be uploaded at once is{" "}
                  {MAX_FILES}
                </p>
              </>
            ))}
        </div>
        <div className="w-full flex flex-col items-center gap-8">
          {uploadedImages.length > 0 && (
            <>
              <div className="relative w-full flex justify-center">
                <ButtonLoaderWrapper isLoading={isLoading}>
                  <button
                    onClick={handleUploadImages}
                    className={`relative flex overflow-hidden items-stretch uppercase py-2.5 px-6 z-10 border-b-2 duration-150 after:absolute after:z-[-1] after:bottom-0 after:right-0 after:left-0 after:h-full after:w-0 after:bg-new-peach-90 after:duration-500 bg-neutral-700  border-new-peach-90 hover:after:w-full
                     ${
                       isLoading
                         ? "after:w-full pointer-events-none text-transparent"
                         : ""
                     }`}
                  >
                    Upload
                  </button>
                </ButtonLoaderWrapper>
                {error && (
                  <span className="absolute w-1/2 text-red-300 text-center bottom-[-1.35em]">
                    {error}
                  </span>
                )}
              </div>
              <h3>Accepted Images</h3>
              <ul className="w-full flex flex-wrap gap-6 justify-center">
                {uploadedImages.map((f) => (
                  <li
                    key={f.name}
                    className="relative basis-[40%] sm:basis-[30%] md:basis-[22%] mdl:basis-[17%]"
                  >
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
                      <FaXmark className="text-3xl md:text-xl lg:text-lg" />
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
    </>
  );
}
