import Image from "next/image";
import { ReactElement } from "react";

export default function Banner({ children }: { children: ReactElement }) {
  return (
    <div className="relative w-full h-80 overflow-hidden p-12">
      <div className="max-w-[1300px] m-auto flex items-center justify-center p-6">
        {children}
      </div>
      <Image
        src={"/prod-banner.jpg"}
        alt="products banner"
        fill={true}
        sizes="100vw"
        className="opacity-75 object-cover object-[left-center]"
      />
    </div>
  );
}
