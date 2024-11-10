import { BsGrid3X3GapFill } from "react-icons/bs";
import Filter from "./Filter";
import LayoutToggle from "./product/product-layout-toggle";
import { MdViewList } from "react-icons/md";
import SearchBar from "./SearchBar";
import Sort from "./Sort";
import ProductsList from "./ProductsList";
import { Categories } from "@/types/Product";
import MobileFilters from "./product/mobile-filters";

export default function ProductsLayout({
  categories,
}: {
  categories: Categories;
}) {
  return (
    <div className="flex flex-col w-full md:flex-row items-center md:justify-between md:items-start">
      <article className="hidden md:w-[28%] lg:w-[24%] md:flex flex-col gap-4 md:min-h-60 mt-2 p-2">
        <Filter categories={categories} />
      </article>
      <article className="md:hidden">
        <MobileFilters categories={categories} />
      </article>
      <article className="w-[90%] md:w-[71%] lg:w-[75%] flex flex-col items-center justify-center p-2">
        <div className="flex justify-between md:px-3 items-center w-full border-b-[1px] md:border-2 border-new-peach-100">
          <LayoutToggle
            paramName="view"
            options={[
              {
                value: "grid",
                icon: <BsGrid3X3GapFill className="w-full h-full" />,
              },
              {
                value: "list",
                icon: <MdViewList className="w-full h-full" />,
              },
            ]}
            defaultValue="grid"
          />
          <SearchBar />
          <div className="hidden md:block">
            <Sort />
          </div>
        </div>
        <ProductsList />
      </article>
    </div>
  );
}
