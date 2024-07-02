'use client'

import { Product } from "../../types/Product";
import { useRouter } from "next/navigation";

export default function ProductCard({ prod }: { prod: Product }) {

const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/products/${prod._id}`)}
      key={prod._id}
      className="flex flex-col basis-[30%] justify-center gap-2 mt-8 border-[1px] border-lightblue text-lightblue p-3 rounded-lg  bg-blue-700/30 shadow-s hover:shadow-[0_2px_15px_2px_rgba(0,180,216,0.4)]"
    >
      <div>
        <h2 className="text-3xl">{prod.name}</h2>
      </div>
      <h2>{prod.category.join(", ")}</h2>
      <h2>{prod.color}</h2>
      <p>{prod.description} </p>
    </div>
  );
}
