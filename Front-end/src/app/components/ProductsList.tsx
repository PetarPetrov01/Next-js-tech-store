import { getProds } from "../lib/data";
import ProductCard from "./ui/product-card";

export default async function ProductsList({
  searchParams,
}: {
  searchParams: any;
}) {
  const prods = await getProds(searchParams);

  return (
    <div className="flex flex-wrap w-full justify-start items-stretch md:gap-[2%] px-2">
      {prods?.length > 0 ? (
        prods.map((prod, i) => <ProductCard prod={prod} key={prod.id} />)
      ) : (
        <h2>No products!</h2>
      )}
    </div>
  );
}
