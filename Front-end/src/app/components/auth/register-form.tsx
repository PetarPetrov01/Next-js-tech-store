"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z, ZodEffects, ZodObject } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthProvider";
import {
  RegisterSchemaType,
  UserRegisterSchema,
} from "@/zodSchemas/registerSchema";
import { checkEmail, registerUser } from "@/app/lib/actions";
import useDebouncedEffect from "@/hooks/useDebouncedEffect";

export default function RegisterForm({ ptSerif }: { ptSerif: NextFont }) {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { setAuth } = useAuthContext();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    control,
    clearErrors,
  } = useForm<RegisterSchemaType>({
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

  const watchedEmail = useWatch({ control, name: "email", defaultValue: "" });

  useDebouncedEffect(
    () => {
      if (watchedEmail.length > 6) {
        const emailCheck =
          UserRegisterSchema._def.schema.shape.email.safeParse(watchedEmail);
        if (emailCheck.success) {
          (async () => {
            const { error, isFree } = await checkEmail(watchedEmail);
            if (error) {
              return setError("email", error);
            } 
          })();
          clearErrors("email");
        }
      }
    },
    500,
    [watchedEmail]
  );

  const processSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const { repassword, ...registerData } = data;
    const { error, result } = await registerUser(registerData);

    if (error) {
      setError("root.apiError", error);
      setIsLoading(false);
      return;
    }

    if (result) {
      setAuth(result);
      setIsLoading(false);
      router.replace("/");
    }
  });

  return (
    <form
      onSubmit={processSubmit}
      ref={formRef}
      className="register flex flex-col items-center justify-start gap-8  w-[90%] sm:w-[85%] "
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
