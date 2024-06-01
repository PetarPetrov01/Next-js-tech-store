"use client";

import { NextFont } from "next/dist/compiled/@next/font";

export default function RegisterForm({ptSerif}: {ptSerif: NextFont}) {
  return (
    <form
      action="\"
      className="register flex flex-col items-center justify-start gap-8  w-[80%] "
    >
      <div className={`heading pt-8 ${ptSerif.className}`}>
        <h1 className="text-3xl">Register your account</h1>
      </div>
      <div className="input-group w-[80%]">
        <input
          type="text"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-lightblue"
          placeholder="Email"
        />
      </div>
      <div className="input-group w-[80%]">
        <input
          type="password"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-pink"
          placeholder="Password"
        />
      </div>
      <div className="input-group w-[80%]">
        <input
          type="password"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-pink"
          placeholder="Repeat password"
        />
      </div>
      <button className="relative w-[80%] py-1 text-xl rounded-md bg-pink text-white after:content-[''] after:absolute after:bottom-[-1em] after:block after:h-[1px] after:bg-gray-200 after:w-[100%]">
        Register
      </button>
    </form>
  );
}