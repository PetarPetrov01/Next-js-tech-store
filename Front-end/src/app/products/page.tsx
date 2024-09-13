import { Metadata } from "next";

import { Product } from "@/types/Product";
import { notFound } from "next/navigation";
import ProductsList from "../components/ProductsList";
import Filter from "../components/Filter";
import BrandFilterWrapper from "../components/BrandFilterWrapper";

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
    name: "XI",
    brand: "Iphone",
    images: [
      "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-15-Pro/Blue-Titanium/Apple-iPhone-15-Pro-Blue-Titanium-thumbnail.png",
    ],
    price: 1200,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <main className="min-h-[75vh] bg-gradient-radial from-new-teal to-new-gray">
      <section className="flex justify-center">
        <div className="container max-w-[1450px] flex justify-center py-5 px-4">
          <div className="flex w-full justify-between items-start">
            <article className="sm:w-[28%] lg:w-[24%] flex flex-col gap-4 min-h-60">
              <Filter />
              <BrandFilterWrapper catId={category}/>
            </article>
            <ProductsList searchParams={searchParams} />
          </div>
        </div>
      </section>
    </main>
  );
}
