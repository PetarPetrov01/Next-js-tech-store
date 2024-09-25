"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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

    replace(`${pathname}?${params}`);
  });

  return (
    <div className="py-4 w-3/5">
      <form onSubmit={handleSearchSubmit}>
        <div className="relative flex rounded-3xl border-2 border-new-mint">
          <input
            type="text"
            {...register("search")}
            className="text-new-peach-90 w-[90%] p-1 pl-2 outline-none bg-transparent"
          />
          <button
            type="submit"
            className="absolute top-[50%] translate-y-[-50%] right-0 bg-transparent px-2"
          >
            <MagnifyingGlassIcon
              width={22}
              height={22}
              className="text-new-mint"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
