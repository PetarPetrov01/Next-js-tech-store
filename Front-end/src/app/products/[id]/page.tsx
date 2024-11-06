import ProductImages from "@/app/components/ProductImages";
import { getProduct } from "@/app/lib/data";
import ProductForm from "@/app/components/product/product-form";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  console.log(product);

  return (
    <section className="w-full flex justify-center md:min-h-screen">
      <div className="container p-4 flex flex-col md:flex-row md:justify-between gap-2 md:gap-[2%] xl:gap-8 items-center md:items-start">
        <article className="md:flex-shrink-0 w-[90%] sm:w-[80%] md:w-[48%] lg:w-[540px] xl:w-[610px]">
          <ProductImages images={product.images?.length > 0 ? product.images : ['/no-image.png']} />
        </article>
        <article className="rounded-md border-lightblue p-2 w-[80%] md:w-[50%] lg:max-w-[620px]">
          <div className="pl-2 lg:pl-6 flex flex-col gap-4 w-[90%]">
            <h1 className="text-3xl">{product.name}</h1>
            <h3 className="text-xl">${product.price}</h3>
            <div className="flex flex-col gap-8">
              <ProductForm product={product} />
              <div className="flex flex-col mt-4">
                <h3>Product info:</h3>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
