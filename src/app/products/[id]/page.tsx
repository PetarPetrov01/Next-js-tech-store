import { getProduct } from "@/app/lib/data";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <main>
      <section className="flex justify-center min-h-screen">
        <div className="container max-w-[1400px] p-4 flex justify-center items-start">
          <article className="border-[1px] w-[40%] rounded-md border-lightblue p-2">
            <div>
              <h1 className="text-3xl text-center">{product.name}</h1>
              <h1 className="text-xl text-center">
                {product.category.join(", ")}
              </h1>
              <h1 className="text-xl text-center">{product.price}</h1>
              <p className="">{product.description} </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
