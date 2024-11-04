"use client";

import { useEffect, useState } from "react";
import { getProds } from "../lib/data";
import ProductCard from "./product/product-card";
import { PopulatedProduct } from "@/types/Product";
import { useSearchParams } from "next/navigation";

export default function ProductsList() {
  const [products, setProducts] = useState<PopulatedProduct[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProds = async () => {
      const prods = await getProds(searchParams);
      setProducts(prods);
    };
    fetchProds();
  }, [searchParams]);

  const viewType = searchParams.get("view") || "grid";

  return (
    <div
      className={`flex flex-wrap w-full mt-6  ${
        viewType == "grid"
          ? "justify-start items-stretch gap-[4%] md:gap-[2%]"
          : "flex-col gap-6"
      }`}
    >
      {products?.length > 0 ? (
        products.map((prod, i) => <ProductCard prod={prod} key={prod.id} />)
      ) : (
        <h2>No products!</h2>
      )}
    </div>
  );
}
