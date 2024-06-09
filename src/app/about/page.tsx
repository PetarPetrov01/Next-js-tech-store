import { Metadata } from "next";
import { getProds } from "../lib/data";

import ProductCard from "../ui/product-card";

export const metadata: Metadata = {
  title: "About",
};

export default async function Page() {
  const prods = await getProds();

  return (
    <main>
      <section className="flex "></section>
      <div className="container max-w-[1400px] flex justify-center py-5">
        <div className="flex items-center">
          <article className="flex flex-col items-center">
            <h2 className="text-4xl">Browse our products</h2>
            <div className="flex flex-col items-center gap-4 min-w-[1000px]">
              {prods.map((prod) => (
                <ProductCard prod={prod} key={prod._id} />
              ))}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
