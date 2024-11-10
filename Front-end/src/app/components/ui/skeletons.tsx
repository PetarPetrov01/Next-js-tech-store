export function ProductImageSkeleton() {
  return (
    <div className="relative w-full sm:w-[90%] aspect-[5/4] h-auto border-new-mint rounded-md overflow-hidden">
        <div className="absolute w-full h-full animate-skeleton-load bg-gradient-to-r from-transparent via-neutral-300/15 to-transparent"></div>
    </div>
  );
}
