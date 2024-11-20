import { ReactNode } from "react";

export function ButtonLoader() {
  return (
    <div className="absolute top-0 left-0 flex z-20 items-center flex-row justify-center gap-[10%] p-1 w-full h-full">
      <div className="flex-[0_0_18%] aspect-square h-auto rounded-full bg-white animate-bounce"></div>
      <div className="flex-[0_0_18%] aspect-square h-auto rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
      <div className="flex-[0_0_18%] aspect-square h-auto rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
}

export function ButtonLoaderWrapper({
  children,
  isLoading = false,
}: {
  children: ReactNode;
  isLoading?: boolean;
}) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute top-0 left-0 flex z-20 items-center flex-row justify-center gap-[10%] p-1 w-full h-full">
          <div className="flex-[0_0_18%] aspect-square h-auto rounded-full bg-white animate-bounce"></div>
          <div className="flex-[0_0_18%] aspect-square h-auto rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
          <div className="flex-[0_0_18%] aspect-square h-auto rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
        </div>
      )}
    </div>
  );
}
