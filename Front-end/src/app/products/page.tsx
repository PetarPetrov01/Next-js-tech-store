import { Metadata } from "next";

import { Product } from "@/types/Product";
import { notFound } from "next/navigation";
import ProductsList from "../components/ProductsList";
import Filter from "../components/Filter";
import BrandFilterWrapper from "../components/BrandFilterWrapper";
import SearchBar from "../components/SearchBar";
import Image from "next/image";
import Sort from "../components/Sort";

export const metadata: Metadata = {
  title: "Products",
};

const validCategories = [0, 1, 2, 3]; //Consider reading from the API

export default async function Page({ searchParams }: { searchParams: any }) {
  const category = searchParams.category;

  if (category && !validCategories.includes(Number(category))) {
    notFound();
  }

  const mockProd: Product = {
    id: "sdaw",
    brandId: 1,
    categoryId: 1,
    category: "Phone",
    description: "asd",
    stock: 4,
    name: "Iphone XI",
    brand: "Iphone",
    model: "XI",
    images: [
      "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-15-Pro/Blue-Titanium/Apple-iPhone-15-Pro-Blue-Titanium-thumbnail.png",
    ],
    price: 1200,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <main className="min-h-[75vh] bg-gradient-radial from-new-teal to-new-gray">
      <section className="flex flex-col items-center">
        <div className="relative w-full h-80 overflow-hidden p-8">
          <div className="flex items-center p-6">
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
          <div className="flex w-full justify-between items-start">
            <article className="sm:w-[28%] lg:w-[24%] flex flex-col gap-4 min-h-60 mt-2 p-2">
              <Filter />
              <BrandFilterWrapper catId={category} />
            </article>
            <article className="sm:w-[71%] lg:w-[75%] flex flex-col items-center justify-center p-2">
              <div className="flex justify-evenly items-center w-full border-2 border-new-peach-100">
                <SearchBar />
                <Sort />
              </div>
              <ProductsList searchParams={searchParams} />
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
