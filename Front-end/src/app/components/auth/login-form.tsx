"use client";

import { useRouter } from "next/navigation";
import { NextFont } from "next/dist/compiled/@next/font";

import { HTMLAttributes, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchemaType, UserLoginSchema } from "@/zodSchemas/loginSchema";

import { login } from "@/app/lib/actions/auth";
import { checkAuth } from "@/app/utils/checkAuth";
import { useAuthContext } from "@/contexts/AuthProvider";
import { ButtonLoaderWrapper } from "../ui/loaders/button-loader";

const inputWrapperPseudoClasses =
  "before:absolute before:top-0 before:left-0 before:w-full before:duration-150 before:h-full before:border-[1px] before:border-[#6a6a6a] after:absolute after:block after:left-0 after:top-0 after:h-full after:duration-500 after:ease-in-out after:border-new-peach-80 after:z-10 focus-within:after:border-[1px] focus-within:after:w-full";

export default function LoginForm({ ptSerif }: { ptSerif: NextFont }) {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const { setAuth, clearAuth, user } = useAuthContext();
  const router = useRouter();

  useLayoutEffect(() => {
    if (user?.email) {
      const initAuth = async () => {
        const user = await checkAuth();
        if (!user?.email) {
          clearAuth();
        }
      };

      initAuth();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    setError,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const processSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const { error, result } = await login(data);

    if (error) {
      setError("root.apiError", error);
      setIsLoading(false);
      return;
    }

    if (result) {
      setAuth(result);
      setIsLoading(false);
      router.back();
    }
  });

  return (
    <form
      ref={formRef}
      onSubmit={processSubmit}
      className="login flex flex-col items-center justify-start gap-8 w-full"
    >
      <div className={`heading pt-8 ${ptSerif.className}`}>
        <h1 className="text-[2rem]">Login to your account</h1>
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoClasses} ${
          dirtyFields.email ? "after:w-full after:border-[1px]" : "after:w-0"
        } `}
      >
        <input
          type="text"
          className="text-lg relative border-0 w-full h-full bg-new-darkblue outline-none py-2 px-3 z-20"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <span className="absolute bottom-[-1.5em] font-thin text-new-peach-90">
            {errors.email.message}
          </span>
        )}
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoClasses} ${
          dirtyFields.password
            ? "after:w-full after:border-[1px]"
            : "after:w-[0]"
        } `}
      >
        <input
          type="password"
          className="text-lg relative border-0 w-full h-full bg-new-darkblue outline-none py-2 px-3 z-20"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <span className="absolute bottom-[-1.5em] font-thin text-new-peach-90">
            {errors.password.message}
          </span>
        )}
        {errors.root?.apiError && (
          <span className="absolute bottom-[-1.5em] font-thin text-new-peach-90">
            {errors.root?.apiError.message}
          </span>
        )}
      </div>
      <ButtonLoaderWrapper isLoading={isLoading}>
        <button
          type="submit"
          disabled={isLoading}
          className={`relative flex overflow-hidden items-stretch uppercase py-2.5 px-6 z-10 border-b-2 duration-150 after:absolute after:z-[-1] after:bottom-0 after:right-0 after:left-0 after:h-full after:w-0 after:bg-new-peach-90 after:duration-500 ${
            isValid
              ? "bg-neutral-700  border-new-peach-90 hover:after:w-full"
              : "bg-neutral-600 border-new-midnight-100 hover:text-white"
          } ${
            isLoading ? "after:w-full pointer-events-none text-transparent" : ""
          }`}
        >
          Login
        </button>
      </ButtonLoaderWrapper>
    </form>
  );
}
