'use client'

import Image from "next/image";
import { Product } from "../../types/Product";
import { useRouter } from "next/navigation";

export default function ProductCard({ prod }: { prod: Product }) {

const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/products/${prod.id}`)}
      key={prod.id}
      className="flex flex-col sm:w-[49%] md:w-[32%] lg:w-[23.5%] justify-start gap-2 mt-8 border-[1px] p-3 rounded-lg  bg-new-mint shadow-s"
    >
      <div className="flex w-full justify-center items-center overflow-hidden self-center">
        <Image src={prod.images[0]} alt={prod.name} width={100}  height={100} className="w-[90%]"/>
      </div>
      <div>
        <h2 className="text-2xl text-new-gray">{prod.brand} {prod.name}</h2>
        <h2 className="text-2xl text-new-gray">${prod.price}</h2>
      </div>
      <h2>{prod.brand}</h2>
      <p>{prod.description} </p>
    </div>
  );
}
