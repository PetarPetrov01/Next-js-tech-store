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

  const handleUpdateBrand = (value: number | null) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("brand", String(value));
    } else {
      params.delete("brand");
    }
    const href = `${pathname}?${params.toString()}`;

    return href;
  };

  return (
    <div
      className={`relative flex flex-col gap-1 p-2 bg-new-mint overflow-hidden rounded-md font-semibold text-new-gray duration-200 ${
        showAllBrands ? "max-h-80" : "max-h-32"
      }`}
    >
      <h3>Brands</h3>
      <div className="flex flex-col items-start gap-1 pl-2 font-normal">
        <Link
          href={handleUpdateBrand(null)}
          className={`${!searchParams.get("brand") && "font-semibold"}`}
        >
          All
        </Link>

        {brands.length > 0 &&
          brands.map((brand) => (
            <Link
              href={handleUpdateBrand(brand.id)}
              key={brand.id}
              className={`flex gap-1.5 ${
                isActive(String(brand.id)) && "font-semibold"
              }`}
            >
              <p>{brand.name}</p>
              <span className="text-sm">({brand._count})</span>
            </Link>
          ))}

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
