import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="flex items-center justify-center bg-lightblue min-h-20">
        <div className="container max-w-[1400px] px-20 py-3 flex justify-evenly items-center text-darkblue">
            <article>
                <Image src='/hr-logo-no-text.png' alt="logo" width={100} height={100} className="bg-darkblue rounded-full"/>
            </article>
          <article>
            <h2 className="text-3xl ">HR Assistant</h2>
          </article>
          <article className="flex flex-col text-lg">
            <Link href="contact" className="hover:text-purple">Contact us</Link>
            <Link href="about" className="hover:text-purple">About</Link>
            <Link href="get" className="hover:text-purple">Get in touch</Link>
          </article>
        </div>
      </footer>
    </>
  );
}
