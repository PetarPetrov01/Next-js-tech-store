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
import ProductsLayout from "../components/ProductsLayout";
import { getCategories } from "../lib/data";

export const metadata: Metadata = {
  title: "Products",
};

const validCategories = [0, 1, 2, 3]; //Consider reading from the API

export default async function Page({ searchParams }: { searchParams: any }) {
  const category = searchParams.category;
  const categories = await getCategories();

  if (category && !validCategories.includes(Number(category))) {
    notFound();
  }
  return (
    <section className="w-full flex flex-col items-center">
      <div className="relative w-full h-80 overflow-hidden p-8">
        <div className="max-w-[1300px] m-auto flex items-center p-6">
          <h1 className="text-black z-[1]">Catalog</h1>
        </div>
        <Image
          src={"/prod-banner.jpg"}
          alt="products banner"
          fill={true}
          sizes="100vw"
          className="opacity-75 object-cover object-[left-center]"
        />
      </div>
      <div className="container max-w-[1450px] flex flex-col items-center py-20 px-4">
        <h2 className="text-[3rem] pb-10">Products</h2>
        <ProductsLayout categories={categories}/>
      </div>
    </section>
  );
}
