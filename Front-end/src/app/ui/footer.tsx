import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <>
      <footer className="flex items-center justify-center bg-lightblue min-h-20">
        <div className="container max-w-[1400px] px-20 py-3 flex justify-evenly items-center text-darkblue">
          <article>
            <Image
              src="/hr-logo-no-text.png"
              alt="logo"
              width={100}
              height={100}
              className="bg-darkblue rounded-full"
            />
          </article>
          <article>
            <h2 className="text-3xl ">HR Assistant</h2>
          </article>
          <article className="flex flex-col text-lg">
            <div className="flex gap-1" >
              <EnvelopeIcon className="w-6 h-auto" />
              <Link href="contact" className="hover:text-purple">
                Contact us
              </Link>
            </div>
            <div className="flex gap-1">
              <QuestionMarkCircleIcon className="w-6 h-auto" />
              <Link href="about" className="hover:text-purple">
                About
              </Link>
            </div>
            <Link href="get" className="hover:text-purple">
              Get in touch
            </Link>
          </article>
        </div>
      </footer>
    </>
  );
}
