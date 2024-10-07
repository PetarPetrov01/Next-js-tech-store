"use client";

import { useAuthContext } from "@/contexts/AuthProvider";
import { HeartIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

export default function ProductForm({ stock }: { stock: number }) {
  const { user } = useAuthContext();

  const [quantity, setQuantity] = useState(1);
  const [stockWarning, setStockWarning] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const changeQty = (action: "increase" | "decrease") => {
    setQuantity((qty) => {
      if (action == "increase") {
        if (qty < stock) {
          return qty + 1;
        } else {
          handleStockExceed();
          return qty;
        }
      } else {
        return qty <= 1 ? qty : qty - 1;
      }
    });
  };

  const handleStockExceed = () => {
    setStockWarning(true);
    setTimeout(() => {
      setStockWarning(false);
    }, 500);
  };

  return (
    <>
      {user?.email ? (
        <div className="flex flex-col gap-1">
          <p className="mb-3">Choose quantity</p>
          <div className="flex justify-between gap-4">
            <div className="flex justify-between items-center flex-[1_1_15%] bg-gray-50/20  px-3 py-1 rounded-lg text-lg">
              <button
                onClick={() => changeQty("decrease")}
                className="hover:text-new-peach-90 duration-200"
              >
                <MinusIcon width={18} height={18} />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => changeQty("increase")}
                className="hover:text-new-peach-90 duration-200"
              >
                <PlusIcon width={18} height={18} />
              </button>
            </div>
            <button className="flex-[1_1_55%] rounded-lg bg-new-mint text-new-gray py-2 hover:bg-new-peach-90 duration-200">
              Add to cart
            </button>
            <button
              onClick={() => setIsFavourite((prev) => !prev)}
              className={`flex-[1_1_5%] flex justify-center rounded-lg items-center bg-new-mint ${
                isFavourite
                  ? "text-red-400 hover:text-red-300"
                  : "text-new-gray hover:text-red-400"
              } duration-200`}
            >
              {isFavourite ? (
                <HeartIconSolid width={30} height={30} />
              ) : (
                <HeartIcon width={30} height={30} />
              )}
            </button>
          </div>
          <span
            className={`text-sm duration-200 ${stockWarning && "text-red-400"}`}
          >
            In stock: {stock}
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-3 mt-4 bg-gray-50/20">
          <p>Please login or register to add to your cart</p>
          <div className="flex justify-between gap-8">
            <Link
              href={"/login"}
              className="text-center flex-[1_1_45%] p-2 bg-new-mint text-new-gray"
            >
              Login
            </Link>
            <Link
              href={"/register"}
              className="text-center flex-[1_1_45%] p-2 bg-new-mint text-new-gray"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
