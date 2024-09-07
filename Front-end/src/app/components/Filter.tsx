import { getCategories } from "../lib/data";
import CategoryFilter from "./CategoryFilter";
import Sort from "./Sort";

export default async function Filter() {
  const categories = await getCategories();

  return (
    <article className="sm:w-[28%] lg:w-[24%] flex flex-col gap-4 min-h-60">
      <CategoryFilter categories={categories} />
      <Sort />
    </article>
  );
}
