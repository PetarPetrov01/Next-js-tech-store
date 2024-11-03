import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";

import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const mediaIcons = [
  { href: "", icon: <FaGithub className="w-full h-full" /> },
  { href: "", icon: <FaLinkedin className="w-full h-full" /> },
  { href: "", icon: <FaFacebook className="w-full h-full" /> },
  { href: "", icon: <FaInstagram className="w-full h-full" /> },
  { href: "", icon: <FaXTwitter className="w-full h-full" /> },
];

const assignClassName = (el: ReactElement, className: string) => {
  return React.cloneElement(el, {});
};

export default function Footer() {
  return (
    <footer className="flex items-center justify-center bg-black min-h-20">
      <div className="container px-20 flex flex-col">
        <div className="w-full py-5 flex flex-col gap-[5%] md:gap-0 md:flex-row justify-evenly items-center md:items-start text-new-mint">
          <article className="min-w-[200px] md:min-w-0 flex-[0_0_25%] flex flex-col items-center gap-2 md:px-4">
            <div className="relative w-28 h-28">
              <Image
                src="/logo.png"
                alt="logo"
                fill={true}
                sizes="98px"
                className="object-contain"
              />
            </div>
            <div className="flex-none w-[95%] sm:w-[90%] lg:w-[75%] flex gap-1">
              {mediaIcons.map((media, i) => (
                <Link
                  href={media.href}
                  key={i}
                  className="flex-1 p-1 xl:p-2 flex hover:text-new-peach-90 hover:scale-125 duration-150 justify-center rounded-full"
                >
                  {media.icon}
                </Link>
              ))}
            </div>
          </article>
          <article className="flex-[0_0_60%] md:flex-[0_0_40%] text-xl md:px-20">
            <ul className="w-full md:pt-10 flex justify-center">
              <li className="px-4">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="relative px-4 before:absolute before:bg-new-mint before:h-full before:w-[1px] before:left-0 before:translate-x-1/2">
                <Link href={"/products"} className="">
                  Products
                </Link>
              </li>
            </ul>
          </article>
          <article className="flex-[0_0_25%] flex flex-col gap-5">
            <h3>Newsletter</h3>
            <div className="flex gap-[5%]">
              <input
                type="email"
                placeholder="E-mail"
                className="rounded-sm text-lg p-1 flex-[0_0_60%] outline-none bg-white/60 text-new-darkblue duration-200 placeholder:text-gray-500 focus:bg-new-mint focus:outline-1 focus:outline-new-mint"
              />
              <button className="py-1.5 flex-[0_0_35%] border-2 border-new-sandstone text-new-peach-100 text-lg hover:bg-new-peach-100 hover:text-new-darkblue duration-150">
                Subscribe
              </button>
            </div>
          </article>
        </div>
        <div className="p-4 border-t-[1px] border-neutral-800 flex justify-center">
          <p>&#169; TechStore</p>
        </div>
      </div>
    </footer>
  );
}
