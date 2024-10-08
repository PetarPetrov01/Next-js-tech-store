import ProductImages from "@/app/components/ProductImages";
import { getProduct } from "@/app/lib/data";
import ProductForm from "@/app/components/ui/product-form";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <main className="pt-4">
      <section className="flex justify-center min-h-screen">
        <div className="container max-w-[1300px] p-4 flex justify-center gap-8 items-start">
          <article className="w-1/2">
            <ProductImages images={product.images} />
          </article>
          <article className="w-1/2 rounded-md border-lightblue p-2">
            <div className="pl-6 flex flex-col gap-4 w-[90%]">
              <h1 className="text-3xl">{product.name}</h1>
              <h3 className="text-xl">${product.price}</h3>
              <div className="flex flex-col gap-8">
                <ProductForm stock={product.stock} productId={params.id} />
                <div className="flex flex-col mt-4">
                  <h3>Product info:</h3>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
