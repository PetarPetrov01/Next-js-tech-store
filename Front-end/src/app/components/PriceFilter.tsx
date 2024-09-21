"use client";

import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import Slider from "react-slider";

const MIN_PRICE = 30;
const MAX_PRICE = 9000;

const hideInputArrowClass =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

export default function PriceFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleSliderChangeComplete = (value: number[]) => {
    const params = new URLSearchParams(searchParams);

    if (value && value.length == 2) {
      params.set("price", String(value.join(":")));
    } else {
      params.delete("price");
    }
    const href = `${pathname}?${params.toString()}`;
    replace(href);
  };
  const handleInputChange = (
  ) => {
  };
  const handleInputChangeComplete = (
  ) => {
  };

  return (
    <div
      className={`relative flex flex-col gap-1 p-2 bg-[#ffd5ae] overflow-hidden rounded-md font-semibold text-new-gray duration-200`}
    >
      <h3>Price</h3>
      <div className="flex flex-col justify-between py-4 px-2">
        <Slider
          onAfterChange={handleSliderChangeComplete}
          onChange={handleSliderChange}
          className="h-1 w-full bg-new-teal-80"
          value={priceRange}
          min={MIN_PRICE}
          max={MAX_PRICE}
          thumbClassName="translate-y-[-33%] top-0 bg-new-gray h-4 w-4 rounded-full"
        />
      </div>
      <div className="flex gap-2 justify-around">
        <input
          className={`w-[40%] text-center bg-new-gray text-new-mint ${hideInputArrowClass}`}
          value={priceRange[0]}
          type="number"
          onChange={(e) => handleInputChange(e, 0)}
          onBlur={(e) => handleInputChangeComplete(e, 0)}
        />
        -
        <input
          className={`w-[40%] text-center bg-new-gray text-new-mint ${hideInputArrowClass}`}
          value={priceRange[1]}
          type="number"
          onChange={(e) => handleInputChange(e, 1)}
          onBlur={(e) => handleInputChangeComplete(e, 1)}
        />
      </div>
    </div>
  );
}
