"use client";

import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import Slider from "react-slider";

export default function PriceFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [values, setValues] = useState([10, 500]);

  const handleSliderChange = (values: number[]) => {
    setValues(values);
  };

  const handleSliderChangeComplete = (value: number[]) => {
    const params = new URLSearchParams(searchParams);

    if (value && value.length == 2) {
      params.set("price", String(value.join(":")));
    } else {
      params.delete("price");
    }
    const href = `${pathname}?${params.toString()}`;
    replace(href)
  };

  return (
    <div
      className={`relative flex flex-col gap-1 p-2 bg-[#ffd5ae] overflow-hidden rounded-md font-semibold text-new-gray duration-200`}
    >
      <h3>Price</h3>
      <div className="flex flex-col justify-between py-4 px-2">
        <div className="flex gap-2">
          <p>${values[0]}</p>
          <p>${values[1]}</p>
        </div>
        <Slider
          onAfterChange={handleSliderChangeComplete}
          onChange={handleSliderChange}
          className="h-1 w-full bg-new-teal-80"
          defaultValue={values}
          min={0}
          max={4000}
          thumbClassName="translate-y-[-33%] top-0 bg-new-gray h-4 w-4 rounded-full"
        />
      </div>
    </div>
  );
}
