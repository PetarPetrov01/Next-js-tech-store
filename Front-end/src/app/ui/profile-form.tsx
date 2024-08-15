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

const userSchema = z.object({
  username: z.optional(z.string().trim()),
  phone: z.optional(z.string().trim()),
});

type Inputs = z.infer<typeof userSchema>;

export default function ProfileForm({ user }: { user: User }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    console.log("sea");
    setIsEditing((state) => !state);
  };

  const handleImageClick = () => {
    setShowImageModal(true);
    document.body.style.overflow = "hidden";
  };

  const { handleSubmit, reset, register } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
    defaultValues: {...user ,phone: '1234567890'}
  });

  const processSubmit = handleSubmit(async (data) => {
    console.log('sumb')
    toggleEditing()
  });

  return (
    <>
      <h2 className="mt-4 text-new-peach text-center">
        {user.firstName} {user.lastName}
      </h2>
      <div className="flex flex-col items-center sm:items-start sm:flex-row justify-between sm:gap-5 w-full">
        <article className="w-[60%]  sm:w-[35%] relative flex flex-col items-center gap-4 py-10">
          <form
            onSubmit={processSubmit}
            className="relative w-[95%] flex flex-col items-center bg-new-teal pt-28 p-16 rounded-2xl min-h-[20vh]"
          >
            <div
              onClick={handleImageClick}
              className="absolute top-[-35%] sm:top-[-25%] left-[50%] translate-x-[-50%] rounded-full border-4 border-new-peach shadow-md shadow-new-sandstone"
            >
              <Image
                src={user?.image ? user.image : "/default-company-pic.png"}
                alt="profile pic"
                width={150}
                height={150}
                className="rounded-full aspect-square object-cover"
              />
              <a className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-new-gray text-new-peach p-[0.4rem] duration-150 hover:bg-new-teal">
                <CameraIcon height={20} width={20} />
              </a>
            </div>
            <input
              type="text"
              {...register("username")}
              placeholder="Username"
              disabled={!isEditing}
              className="w-full pr-2 text-xl bg-white/15 rounded-md outline-none enabled:pl-2 enabled:mb-4 enabled: disabled:bg-transparent text-new-mint duration-150"
            />
            <input
              type="text"
              {...register("phone")}
              placeholder="Phone"
              disabled={!isEditing}
              className="w-full pr-2 text-xl bg-white/15 rounded-md outline-none enabled:pl-2 enabled:mb-4 enabled: disabled:bg-transparent text-new-mint duration-150"
            />
            {isEditing ? (
              <button type="submit" className="py-1 px-3 rounded-sm block bg-new-peach text-new-gray hover:bg-new-sandstone duration-200">Save</button>
            ) : (
              <a onClick={toggleEditing} className="self-end cursor-pointer">Edit</a>
            )}
          </form>
        </article>
        <article className="w-[85%] sm:w-[60%] sm:py-10">
          <div className="bg-new-teal rounded-2xl p-10">
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus repudiandae iusto corrupti labore culpa reiciendis
              amet id quos est magni.
            </h3>
          </div>
        </article>
      </div>
      {showImageModal && (
        <UploadImageForm setShowImageModal={setShowImageModal} />
      )}
    </>
  );
}
