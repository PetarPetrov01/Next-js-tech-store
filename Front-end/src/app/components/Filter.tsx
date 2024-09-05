import { getCategories } from "../lib/data";
import CategoryFilter from "./CategoryFilter";

export default async function Filter() {
  const categories = await getCategories();

  return (
    <article className="sm:w-[28%] lg:w-[24%] flex flex-col border-[1px] border-new-peach min-h-60">
      <CategoryFilter categories={categories} />
    </article>
  );
}
