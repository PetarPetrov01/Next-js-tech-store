"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { useFormState } from "react-dom";
import { login } from "../lib/actions";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/contexts/AuthProvider";
import { useRouter } from "next/navigation";

const UserLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

type Inputs = z.infer<typeof UserLoginSchema>;

export default function LoginForm({ ptSerif }: { ptSerif: NextFont }) {
  const formRef = useRef<HTMLFormElement>(null);
  const { setAuth } = useAuthContext();
  const router = useRouter();

  // const initialState = { message: "", errors: {} };
  // const [state, dispatch] = useFormState(login, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const processSubmit = handleSubmit(async (data) => {
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      setError("root.apiError", { message: "Invalid email or password!" });
      return;
    }

    const result = await res.json();
    setAuth(result);
    router.replace("/");
  });

  return (
    <form
      ref={formRef}
      // action={dispatch}
      onSubmit={processSubmit}
      className="login flex flex-col items-center justify-start gap-8  w-[80%] "
    >
      <div className={`heading pt-8 ${ptSerif.className}`}>
        <h1 className="text-3xl">Login to your account</h1>
      </div>
      <div className="relative flex flex-col input-group w-[80%]">
        <input
          type="text"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink"
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
          type="password"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <span className="absolute bottom-[-1.5em]">
            {errors.password.message}
          </span>
        )}
        {errors.root?.apiError && (
          <span className="absolute bottom-[-1.5em]">
          {errors.root?.apiError.message}
        </span>
        )}
      </div>
      <div className="w-[80%] relative ">
        {/* <p className="absolute -top-6 text-center w-[100%]">{state?.message}</p> */}
        <button className="relative w-[100%] py-1 text-xl rounded-md border-pink border-[1px] duration-150 bg-pink text-white after:content-[''] after:absolute after:bottom-[-1em] after:block after:h-[1px] after:bg-gray-200 after:w-[100%] hover:border-white">
          Login
        </button>
      </div>
    </form>
  );
}
