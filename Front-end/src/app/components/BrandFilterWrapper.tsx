import { getBrands } from "../lib/data";
import BrandFilter from "./BrandFilter";

export default async function BrandFilterWrapper({
  catId,
}: {
  catId: number | null;
}) {
  console.log("from BFW  -  ", catId);
  const brands = await getBrands(catId);
  console.log(brands);

  return <BrandFilter brands={brands} />;
}
