import ProductImages from "@/app/components/ProductImages";
import { getProduct } from "@/app/lib/data";
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
                <div className="flex flex-col gap-2">
                  <p>Choose quantity</p>
                  <div className="flex justify-between w-1/5 bg-gray-50/20  px-4 py-1 rounded-2xl text-lg">
                    <button>-</button>
                    <span>3</span>
                    <button>+</button>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <button className="flex-[1_1_75%] bg-new-mint text-new-gray py-2">
                    Add to cart
                  </button>
                  <button className="flex-[1_1_20%] flex justify-center items-center bg-new-mint text-new-gray">
                    {/* <HeartIconSolid width={30} height={30} /> */}
                    <HeartIcon width={30} height={30} />
                  </button>
                </div>
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
