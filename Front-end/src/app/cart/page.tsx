import CartOrder from "../components/ui/cart-order";
import CartProducts from "../components/ui/cart-products";

export default function CartPage() {
  return (
    <main className="bg-gradient-radial min-h-[75vh] from-new-teal to-new-gray">
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
