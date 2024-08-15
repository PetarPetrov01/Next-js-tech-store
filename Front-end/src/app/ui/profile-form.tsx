"use client";

import { User } from "@/types/User";
import { CameraIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import UploadImageForm from "./upload-form";

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
    .refine((file) => file.size <= 1024 * 200, {
      message: "File is too large",
    }),
});

type Inputs = z.infer<typeof ImageSchema>;

export default function ProfileForm({ user }: { user: User }) {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageClick = () => {
    setShowImageModal(true);
    document.body.style.overflow = 'hidden';
  };
  console.log(user?.image);

  return (
    <>
      <h2 className="mt-4 text-new-peach text-center">{user.firstName} {user.lastName}</h2>
      <div
                className="flex flex-col items-center sm:items-start sm:flex-row justify-between sm:gap-5 w-full"
      >
        <article className="w-[60%]  sm:w-[35%] relative flex flex-col items-center gap-4 py-10">
          <div className="relative w-[95%] flex flex-col bg-new-teal pt-28 p-16 rounded-2xl min-h-[20vh]">
            <div onClick={handleImageClick} className="absolute top-[-35%] sm:top-[-25%] left-[50%] translate-x-[-50%] rounded-full border-4 border-new-peach shadow-md shadow-new-sandstone">
              <Image
                src={user?.image ? user.image : "/default-company-pic.png"}
                alt="profile pic"
                width={150}
                height={150}
                className="rounded-full aspect-square object-cover"
              />
              <a className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-new-gray text-new-peach p-[0.4rem] duration-150 hover:bg-new-teal">
                <CameraIcon height={20} width={20}/>
              </a>
              
            </div>
            <h3>{user.username}</h3>
            <h3>{user.email}</h3>
            <h3>phone</h3>
          </div>
  
        </article>
        <article className="w-[85%] sm:w-[60%] sm:py-10">
          <div className="bg-new-teal rounded-2xl p-10">
          <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus repudiandae iusto corrupti labore culpa reiciendis amet id quos est magni.</h3>
          
          </div>
        </article>
        {selectedImage && (
          <div className="flex justify-center mt-8">
            <button type="submit" className="px-4 py-2 bg-[#00b4d888]">
              Save
            </button>
          </div>
        )}
      </div>
      {showImageModal && <UploadImageForm setShowImageModal={setShowImageModal}/>}
    </>
  );
}
