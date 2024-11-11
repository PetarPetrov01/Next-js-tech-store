import { Metadata } from "next";

import { notFound } from "next/navigation";

import ProductsLayout from "../components/ProductsLayout";
import { getCategories } from "../lib/data";
import Banner from "../components/ui/banner";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Page({ searchParams }: { searchParams: any }) {
  const category = searchParams.category;
  const categories = await getCategories();

  if (category && !categories.some((cat) => cat.id == category)) {
    notFound();
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Banner>
        <h1 className="text-black z-[1] uppercase">Catalog</h1>
      </Banner>

      <section className="container max-w-[1450px] flex flex-col items-center py-20 px-4">
        <h2 className="text-[3rem] pb-10">Products</h2>
        <ProductsLayout categories={categories} />
      </section>
    </div>
  );
}
