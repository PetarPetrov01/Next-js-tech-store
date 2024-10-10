"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Sort() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-bold">Sort by:</span>
      <select
        name="sort"
        id=""
        className="p-[0.6rem] bg-new-peach-100 rounded-sm text-new-darkblue font-bold"
        defaultValue={searchParams.get("sort") || undefined}
        onChange={handleSortChange}
      >
        <option value="brand:asc">Name (A to Z)</option>
        <option value="brand:desc">Name (Z to A)</option>
        <option value="price:asc">Price ascending</option>
        <option value="price:desc">Price descending</option>
      </select>
    </div>
  );
}
