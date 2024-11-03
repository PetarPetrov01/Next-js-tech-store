import { redirect } from "next/navigation";
import CartOrder from "../components/cart/cart-order";
import CartProducts from "../components/cart/cart-products";
import { checkAuth } from "../utils/checkAuth";
import { cookies } from "next/headers";

export default async function CartPage() {
  const isLogged = await checkAuth(cookies().toString());

  if (!isLogged) redirect("/login");

  return (
    <div className="container max-w-[1450px] flex justify-center m-auto p-5">
      <section className="flex flex-col gap-10 mt-6 w-full">
        <div className="flex w-full justify-between gap-8 items-start">
          <CartProducts />
          <CartOrder />
        </div>
      </section>
    </div>
  );
}
