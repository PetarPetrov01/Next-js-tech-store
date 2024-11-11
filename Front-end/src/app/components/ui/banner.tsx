import Image from "next/image";
import { ReactElement } from "react";

export default function Banner({ children }: { children: ReactElement }) {
  return (
    <section className="relative w-full h-80 overflow-hidden p-12 bg-new-darkblue">
      {/* <section className="relative w-full h-80 overflow-hidden p-12 before:z-10 before:absolute before:left-0 before:top-0 before:w-full before:opacity-50 before:h-full before:bg-new-darkblue"> */}
      <div className="relative max-w-[1300px] m-auto flex items-center justify-center p-6 z-10">
        {children}
      </div>
      <Image
        src={"/prod-banner.jpg"}
        alt="Banner"
        fill={true}
        sizes="100vw"
        className="relative object-cover opacity-80 object-[left-center]"
      />
    </section>
  );
}
