import { Metadata } from "next";

import { notFound } from "next/navigation";
import ProductsList from "../components/ProductsList";
import Filter from "../components/Filter";
import BrandFilterWrapper from "../components/BrandFilterWrapper";
import SearchBar from "../components/SearchBar";
import Image from "next/image";
import Sort from "../components/Sort";
import LayoutToggle from "../components/product/product-layout-toggle";

import { BsGrid3X3GapFill } from "react-icons/bs";

import { MdViewList } from "react-icons/md";

export const metadata: Metadata = {
  title: "Products",
};

const validCategories = [0, 1, 2, 3]; //Consider reading from the API

export default async function Page({ searchParams }: { searchParams: any }) {
  const category = searchParams.category;

  if (category && !validCategories.includes(Number(category))) {
    notFound();
  }

  return (
    <section className="flex flex-col items-center">
      <div className="relative w-full h-80 overflow-hidden p-8">
        <div className="max-w-[1300px] m-auto flex items-center p-6">
          <h1 className="text-black z-[1]">Catalog</h1>
        </div>
        <Image
          src={"/prod-banner.jpg"}
          alt="products banner"
          fill={true}
          className="opacity-75 object-cover object-[left-center]"
        />
      </div>
      <div className="container max-w-[1450px] flex flex-col items-center py-20 px-4">
        <h2 className="text-[3rem] pb-10">Products</h2>
        <div className="flex w-full justify-between items-start">
          <article className="sm:w-[28%] lg:w-[24%] flex flex-col gap-4 min-h-60 mt-2 p-2">
            <Filter />
            <BrandFilterWrapper catId={category} />
          </article>
          <article className="sm:w-[71%] lg:w-[75%] flex flex-col items-center justify-center p-2">
            <div className="flex justify-between px-3 items-center w-full border-2 border-new-peach-100">
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
              <Sort />
            </div>
            <ProductsList searchParams={searchParams} />
          </article>
        </div>
      </div>
    </section>
  );
}
