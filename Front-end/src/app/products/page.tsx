import { Metadata } from "next";
import { getProds } from "../lib/data";

import ProductCard from "../ui/product-card";
import { Product } from "@/types/Product";

export const metadata: Metadata = {
  title: "Products",
};

export default async function Page() {
  // const prods = await getProds();

  const mockProd: Product = {
    name: "XI",
    brand: "Iphone",
    images: [
      "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-15-Pro/Blue-Titanium/Apple-iPhone-15-Pro-Blue-Titanium-thumbnail.png",
    ],
    price: 1200,
  };

  return (
    <main className="min-h-[75vh]">
      <section className="flex justify-center">
        <div className="container max-w-[1450px] flex justify-center py-5 px-4">
          <div className="flex w-full justify-between items-start">
            <article className="sm:w-[28%] lg:w-[24%] flex flex-col border-2 border-new-peach min-h-60"></article>
            <article className="sm:w-[71%] lg:w-[75%] border-2 border-new-mint flex flex-col items-center justify-center">
              <h2 className="text-4xl">Browse our products</h2>
              <div className="flex flex-wrap justify-start items-stretch md:gap-[2%] px-2">
                {new Array(8).fill(1).map((id, index) => (
                  <ProductCard prod={mockProd} key={id + index} />
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
