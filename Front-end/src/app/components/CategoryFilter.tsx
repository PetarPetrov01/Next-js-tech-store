"use client";

import { Categories } from "@/types/Product";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function CategoryFilter({
  categories,
}: {
  categories: Categories;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showAllCats, setShowAllCats] = useState(
    Number(searchParams.get("category")) > 2
  );

  const isActive = (cat: string) => {
    return searchParams.get("category") === cat;
  };

  const toggleAllCats = () => {
    setShowAllCats((prev) => !prev);
  };

  const handleUpdateCat = (value: number | null) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("category", String(value));
    } else {
      params.delete("category");
    }
    const href = `${pathname}?${params.toString()}`;

    return href;
  };

  const showClear = () => {
    return searchParams.size > 1 || (searchParams.size === 1 && !searchParams.get("sort"));
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    const sortParam = searchParams.get("sort");

    if (sortParam) {
      params.set("sort", sortParam);
    }

    const href = `${pathname}?${params.toString()}`;

    return href;
  };

  return (
    <>
      <div className="flex justify-between items-center border-b-2 border-new-peach-100">
        <h2 className="py-3">Filter</h2>
        {showClear() && (
          <Link href={clearFilters()} scroll={false}>
            Clear filters
          </Link>
        )}
      </div>
      <div
        className={`relative flex flex-col gap-1 p-2 border-b-2 border-new-peach-100 overflow-hidden font-semibold text-new-mint duration-200 ${
          showAllCats ? "max-h-80" : "max-h-32"
        }`}
      >
        <h3>Categories</h3>
        <div className="flex flex-col items-start gap-1 pl-2 font-normal">
          <Link
            href={handleUpdateCat(null)}
            scroll={false}
            className={`duration-200 ${
              !searchParams.get("category") && "font-semibold border-b-[1px]"
            }`}
          >
            All
          </Link>

          {categories.map((cat) => (
            <Link
              href={handleUpdateCat(cat.id)}
              key={cat.id}
              scroll={false}
              className={`flex gap-1.5 duration-200 ${
                isActive(String(cat.id)) && "font-semibold border-b-[1px]"
              }`}
            >
              <p>{cat.name}</p>
              <span className="text-sm">({cat._count})</span>
            </Link>
          ))}

          <a
            onClick={toggleAllCats}
            className="absolute right-2 bottom-2 text-sm hover:text-new-teal-80 cursor-pointer"
          >
            {showAllCats ? "Show less" : "Show more"}
          </a>
        </div>
      </div>
    </>
  );
}
