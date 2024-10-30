import { getProds } from "../lib/data";
import ProductCard from "./ui/product/product-card";

export default async function ProductsList({
  searchParams,
}: {
  searchParams: any;
}) {
  const prods = await getProds(searchParams);

  const viewType = searchParams.view || 'grid'

  return (
    <div className={`flex flex-wrap w-full mt-6  ${viewType == 'grid' ? 'justify-start items-stretch md:gap-[2%]' : 'flex-col gap-6'}`}>
      {prods?.length > 0 ? (
        prods.map((prod, i) => <ProductCard prod={prod} key={prod.id} />)
      ) : (
        <h2>No products!</h2>
      )}
    </div>
  );
}
