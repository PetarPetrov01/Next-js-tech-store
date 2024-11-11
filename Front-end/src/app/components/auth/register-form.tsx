"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { useRouter } from "next/navigation";

import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthContext } from "@/contexts/AuthProvider";
import { checkEmail, registerUser } from "@/app/lib/actions";
import useDebouncedEffect from "@/hooks/useDebouncedEffect";

import {
  RegisterSchemaType,
  UserRegisterSchema,
} from "@/zodSchemas/registerSchema";

const inputWrapperPseudoClasses =
  "before:absolute before:top-0 before:left-0 before:w-full before:duration-150 before:h-full before:border-[1px] before:border-[#6a6a6a] after:absolute after:block after:left-0 after:top-0 after:h-full after:duration-500 after:ease-in-out after:border-new-peach-80 after:z-10 focus-within:after:border-[1px] focus-within:after:w-full";

export default function RegisterForm({ ptSerif }: { ptSerif: NextFont }) {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { setAuth } = useAuthContext();

  const {
    formState: { errors, dirtyFields, isValid },
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
      className="register flex flex-col items-center justify-start gap-8 w-full"
    >
      <div className={`heading pt-8 ${ptSerif.className}`}>
        <h1 className="text-[2rem] text-new-mint">Register your account</h1>
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoClasses} ${
          dirtyFields.email ? "after:w-full after:border-[1px]" : "after:w-[0]"
        } `}
      >
        <input
          type="text"
          className="text-lg relative border-0 w-full h-full bg-new-darkblue outline-none py-2 px-3 z-20"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <span className="absolute bottom-[-1.5em] text-new-peach-90">
            {errors.email.message}
          </span>
        )}
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoClasses} ${
          dirtyFields.firstName
            ? "after:w-full after:border-[1px]"
            : "after:w-[0]"
        } `}
      >
        <input
          type="text"
          className="text-lg relative border-0 w-full h-full bg-new-darkblue outline-none py-2 px-3 z-20"
          placeholder="First name"
          {...register("firstName")}
        />
        {errors.firstName && (
          <span className="absolute bottom-[-1.5em] text-new-peach-90">
            {errors.firstName.message}
          </span>
        )}
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoClasses} ${
          dirtyFields.lastName
            ? "after:w-full after:border-[1px]"
            : "after:w-[0]"
        } `}
      >
        <input
          type="text"
          className="text-lg relative border-0 w-full h-full bg-new-darkblue outline-none py-2 px-3 z-20"
          placeholder="Last name"
          {...register("lastName")}
        />
        {errors.lastName && (
          <span className="absolute bottom-[-1.5em] text-new-peach-90">
            {errors.lastName.message}
          </span>
        )}
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoClasses} ${
          dirtyFields.username
            ? "after:w-full after:border-[1px]"
            : "after:w-[0]"
        } `}
      >
        <input
          type="text"
          className="text-lg relative border-0 w-full h-full bg-new-darkblue outline-none py-2 px-3 z-20"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && (
          <span className="absolute bottom-[-1.5em] text-new-peach-90">
            {errors.username.message}
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
          <span className="absolute bottom-[-1.5em] text-new-peach-90">
            {errors.password.message}
          </span>
        )}
      </div>
      <div
        className={`w-full p-[1px] flex flex-col relative bg-transparent z-0 ${inputWrapperPseudoClasses} ${
          dirtyFields.repassword
            ? "after:w-full after:border-[1px]"
            : "after:w-[0]"
        } `}
      >
        <input
          type="password"
          className="text-lg relative border-0 w-full h-full bg-new-darkblue outline-none py-2 px-3 z-20"
          placeholder="Repeat password"
          {...register("repassword")}
        />
        {errors.repassword && (
          <span className="absolute bottom-[-1.5em] text-new-peach-90">
            {errors.repassword.message}
          </span>
        )}
        {errors.root?.apiError && (
          <span className="absolute bottom-[-1.5em] text-new-peach-90">
            {errors.root.apiError.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`relative flex overflow-hidden items-stretch uppercase py-2.5 px-6 z-10 border-b-2 duration-150 after:absolute after:z-[-1] after:bottom-0 after:right-0 after:left-0 after:h-full after:w-0 after:bg-new-peach-90 after:duration-500 ${
          isValid
            ? "bg-neutral-700  border-new-peach-90 hover:after:w-full"
            : "bg-neutral-600 border-new-midnight-100 hover:text-white"
        } ${isLoading ? "after:w-full pointer-events-none" : ""}`}
      >
        {isLoading ? (
          <div className="flex flex-row justify-around gap-1.5 py-[0.4rem] px-0.5">
            <div className="w-[0.7rem] aspect-square h-auto rounded-full bg-white animate-bounce"></div>
            <div className="w-[0.7rem] aspect-square h-auto rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-[0.7rem] aspect-square h-auto rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : (
          <p className="text-lg uppercase">Register</p>
        )}
      </button>
    </form>
  );
}
