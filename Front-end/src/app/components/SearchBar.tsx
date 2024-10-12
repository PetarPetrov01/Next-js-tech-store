"use client";

import { FaMagnifyingGlass } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SearchSchema = z.object({
  search: z.string().trim().max(15),
});

type Inputs = z.infer<typeof SearchSchema>;

export default function SearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [isFocused, setIsFocused] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: { search: searchParams.get("search") || "" },
    resolver: zodResolver(SearchSchema),
  });

  const handleSearchSubmit = handleSubmit(async ({ search }) => {
    const params = new URLSearchParams(searchParams);
    console.log(errors.search);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params}`, { scroll: false });
  });

  return (
    <div className="py-4 w-3/5">
      <form onSubmit={handleSearchSubmit}>
        <div
          className={`relative flex border-b-2 border-transparent duration-500  after:absolute after:h-[2px] after:bottom-[-1px] after:left-0 after:duration-700  after:bg-new-peach-100 ${
            isFocused
              ? "after:w-full after:opacity-95 bg-neutral-700/70"
              : "after:w-[2%] after:opacity-0 bg-neutral-700/50"
          } `}
        >
          <input
            type="text"
            {...register("search")}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="text-new-peach-90 text-[1.1rem] w-[90%] p-1 pl-2 outline-none bg-transparent"
          />
          <button
            type="submit"
            className="absolute top-[50%] translate-y-[-50%] right-0 bg-transparent px-2"
          >
            <FaMagnifyingGlass
              className="text-new-mint"
              size={'1.2em'}
            />
          </button>
        </div>
      </form>
    </div>
  );
}
