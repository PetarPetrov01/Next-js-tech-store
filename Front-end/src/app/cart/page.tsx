import { redirect } from "next/navigation";
import CartOrder from "../components/cart/cart-order";
import CartProducts from "../components/cart/cart-products";
import { auth } from "@/auth";

export default async function CartPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <div className="container flex justify-center m-auto p-5">
      <section className="flex flex-col gap-10 mt-6 w-full">
        <div className="flex w-full justify-between gap-8 items-start">
          <CartProducts />
          <CartOrder />
        </div>
      </section>
    </div>
  );
}
