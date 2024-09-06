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

  const slicedCats = categories.slice(0, 2);

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

  return (
    <div className="flex flex-col gap-1 p-2 bg-[#ffd5ae] rounded-md font-semibold text-new-gray transition-all duration-200">
      <h3>Categories</h3>
      <div className="flex flex-col items-start gap-1 pl-2 font-normal">
        <Link
          href={handleUpdateCat(null)}
          className={`${!searchParams.get("category") && "font-semibold"}`}
        >
          All
        </Link>

        {showAllCats
          ? categories.map((cat) => (
              <Link
                href={handleUpdateCat(cat.id)}
                key={cat.id}
                className={`flex gap-1.5 ${
                  isActive(String(cat.id)) && "font-semibold"
                }`}
              >
                <p>{cat.name}</p>
                <span className="text-sm">({cat._count})</span>
              </Link>
            ))
          : slicedCats.map((cat) => (
              <Link
                href={handleUpdateCat(cat.id)}
                key={cat.id}
                className={`flex gap-1.5 ${
                  isActive(String(cat.id)) && "font-semibold"
                }`}
              >
                <p>{cat.name}</p>
                <span className="text-sm">({cat._count})</span>
              </Link>
            ))}

        <a onClick={toggleAllCats} className="text-sm cursor-pointer">{showAllCats ? "Hide" : "Show more"}</a>
      </div>
    </div>
  );
}
