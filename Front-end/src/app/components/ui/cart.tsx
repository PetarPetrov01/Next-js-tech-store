"use client";

import useCartStore from "@/app/store/cart";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Cart() {
  const { cart } = useCartStore();

  const cartQuantity = () => {
    const totalLengh = cart.reduce((acc, { quantity }) => acc + quantity, 0);
    return totalLengh > 9 ? "9+" : totalLengh;
  };

  return (
    <div className="relative p-2">
      <ShoppingCartIcon width={30} height={40} />
      {cart.length > 0 && (
        <div className="absolute top-2 right-1 flex justify-center items-center text-new-gray text-[0.8rem] font-bold bg-new-peach-100 rounded-full w-5 h-5">
          {cartQuantity()}
        </div>
      )}
    </div>
  );
}
