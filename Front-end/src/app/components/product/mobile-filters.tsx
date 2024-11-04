"use client";

import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryFilter from "../CategoryFilter";
import PriceFilter from "../PriceFilter";
import BrandFilterWrapper from "../BrandFilterWrapper";
import { Categories } from "@/types/Product";
import Sort from "../Sort";

export default function MobileFilters({
  categories,
}: {
  categories: Categories;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenDrawer(true)}
        className="px-4 py-2 border-[1px] border-new-peach-100 md:pointer-events-none"
      >
        Filters
      </button>
      <Drawer open={openDrawer} onClose={handleCloseDrawer}>
        <div className="min-w-[290px] p-4 sm:min-w-[75vw] w-full h-full bg-new-midnight-90">
          <Sort />
          <CategoryFilter categories={categories} />
          <PriceFilter />
          <BrandFilterWrapper />
        </div>
      </Drawer>
    </>
  );
}
