import { getCategories } from "../lib/data";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";

import Sort from "./Sort";

export default async function Filter({}:{}) {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-4">
      <CategoryFilter categories={categories} />
      <Sort />
      <PriceFilter />
    </div>
  );
}
