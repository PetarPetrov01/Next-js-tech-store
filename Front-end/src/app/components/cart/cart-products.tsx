"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import useCartStore from "@/app/store/cart";

import { BsTrash3Fill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { BsFillXCircleFill } from "react-icons/bs";
import {FaRegHeart} from 'react-icons/fa'

import EraseProductDiaolog from "./dialogs/cart-erase-product-dialog";
import ClearCartDialog from "./dialogs/clear-cart-dialog";


export default function CartProducts() {
  const { cart, increaseQuantity, decreaseQuantity } = useCartStore();

  const [eraseProduct, setEraseProduct] = useState<{
    productId: string;
    name: string;
  } | null>(null);

  const [showClearDialog, setShowClearDialog] = useState(false);

  const totalProducts = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity, 0);
  };

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
    <article className="flex-[1_1_70%] flex flex-col">
      <div
        className={` ${
          cart.length <= 0 && "hidden"
        } relative flex justify-between items-stretch p-4 pb-3 after:absolute after:w-[96%] after:bottom-0 after:right-[2%] after:bg-gray-200/50 after:h-[1px]`}
      >
        <div className="flex justify-between gap-7 items-end">
          <h1 className="text-3xl">Cart</h1>
          <p className="text-white/60 pb-[2px]">Products: {totalProducts()}</p>
        </div>
        <button
          onClick={() => setShowClearDialog(true)}
          className="flex gap-1 items-center mr-2 text-red-400 hover:text-red-500/90 duration-200"
        >
          <p>Clear cart</p>
          <BsFillXCircleFill size={'1.1em'} />
        </button>
      </div>
      {cart.length > 0 ? (
        <div className="flex flex-col gap-6">
          {cart.map((prod) => (
            <div
              key={prod.id}
              className="min-h-8 flex justify-between rounded-md"
            >
              <div className="flex-[1_1_17%] flex justify-center items-center p-2 aspect-square">
                <Image
                  src={prod.images[0]}
                  alt={prod.name}
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
              <div className="flex-[1_1_70%] flex p-6 pt-8">
                <div className="flex-[1_1_70%] flex flex-col gap-4">
                  <h2>{prod.name}</h2>
                  <span>in stock: {prod.stock}</span>
                </div>
                <div className="flex-[1_1_25%] flex flex-col items-end gap-3">
                  <h3>${prod.price * prod.quantity}</h3>
                  <div className="flex gap-4 text-lg px-3 py-1 rounded-sm bg-gray-800/75">
                    <button
                      onClick={() =>
                        handleDecrease(prod.id, prod.quantity, prod.name)
                      }
                      className="hover:text-new-peach-90 duration-200"
                    >
                      <FaMinus size={'0.85em'} />
                    </button>
                    <span>{prod.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncrease(prod.id, prod.stock, prod.quantity)
                      }
                      className="hover:text-new-peach-90 duration-200"
                    >
                      <FaPlus size={'0.85em'} />
                    </button>
                  </div>
                  <div className="flex gap-1 items-center cursor-pointer">
                    <span>Add to wish list</span>
                    <FaRegHeart size={'1.1em'} />
                  </div>
                  <div
                    onClick={() => handleEraseClick(prod.id, prod.name)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-500/90 cursor-pointer duration-100"
                  >
                    <span>Remove</span>
                    <BsTrash3Fill size={"1em"} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col w-3/4 m-auto rounded-md items-center gap-6 justify-center p-8 bg-new-midnight-90">
          <h2>No items in the cart!</h2>
          <p className="w-3/5 text-center">
            Your cart is empty at the moment. Explore our wide range of
            electronics, tailored to fit your needs. Check out our featured
            categories or browse by brand to discover the perfect products for
            you.
          </p>
          <Link
            href={"/products"}
            className="px-5 py-4 text-[1.15rem] bg-new-darkblue hover:bg-new-mint hover:text-new-darkblue duration-150  "
          >
            Browse products
          </Link>
        </div>
      )}

      <EraseProductDiaolog
        open={eraseProduct ? true : false}
        setEraseProduct={setEraseProduct}
        eraseProduct={eraseProduct}
      />
      <ClearCartDialog
        showClearDialog={showClearDialog}
        setShowClearDialog={setShowClearDialog}
      />
    </article>
  );
}
