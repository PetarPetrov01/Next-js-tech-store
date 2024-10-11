"use client";

import useCartStore from "@/app/store/cart";

const deliveryPrice = 5;

export default function CartOrder() {
  const { cart } = useCartStore();

  const totalPrice = () => {
    return cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);
  };

  return (
    <>
      {cart.length > 0 && (
        <article className="flex-[1_1_25%] flex flex-col gap-4 bg-new-midnight-100 min-h-10 p-4">
          <h2>Order info</h2>
          <div className="flex flex-col items-stretch">
            <div className="flex justify-between">
              <p>Products:</p>
              <p>${totalPrice()}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery: </p>
              <p>${deliveryPrice}</p>
            </div>
          </div>
          <h3>Total: ${totalPrice() + deliveryPrice}</h3>
          <button className="self-center p-3 text-new-mint bg-new-darkblue rounded-md hover:text-new-darkblue hover:bg-new-peach-100 duration-200">
            Complete order
          </button>
        </article>
      )}
    </>
  );
}
