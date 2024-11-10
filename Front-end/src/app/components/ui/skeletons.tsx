const animateSkeletonClasses =
  "animate-skeleton-load bg-gradient-to-r from-transparent via-neutral-300/15 to-transparent";

const productCardContentDimensions: {
  width: { gridWidth: string; listWidth: string };
  height: string;
}[] = [
  { height: "h-8", width: { gridWidth: "w-[70%]", listWidth: "w-40" } },
  { height: "h-8", width: { gridWidth: "w-[35%]", listWidth: "w-28" } },
  { height: "h-4", width: { gridWidth: "w-[40%]", listWidth: "w-20" } },
  { height: "h-12", width: { gridWidth: "w-[50%]", listWidth: "w-32" } },
];

export function ProductImageSkeleton() {
  return (
    <div className="relative w-full sm:w-[90%] aspect-[5/4] h-auto border-new-mint rounded-md overflow-hidden">
      <div className={`absolute w-full h-full ${animateSkeletonClasses}`}></div>
    </div>
  );
}

export function ProductListSkeleton({ viewType }: { viewType: string }) {
  return (
    <div
      className={`relative ${
        viewType == "grid"
          ? "w-[48%] mdl:w-[32%] flex-col pb-4"
          : "w-full flex-col items-center sm:flex-row"
      }  flex flex-col gap-5 rounded-sm overflow-hidden`}
    >
      <div
        className={`absolute left-0 top-0 -z-0 w-full h-full ${animateSkeletonClasses}`}
      ></div>
      <div
        className={`${
          viewType == "grid" ? "" : "w-2/3 sm:w-1/3"
        } px-3 py-8 overflow-hidden`}
      >
        <div
          className={` ${
            viewType == "grid" ? "w-full self-center" : ""
          } relative z-10 bg-new-darkblue w-[92%] aspect-[4/3] h-auto`}
        ></div>
      </div>
      <div
        className={`flex gap-2 flex-col ${
          viewType == "grid"
            ? "items-center"
            : "items-center justify-center sm:items-start"
        }`}
      >
        {productCardContentDimensions.map(({ width, height }, i) => (
          <div
            key={i}
            className={`relative z-10 bg-new-darkblue ${height} overflow-hidden ${
              viewType == "grid" ? `${width.gridWidth}` : `${width.listWidth}`
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
