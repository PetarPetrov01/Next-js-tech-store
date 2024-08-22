import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <>
      <footer className="flex items-center justify-center bg-new-teal min-h-20">
        <div className="container max-w-[1400px] px-20 py-5 flex justify-evenly items-start text-new-mint">
          <article>
            <Image
              src="/logo.png"
              alt="logo"
              width={140}
              height={140}
              className="rounded-full"
            />
          </article>
          <article>
            <h2 className="text-3xl ">Tech Store</h2>
          </article>
          <article className="flex flex-col gap-2">
            <h3>More</h3>
            <div className="flex gap-1">
              <Link
                href="contact"
                className="flex gap-2 hover:text-new-peach text-xl  duration-150"
              >
                <EnvelopeIcon className="w-6 h-auto" />
                Contact us
              </Link>
            </div>
            <div className="flex gap-1">
              <Link
                href="about"
                className="flex gap-2 hover:text-new-peach text-xl  duration-150"
              >
                <QuestionMarkCircleIcon className="w-6 h-auto" />
                About
              </Link>
            </div>
            {/* <Link href="get" className="hover:text-new-peach">
              Get in touch
            </Link> */}
          </article>
          <article className="flex flex-col gap-5">
            <h3>Newsletter</h3>
            <input
              type="email"
              placeholder="E-mail"
              className="rounded-sm text-lg p-1 outline-none bg-white/60 text-new-gray duration-200 placeholder:text-gray-500 focus:bg-new-mint focus:outline-1 focus:outline-new-mint"
            />
            <button className="py-1.5 border-2 border-new-sandstone text-new-peach text-lg hover:bg-new-peach hover:text-new-gray duration-150">
              Subscribe
            </button>
          </article>
        </div>
      </footer>
    </>
  );
}
