import { getProds } from "../lib/data";
import ProductCard from "../ui/product-card";

export default async function ProductsList({
  category,
  searchParams,
}: //Consider using categoryId !
{
  category: string;
  searchParams: any;
}) {
  const prods = await getProds(searchParams);

  return (
    <article className="sm:w-[71%] lg:w-[75%] flex flex-col items-center justify-center">
      <h2 className="text-4xl">Browse our products</h2>
      <h3>{searchParams.toString()}</h3>
      <div className="flex flex-wrap w-full justify-start items-stretch md:gap-[2%] px-2">
        {prods?.length>0 ? prods.map((prod, i) => (
          <ProductCard prod={prod} key={prod.id} />
        )) : 
        <h2>No products!</h2>}
      </div>
    </article>
  );
}
