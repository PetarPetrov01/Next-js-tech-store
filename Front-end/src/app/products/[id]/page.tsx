import ProductImages from "@/app/components/ProductImages";
import { getProduct } from "@/app/lib/data";

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
            <div className="pl-6 flex flex-col gap-2">
              <h1 className="text-3xl">{product.name}</h1>
              <p className="">{product.description} </p>
              <h3 className="text-xl">${product.price}</h3>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
