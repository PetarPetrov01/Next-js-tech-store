"use client";

import { Categories } from "@/types/Product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter({
  categories,
}: {
  categories: Categories;
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (Number(value) == 0) {
      params.delete(name);
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set(name, value);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <select
      onChange={handleFilterChange}
      name="category"
      defaultValue={searchParams.get("category")?.toString()}
      className="text-new-gray p-1"
    >
      <option value={0} className="text-new-gray">
        Categories
      </option>
      {categories &&
        categories.map((cat) => (
          <option key={cat.id} value={cat.id} className="text-new-gray">
            {cat.name}
          </option>
        ))}
    </select>
  );
}
