"use client";

import { User } from "@/types/User";
import { CameraIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import UploadImageForm from "./upload-form";

const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(6, "Username must be atleast 6 characters long")
    .max(15, "Username must be no more than 15 characters long"),
  phone: z
    .string()
    .trim()
    .min(6, "Phone must be atleast 6 characters long")
    .max(15, "Phone must be no more than 15 characters long"),
});

type Inputs = z.infer<typeof userSchema>;

export default function ProfileForm({ user }: { user: User }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing((state) => !state);
  };

  const handleImageClick = () => {
    setShowImageModal(true);
    document.body.style.overflow = "hidden";
  };

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(userSchema),
    defaultValues: { ...user, phone: "1234567890" },
  });

  const onCancelClick = () => {
    reset();
    setIsEditing(false);
  };

  const processSubmit = handleSubmit(async (data) => {
    console.log(data);
    toggleEditing();
  });

  return (
    <>
      <h2 className="mt-4 text-new-peach-100 text-center">
        {user.firstName} {user.lastName}
      </h2>
      <div className="flex flex-col items-center sm:items-start sm:flex-row justify-between sm:gap-5 w-full">
        <article className="w-[60%]  sm:w-[35%] relative flex flex-col items-center gap-4 py-10">
          <form
            onSubmit={processSubmit}
            className="relative w-[95%] flex flex-col items-center bg-new-teal-100 pt-28 p-16 rounded-2xl min-h-[20vh]"
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
              <a className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-new-gray text-new-peach-100 p-[0.4rem] duration-150 hover:bg-new-teal-100">
                <CameraIcon height={20} width={20} />
              </a>
            </div>
            <div
              className={`flex flex-col duration-150 gap-1 pb-1 ${
                isEditing && "gap-7 pb-7"
              }`}
            >
              <div className=" flex flex-col relative">
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Username"
                  disabled={!isEditing}
                  className="w-full pr-2 py-0.5 text-xl bg-white/15 rounded-md outline-none enabled:pl-2 disabled:bg-transparent text-new-mint duration-150"
                />
                {isEditing && errors.username && (
                  <>
                    <span className="absolute top-full text-new-peach-100 text-xs italic">
                      {errors.username.message}
                    </span>
                  </>
                )}
              </div>
              <div className="flex flex-col relative">
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Phone"
                  disabled={!isEditing}
                  className="w-full pr-2 py-0.5 text-xl bg-white/15 rounded-md outline-none enabled:pl-2 disabled:bg-transparent text-new-mint duration-150"
                />
                {isEditing && errors.phone && (
                  <>
                    <span className="absolute top-full text-new-peach-100 text-xs italic">
                      {errors.phone.message}
                    </span>
                  </>
                )}
              </div>
            </div>
            {isEditing ? (
              <>
                <button
                  type="submit"
                  className="py-1 px-3 rounded-sm block bg-new-peach-100 text-new-gray hover:bg-new-sandstone duration-200"
                >
                  Save
                </button>
                <a
                  onClick={onCancelClick}
                  className="cursor-pointer mt-2 py-1 px-3 rounded-sm bg-new-mint text-new-gray hover:bg-new-gray hover:text-new-mint duration-150"
                >
                  Cancel
                </a>
              </>
            ) : (
              <a
                onClick={toggleEditing}
                className=" px-3 py-1  self-center cursor-pointer rounded-sm bg-new-peach-100 text-new-gray  hover:bg-new-sandstone duration-150"
              >
                Edit
              </a>
            )}
          </form>
        </article>
        <article className="w-[85%] sm:w-[60%] sm:py-10">
          <div className="bg-new-teal-100 rounded-2xl p-10">
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
