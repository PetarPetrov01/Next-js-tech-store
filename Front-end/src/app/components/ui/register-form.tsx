"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerUser } from "../../lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthProvider";

const UserRegisterSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: "First name is required" })
      .min(3, { message: "First name must be atleast 3 characters long" }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" })
      .min(3, { message: "Last name must be atleast 3 characters long" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email" }),
    username: z
      .string()
      .trim()
      .min(1, { message: "Username is required" })
      .min(3, { message: "Username must be atleast 3 characters long" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters long" }),
    repassword: z
      .string()
      .trim()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be atleast 6 characters long" }),
  })
  .refine((data) => data.password == data.repassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });

type Inputs = z.infer<typeof UserRegisterSchema>;

export default function RegisterForm({ ptSerif }: { ptSerif: NextFont }) {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { setAuth } = useAuthContext();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repassword: "",
      username: "",
    },
  });

  const processSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      //Check the error from the res itself
      setError("root.apiError", { message: "Registration failed" });
      setIsLoading(false);
    }

    const result = await res.json();
    setAuth(result);
    setIsLoading(false);
    router.replace("/");
  });

  return (
    <form
      onSubmit={processSubmit}
      ref={formRef}
      className="register flex flex-col items-center justify-start gap-8  w-[80%] "
    >
      <div className={`heading pt-8 ${ptSerif.className}`}>
        <h1 className="text-3xl text-new-peach-100">Register your account</h1>
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="text"
          className="text-new-darkblue rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-peach"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <span className="absolute bottom-[-1.5em]">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="text"
          className="text-new-darkblue rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-peach"
          placeholder="First name"
          {...register("firstName")}
        />
        {errors.firstName && (
          <span className="absolute bottom-[-1.5em]">
            {errors.firstName.message}
          </span>
        )}
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="text"
          className="text-new-darkblue rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-peach"
          placeholder="Last name"
          {...register("lastName")}
        />
        {errors.lastName && (
          <span className="absolute bottom-[-1.5em]">
            {errors.lastName.message}
          </span>
        )}
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="text"
          className="text-new-darkblue rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-peach"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && (
          <span className="absolute bottom-[-1.5em]">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="password"
          className="text-new-darkblue rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-peach"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <span className="absolute bottom-[-1.5em]">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="password"
          className="text-new-darkblue rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-peach focus:border-0"
          placeholder="Repeat password"
          {...register("repassword")}
        />
        {errors.repassword && (
          <span className="absolute bottom-[-1.5em]">
            {errors.repassword.message}
          </span>
        )}
        {errors.root?.apiError && (
          <span className="absolute bottom-[-1.5em]">
            {errors.root.apiError.message}
          </span>
        )}
      </div>
      <button
        disabled={isLoading}
        className="relative flex flex-col w-[80%] py-1 text-xl rounded-md border-new-peach border-[1px] duration-150 bg-new-peach-100 text-new-darkblue after:content-[''] after:absolute after:bottom-[-1em] after:block after:h-[1px] after:bg-gray-200 after:w-[100%] enabled:hover:border-new-mint disabled:cursor-default"
      >
        {isLoading ? (
          <div className="flex flex-row justify-center gap-2 p-1.5">
            <div className="w-3 h-3 rounded-full bg-white animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : (
          <p className="text-xl">Register</p>
        )}
      </button>
    </form>
  );
}
