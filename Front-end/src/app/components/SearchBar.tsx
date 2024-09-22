"use client";

export default function SearchBar() {
  const {
    register,
  } = useForm<Inputs>({
  });
  const handleSearchSubmit = handleSubmit(async ({ search }) => {
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
