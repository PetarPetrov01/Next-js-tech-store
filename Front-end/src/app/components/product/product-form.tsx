"use client";

import Link from "next/link";

import { useState } from "react";

import { useAuthContext } from "@/contexts/AuthProvider";
import useCartStore from "../../store/cart";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

import { PopulatedProduct } from "@/types/Product";
import useMounted from "@/hooks/useMounted";
import { ProductFormSkeleton } from "../ui/loaders/skeletons";
import DeleteProductDialog from "./dialogs/delete-product-dialog";

export default function ProductForm({
  product,
}: {
  product: PopulatedProduct;
}) {
  const { user } = useAuthContext();

  const { addToCart } = useCartStore();

  const hasMounted = useMounted();

  const [quantity, setQuantity] = useState(1);
  const [stockWarning, setStockWarning] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);

  const isOwner = product.ownerId == user?.id;

  const changeQty = (action: "increase" | "decrease") => {
    setQuantity((qty) => {
      if (action == "increase") {
        if (qty < product.stock) {
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

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <>
      {hasMounted ? (
        user?.email ? (
          isOwner ? (
            <>
              <div className="flex flex-col gap-2 p-3 mt-4 bg-gray-50/20">
                <p>Modify this product&apos;s details</p>
                <div className="flex justify-between gap-8">
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="text-center flex-[1_1_45%] p-2 bg-new-mint text-new-darkblue hover:bg-new-darkblue hover:text-new-mint duration-150"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setShowDeleteProduct(true)}
                    className="text-center flex-[1_1_45%] p-2 bg-new-mint text-new-darkblue hover:bg-new-darkblue hover:text-new-mint duration-150"
                  >
                    Delete product
                  </button>
                </div>
              </div>
              <DeleteProductDialog
                open={showDeleteProduct}
                productName={product.name}
                setShowDeleteProduct={setShowDeleteProduct}
                productId={product.id}
              />
            </>
          ) : (
            <div className="flex flex-col gap-1">
              <p className="mb-3">Choose quantity</p>
              <div className="flex justify-between gap-4">
                <div className="flex justify-between items-center flex-[1_1_15%] bg-gray-50/20  px-3 py-1 rounded-lg text-lg">
                  <button
                    onClick={() => changeQty("decrease")}
                    className="hover:text-new-peach-90 duration-200"
                  >
                    <FaMinus />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => changeQty("increase")}
                    className="hover:text-new-peach-90 duration-200"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-[1_1_55%] uppercase rounded-lg bg-new-mint text-new-darkblue py-2 hover:bg-new-peach-90 duration-200"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => setIsFavourite((prev) => !prev)}
                  className={`flex-[1_1_5%] flex justify-center rounded-lg items-center bg-new-mint ${
                    isFavourite
                      ? "text-red-400 hover:text-red-300"
                      : "text-new-darkblue hover:text-red-400"
                  } duration-200`}
                >
                  {isFavourite ? (
                    <FaHeart size={"1.3em"} />
                  ) : (
                    <FaRegHeart size={"1.3em"} />
                  )}
                </button>
              </div>
              <span
                className={`text-sm duration-200 ${
                  stockWarning && "text-red-400"
                }`}
              >
                In stock: {product.stock}
              </span>
            </div>
          )
        ) : (
          <div className="flex flex-col gap-2 p-3 mt-4 bg-gray-50/20">
            <p>Please login or register to add to your cart</p>
            <div className="flex justify-between gap-8">
              <Link
                href={"/login"}
                className="text-center flex-[1_1_45%] p-2 bg-new-mint text-new-darkblue hover:bg-new-darkblue hover:text-new-mint duration-150"
              >
                Login
              </Link>
              <Link
                href={"/register"}
                className="text-center flex-[1_1_45%] p-2 bg-new-mint text-new-darkblue hover:bg-new-darkblue hover:text-new-mint duration-150"
              >
                Register
              </Link>
            </div>
          </div>
        )
      ) : (
        <ProductFormSkeleton />
      )}
    </>
  );
}
