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
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={`relative flex flex-col gap-1 p-2 bg-[#ffd5ae] overflow-hidden rounded-md font-semibold text-new-gray duration-200`}
    >
      <h3>Sort</h3>
      <select name="sort" id="" className="p-1.5 bg-new-gray rounded-sm text-new-mint" defaultValue={searchParams.get('sort') || undefined} onChange={handleSortChange}>
        <option value="brand:asc">Name (A to Z)</option>
        <option value="brand:desc">Name (Z to A)</option>
        <option value="price:asc">Price ascending</option>
        <option value="price:desc">Price descending</option>
      </select>
    </div>
  );
}
