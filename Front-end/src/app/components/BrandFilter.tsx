"use client";

import { Brands } from "@/types/Product";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function BrandFilter({ brands }: { brands: Brands }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showAllBrands, setShowAllBrands] = useState(
    Number(searchParams.get("brand")) > 2
  );

  const isActive = (brand: string) => {
    return searchParams.get("brand") === brand;
  };

  const toggleAllBrands = () => {
    setShowAllBrands((prev) => !prev);
  };


  return (
    <div
      className={`relative flex flex-col gap-1 p-2 bg-[#ffd5ae] overflow-hidden rounded-md font-semibold text-new-gray duration-200 ${
        showAllBrands ? "max-h-80" : "max-h-32"
      }`}
    >
      <h3>Brands</h3>
      <div className="flex flex-col items-start gap-1 pl-2 font-normal">
        <Link
          className={`${!searchParams.get("brand") && "font-semibold"}`}
        >
          All
        </Link>

        <a
          onClick={toggleAllBrands}
          className="absolute right-2 bottom-2 text-sm hover:text-new-teal-80 cursor-pointer"
        >
          {showAllBrands ? "Show less" : "Show more"}
        </a>
      </div>
    </div>
  );
}
