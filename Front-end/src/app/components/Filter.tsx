import { Categories } from "@/types/Product";
import { getCategories } from "../lib/data";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import BrandFilterWrapper from "./BrandFilterWrapper";

export default async function Filter({
  categories,
}: {
  categories: Categories;
}) {
  //Make the whole Filter a client component and recieve cats only, brands will be fetched on FE
  return (
    <div className="flex flex-col gap-4">
      <CategoryFilter categories={categories} />
      <PriceFilter />
      <BrandFilterWrapper />
    </div>
  );
}
