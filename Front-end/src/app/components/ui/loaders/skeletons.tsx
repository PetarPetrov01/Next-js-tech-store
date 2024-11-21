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

export function LayoutToggleSkeleton() {
  return (
    <div className="relative flex overflow-hidden justify-between border-[1px] border-neutral-200/15 w-24 h-12 mdl:w-20 mdl:h-10">
      {["", ""].map((_, i) => (
        <div
          key={i}
          className={`relative flex-1 z-10 flex items-center justify-center p-1 `}
        >
          <span className="w-full h-full bg-new-darkblue"></span>
        </div>
      ))}
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

export function ProductFormSkeleton() {
  return (
    <div className="relative overflow-hidden select-none flex flex-col gap-2 p-3 mt-4">
      <p className="z-10 bg-new-darkblue text-transparent">Loading</p>
      <div className="flex justify-between gap-8">
        <div className="flex-[1_1_45%] z-10 p-2 text-transparent bg-new-darkblue">
          Loading
        </div>
        <div className="flex-[1_1_45%] z-10 p-2 text-transparent bg-new-darkblue">
          Loading
        </div>
      </div>
      <div
        className={`absolute left-0 top-0 w-full h-full ${animateSkeletonClasses}`}
      ></div>
    </div>
  );
}

export function ManageImagesListSkeleton({ viewType }: { viewType: string }) {
  return new Array(viewType == "big" ? 3 : 5).fill("").map((_, i) => (
    <div
      key={i}
      className={`relative z-10 overflow-hidden bg-transparent bg-new-darkblue group h-auto aspect-[4/3] p-4 rounded-lg ${
        viewType == "big"
          ? "flex-[0_0_100%] sm:flex-[0_0_48%] mdl:flex-[0_0_32%]"
          : "flex-[0_0_48%] sm:flex-[0_0_32%] mdl:flex-[0_0_19.2%]"
      }`}
    >
      <div className="relative z-10 w-full h-full  bg-new-darkblue opacity-75"></div>
      <div
        className={`absolute left-0 top-0 w-full h-full ${animateSkeletonClasses}`}
      ></div>
    </div>
  ));
}
