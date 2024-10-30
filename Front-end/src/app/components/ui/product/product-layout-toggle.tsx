"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { BsGrid3X3GapFill } from "react-icons/bs";
import { MdViewList } from "react-icons/md";

type ViewType = "list" | "grid";

export default function LayoutToggle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [productsLayout, setProductsLayout] = useState<ViewType>(
    (searchParams.get("view") as ViewType) || "grid"
  );

  const toggleLayout = (viewType: ViewType) => {
    const params = new URLSearchParams(searchParams);

    setProductsLayout(viewType);
    params.set("view", viewType);

    replace(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <div className="flex justify-between border-[1px] border-new-peach-100 w-20 h-10 cursor-pointer">
      <div
        onClick={() => toggleLayout("grid")}
        className={`flex-1 p-[0.35rem] ${
          productsLayout == "grid"
            ? "bg-new-peach-100 text-new-darkblue"
            : "bg-transparent text-new-mint duration-150 hover:bg-neutral-700/70"
        }`}
      >
        <BsGrid3X3GapFill className="w-full h-full" />
      </div>
      <div
        onClick={() => toggleLayout("list")}
        className={`flex-1 p-1 ${
          productsLayout == "list"
            ? "bg-new-peach-100 text-new-darkblue"
            : "bg-transparent text-new-mint duration-150 hover:bg-neutral-700/70"
        }`}
      >
        <MdViewList className="w-full h-full" />
      </div>
    </div>
  );
}
