"use client";

import { Categories } from "@/types/Product";
import { parseVersionInfo } from "next/dist/server/dev/parse-version-info";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
    const pars = Array.from(searchParams.keys());

    for (let par of pars) {
      console.log(par);
      if (par != "view" && par != "sort") {
        return true;
      }
    }

    return false;
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    const sortParam = searchParams.get("sort");
    const viewParam = searchParams.get("view");

    if (sortParam) params.set("sort", sortParam);

    if (viewParam) params.set("view", viewParam);

    const href = `${pathname}?${params.toString()}`;

    return href;
  };

  return (
    <>
      <div className="flex justify-between items-center text-new-mint border-b-2 border-new-peach-100">
        <h2 className="py-3">Filter</h2>
        {showClear() && (
          <Link
            href={clearFilters()}
            scroll={false}
            className="text-xl hover:text-new-peach-90 duration-150"
          >
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
            className="absolute right-2 bottom-2 text-sm hover:text-new-peach-90 duration-150 cursor-pointer"
          >
            {showAllCats ? "Show less" : "Show more"}
          </a>
        </div>
      </div>
    </>
  );
}
