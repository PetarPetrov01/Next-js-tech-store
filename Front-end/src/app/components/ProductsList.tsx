"use client";

import { useEffect, useState } from "react";
import { getProds } from "../lib/data";
import ProductCard from "./product/product-card";
import { APIProduct } from "@/types/Product";
import { useSearchParams } from "next/navigation";
import { ProductListSkeleton } from "./ui/loaders/skeletons";
import useMounted from "@/hooks/useMounted";

const emptyArr = new Array(3).fill("");

export default function ProductsList() {
  const [products, setProducts] = useState<APIProduct[]>([]);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const hasMounted = useMounted();

  useEffect(() => {
    setIsLoading(true);
    const fetchProds = async () => {
      const prods = await getProds(searchParams);
      setIsLoading(false);
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
      {hasMounted ? (
        isLoading ? (
          emptyArr.map((_, i) => (
            <ProductListSkeleton key={i} viewType={viewType || "grid"} />
          ))
        ) : products?.length > 0 ? (
          products.map((prod, i) => <ProductCard prod={prod} key={prod.id} />)
        ) : (
          <h2>No products!</h2>
        )
      ) : (
        emptyArr.map((_, i) => (
          <ProductListSkeleton key={i} viewType={viewType || "grid"} />
        ))
      )}
    </div>
  );
}
