"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <article className="sm:w-[28%] lg:w-[24%] flex flex-col border-[1px] border-new-peach min-h-60">
      <select onChange={handleFilterChange} name="category" id="" className="text-new-gray">
        <option value="TV" className="text-new-gray">TVs</option>
        <option value="Phone" className="text-new-gray">Phones</option>
        <option value="Laptop" className="text-new-gray">Laptops</option>
      </select>
    </article>
  );
}
