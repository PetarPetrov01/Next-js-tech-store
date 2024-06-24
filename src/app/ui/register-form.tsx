"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserRegisterSchema } from "../lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = z.infer<typeof UserRegisterSchema>;

export default function RegisterForm({ ptSerif }: { ptSerif: NextFont }) {
  const formRef = useRef(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset
  } = useForm<Inputs>({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      repassword: '',
      username: ''
    }
  });

  return (
    <form
      ref={formRef}
      action="\"
      className="register flex flex-col items-center justify-start gap-8  w-[80%] "
    >
      <div className={`heading pt-8 ${ptSerif.className}`}>
        <h1 className="text-3xl">Register your account</h1>
      </div>
      <div className="input-group w-[80%]">
        <input
          type="text"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink"
          placeholder="Email"
          {...register('email')}
        />
      </div>
      <div className="input-group w-[80%]">
        <input
          type="text"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink"
          placeholder="Username"
          {...register('username')}
        />
      </div>
      <div className="input-group w-[80%]">
        <input
          type="password"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink"
          placeholder="Password"
          {...register('password')}
        />
      </div>
      <div className="input-group w-[80%]">
        <input
          type="password"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink focus:border-0"
          placeholder="Repeat password"
          {...register('repassword')}
        />
      </div>
      <button className="relative w-[80%] py-1 text-xl rounded-md border-pink border-[1px] duration-150 bg-pink text-white after:content-[''] after:absolute after:bottom-[-1em] after:block after:h-[1px] after:bg-gray-200 after:w-[100%] hover:border-white">
        Register
      </button>
    </form>
  );
}
