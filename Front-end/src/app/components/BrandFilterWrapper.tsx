import { getBrandsByCategory } from "../lib/data";
import BrandFilter from "./BrandFilter";

export default async function BrandFilterWrapper({
  catId,
}: {
  catId: number | null;
}) {
  const brands = await getBrandsByCategory(catId);

  return <BrandFilter brands={brands} />;
}
