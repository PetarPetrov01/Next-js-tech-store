"use client";

import { Brands } from "@/types/Product";
import { getBrandsByCategory } from "../lib/data";
import BrandFilter from "./BrandFilter";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function BrandFilterWrapper() {
  const [brands, setBrands] = useState<Brands>([]);
  const searchParams = useSearchParams();

  const catId = useMemo(
    () => Number(searchParams.get("category")),
    [searchParams]
  );

  useEffect(() => {
    const fetchBrands = async () => {
      const filteredBrands = await getBrandsByCategory(catId);
      setBrands(filteredBrands);
    };
    fetchBrands();
  }, [catId]);

  return <BrandFilter brands={brands} />;
}
