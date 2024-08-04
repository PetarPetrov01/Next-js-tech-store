"use client";

import { User } from "@/types/User";
import { CameraIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const ImageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => /jpg|png|jpeg/.test(file.name.toLocaleLowerCase()), {
      message: "File type not allowed",
    })
    .refine((file)=>/image\/png|image\/jpeg|image\/gif|image\/webp/.test(file.type),{message: 'This file is not allowed'})
    .refine((file) => file.size <= 1024 * 200, {
      message: "File is too large",
    })
});

type Inputs = z.infer<typeof ImageSchema>;

export default function ProfileForm({user}:{user: User}) {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const imageInputRef = useRef< HTMLInputElement| null>( null);
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.type)
      setSelectedImage(file.name);
      setValue('image',file);
    }
  };

  console.log('IMAGE')
  console.log(user?.image)

  const {
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    register,
    setValue
  } = useForm<Inputs>({
    resolver: zodResolver(ImageSchema),
  });

  const { ref, ...rest } = register("image");

  const onClose = () => {
    setSelectedImage(null);
    reset();
  };

  const processSubmit: SubmitHandler<Inputs> = async (data) => {
    if (formRef.current) {
      //If new FormData(formRef.current) is used, the file size appears to be 0 !?
      const formData = new FormData();
      formData.append('image',data.image)
      try {
        const response = await fetch('http://localhost:3001/api/upload/image',{
          method: 'POST',
          body: formData,
          credentials: "include",
        })

        const result = await response.json();
        router.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form action="" ref={formRef} encType="multipart/form-data" onSubmit={handleSubmit(processSubmit)}>
        <article className="relative flex w-full flex-col items-center gap-4">
          <h2 className="mt-4 text-dark-blue">Profile</h2>
          <div className="relative rounded-full border-4 border-[#00b4d8cc] shadow-md shadow-[#00b4d866]">
            <Image
              src={user?.image ? user.image : "/default-company-pic.png"}
              alt="profile pic"
              width={150}
              height={150}
              className="rounded-full"
            />
            <a className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-gray-200 p-[0.4rem] duration-150 hover:bg-gray-300">
              <CameraIcon height={20} width={20} onClick={handleImageClick} />
            </a>
            <input
              type="file"
              className="hidden"
              ref={(e) => {
                ref(e)
                imageInputRef.current = e
              }}
              {...rest}
              onChange={onImageChange}
            />
          </div>
          {selectedImage && (
            <div className="flex gap-6 items-center border-b-[1px] border-lightblue">
              <p>{selectedImage}</p>
              <a
                className="cursor-pointer hover:text-lightblue"
                onClick={onClose}
              >
                <XMarkIcon height={30} />
              </a>
            </div>
          )}
          {selectedImage && errors?.image && (
            <span className="absolute bottom-[-1.5em] mt-1  text-sm italic text-pink ">
              {errors.image.message}
            </span>
          )}
        </article>
        {selectedImage && (
          <div className="flex justify-center mt-8">
            <button type="submit" className="px-4 py-2 bg-[#00b4d888]">
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
