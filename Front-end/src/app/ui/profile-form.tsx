"use client";

import { CameraIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";

export default function ProfileForm() {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log(event.target.files[0]);
      setSelectedImage(event.target.files[0].name);
    }
  };

  const onClose = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <form action="" ref={formRef}>
        <article className="flex w-full flex-col items-center gap-4">
          <h2 className="mt-4 text-dark-blue">Profile</h2>
          <div className="relative rounded-full border-4 border-[#00b4d8cc] shadow-md shadow-[#00b4d866]">
            <Image
              src={"/default-company-pic.png"}
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
              ref={imageInputRef}
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
            <div>
                <a href="">Save</a>
            </div>
        </article>
      </form>
    </div>
  );
}
