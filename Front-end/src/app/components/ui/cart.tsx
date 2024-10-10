"use client";

import useCartStore from "@/app/store/cart";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Cart() {
  const { cart } = useCartStore();

  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setIsPulsing(true);

      const timeout = setTimeout(() => {
        setIsPulsing(false);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [cart]);

  const cartQuantity = () => {
    const totalLengh = cart.reduce((acc, { quantity }) => acc + quantity, 0);
    return totalLengh > 9 ? "9+" : totalLengh;
  };

  return (
    <div className="relative p-2">
      <ShoppingCartIcon width={35} height={35} />
      <div
        className={`absolute top-2 right-1 flex justify-center items-center text-new-darkblue text-[0.8rem] font-bold bg-new-peach-100 rounded-full scale-100 duration-300 ${
          cart.length > 0 ? "w-5 h-5" : "w-0 h-0 top-3 right-1/2"
        } ${isPulsing && 'scale-125'}`}
      >
        {cart.length > 0 && cartQuantity()}
      </div>
    </div>
  );
}
