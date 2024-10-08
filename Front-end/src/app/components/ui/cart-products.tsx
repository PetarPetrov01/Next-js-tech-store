"use client";

import useCartStore from "@/app/store/cart";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import EraseProductDiaolog from "./cart-erase-product-diaolog";

export default function CartProducts() {
  const { cart, clearCart, increaseQuantity, decreaseQuantity } =
    useCartStore();

  const [eraseProduct, setEraseProduct] = useState<{
    productId: string;
    name: string;
  } | null>(null);

  const handleIncrease = (
    productId: string,
    stock: number,
    quantity: number
  ) => {
    if (quantity >= stock) {
      return;
    }
    increaseQuantity(productId);
  };

  const handleDecrease = (
    productId: string,
    quantity: number,
    name: string
  ) => {
    if (quantity <= 1) {
      handleEraseClick(productId, name);
      return;
    }
    decreaseQuantity(productId);
  };

  const handleEraseClick = (productId: string, name: string) => {
    setEraseProduct({ productId, name });
    console.log("Erasing");
  };

  return (
    <article className="flex-[1_1_70%] flex flex-col gap-6">
      {cart.map((prod) => (
        <div
          key={prod.id}
          className="min-h-8 flex justify-between bg-new-teal-90 rounded-md"
        >
          <div className="flex-[1_1_18%] flex justify-center items-center p-2 aspect-square">
            <Image
              src={prod.images[0]}
              alt={prod.name}
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
          <div className="flex-[1_1_70%] flex p-6 pt-8">
            <div className="flex-[1_1_70%] flex flex-row justify-between">
              <h2>{prod.name}</h2>
            </div>
            <div className="flex-[1_1_25%] flex flex-col items-end gap-2">
              <h3>${prod.price * prod.quantity}</h3>
              <div className="flex gap-3 text-lg px-3 py-1 rounded-sm bg-gray-800/75">
                <button
                  onClick={() =>
                    handleDecrease(prod.id, prod.quantity, prod.name)
                  }
                  className="hover:text-new-peach-90 duration-200"
                >
                  <MinusIcon width={18} height={18} />
                </button>
                <span>{prod.quantity}</span>
                <button
                  onClick={() =>
                    handleIncrease(prod.id, prod.stock, prod.quantity)
                  }
                  className="hover:text-new-peach-90 duration-200"
                >
                  <PlusIcon width={18} height={18} />
                </button>
              </div>
              <div
                onClick={() => handleEraseClick(prod.id, prod.name)}
                className="flex gap-1 text-red-300 hover:text-red-400 cursor-pointer duration-100s"
              >
                <span>Remove</span>
                <TrashIcon height={20} width={20} />
              </div>
            </div>
          </div>
        </div>
      ))}
      <EraseProductDiaolog
        open={eraseProduct ? true : false}
        setEraseProduct={setEraseProduct}
        eraseProduct={eraseProduct}
      />
    </article>
  );
}
