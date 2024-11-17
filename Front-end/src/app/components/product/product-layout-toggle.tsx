"use client";

import useMounted from "@/hooks/useMounted";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LayoutToggleSkeleton } from "../ui/loaders/skeletons";

type ToggleOption = {
  value: string;
  icon: JSX.Element;
};

interface LayoutToggleProps {
  options: [ToggleOption, ToggleOption];
  paramName: string;
  defaultValue: string;
}

export default function LayoutToggle({
  paramName,
  defaultValue,
  options,
}: LayoutToggleProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const hasMounted = useMounted();

  const [selectedOption, setSelectedOption] = useState<string>(
    searchParams.get(paramName) || defaultValue
  );

  const toggleLayout = (optionValue: string) => {
    const params = new URLSearchParams(searchParams);

    setSelectedOption(optionValue);
    params.set(paramName, optionValue);

    replace(`${pathname}?${params}`, { scroll: false });
  };

  return hasMounted ? (
    <div className="flex justify-between border-[1px] border-new-peach-100 w-24 h-12 mdl:w-20 mdl:h-10 cursor-pointer">
      {options.map(({ value, icon }) => (
        <div
          key={value}
          onClick={() => toggleLayout(value)}
          className={`flex-1 flex items-center justify-center p-1 ${
            selectedOption === value
              ? "bg-new-peach-100 text-new-darkblue"
              : "bg-transparent text-new-mint duration-150 hover:bg-neutral-700/70"
          }`}
        >
          {icon}
        </div>
      ))}
    </div>
  ) : (
    <LayoutToggleSkeleton />
  );
}
