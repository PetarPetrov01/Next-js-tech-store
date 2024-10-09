import { XMarkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const ImageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => /jpg|png|jpeg/.test(file.name.toLocaleLowerCase()), {
      message: "File type not allowed",
    })
    .refine(
      (file) => /image\/png|image\/jpeg|image\/gif|image\/webp/.test(file.type),
      { message: "This file is not allowed" }
    )
    .refine((file) => file.size <= 1024 * 1024 * 5, {
      message: "File is too large",
    }),
});

type Inputs = z.infer<typeof ImageSchema>;

export default function UploadImageForm({
  setShowImageModal,
}: {
  setShowImageModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleUploadImage = () => {
    imageInputRef.current?.click();
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedImage(file.name);
      setValue("image", file);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(ImageSchema),
  });

  const { ref, ...rest } = register("image");

  const handleCloseModal = () => {
    setShowImageModal(false);
    document.body.style.overflow = "unset";
  };

  const handleCancel = () => {
    setSelectedImage(null);
    reset();
  };

  const processSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    if (formRef.current && data.image instanceof File) {
      const formData = new FormData();
      formData.append("image", data.image);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      console.log(formData);
    }
  };

  return (
    <div className="fixed  left-0 top-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-gray-200/40">
      <div className="text-new-teal-100 rounded-lg bg-new-mint p-8">
        <div className="mb-4 flex justify-between gap-14">
          <div></div>
          <h2>Change profile image</h2>
          <a
            className="relative bottom-4 left-4 w-8 cursor-pointer text-red-500 duration-150 hover:text-red-600"
            onClick={handleCloseModal}
          >
            <XMarkIcon width={50} className="w-full" />
          </a>
        </div>
        <form
          onSubmit={handleSubmit(processSubmit)}
          ref={formRef}
          className="flex flex-col items-center gap-4"
        >
          <a
            onClick={handleUploadImage}
            className="cursor-pointer border-2 border-dashed border-new-teal hover:bg-new-teal-100 hover:text-new-mint duration-150 p-2"
          >
            {selectedImage ? `Choose another image` : "Upload image"}
          </a>

          <input
            type="file"
            className="hidden"
            ref={(e) => {
              ref(e);
              imageInputRef.current = e;
            }}
            onChange={onImageChange}
          />
          {selectedImage && (
            <>
              <div className="relative flex gap-2 items-center">
                {errors?.image && (
                  <span className="absolute bottom-[-1em] mt-1 text-center text-sm italic text-new-sandstone ">
                    {errors.image.message}
                  </span>
                )}
                <p>{selectedImage}</p>
                <a
                  onClick={handleCancel}
                  className="text-red-400 cursor-pointer hover:text-red-500 duration-150"
                >
                  <XMarkIcon width={24} />
                </a>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-new-peach-100 w-20 h-10 enabled:hover:bg-new-sandstone duration-150"
              >
                {isLoading ? (
                  <div className="flex flex-row justify-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white animate-fast-bounce"></div>
                    <div className="w-3 h-3 rounded-full bg-white animate-fast-bounce [animation-delay:-.15s]"></div>
                    <div className="w-3 h-3 rounded-full bg-white animate-fast-bounce [animation-delay:-.3s]"></div>
                  </div>
                ) : (
                  <p className="text-xl">Save</p>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
