import { redirect } from "next/navigation";
import CartOrder from "../components/ui/cart/cart-order";
import CartProducts from "../components/ui/cart/cart-products";
import { checkAuth } from "../utils/checkAuth";
import { cookies } from "next/headers";

export default async function CartPage() {
  const isLogged = await checkAuth(cookies().toString());

  if (!isLogged) redirect("/login");

  return (
    <main className="bg-gradient-radial min-h-[75vh] from-new-midnight to-new-darkblue">
      <div className="container max-w-[1450px] flex justify-center m-auto p-5">
        <section className="flex flex-col gap-10 mt-6 w-full">
          <div className="flex w-full justify-between gap-8 items-start">
            <CartProducts />
            <CartOrder />
          </div>
        </section>
      </div>
    </main>
  );
}
