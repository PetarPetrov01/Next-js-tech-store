"use client";

import { NextFont } from "next/dist/compiled/@next/font";

export default function LoginForm({ptSerif}: {ptSerif: NextFont}) {
  return (
    <form
      action="\"
      className="login flex flex-col items-center justify-start gap-8  w-[80%] "
    >
      <div className={`heading pt-8 ${ptSerif.className}`}>
        <h1 className="text-3xl">Login to your account</h1>
      </div>
      <div className="input-group w-[80%]">
        <input
          type="text"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink"
          placeholder="Email"
        />
      </div>
      <div className="input-group w-[80%]">
        <input
          type="password"
          className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-pink"
          placeholder="Password"
        />
      </div>
      <button className="relative w-[80%] py-1 text-xl rounded-md border-pink border-[1px] duration-150 bg-pink text-white after:content-[''] after:absolute after:bottom-[-1em] after:block after:h-[1px] after:bg-gray-200 after:w-[100%] hover:border-white">
        Login
      </button>
    </form>
  );
}
