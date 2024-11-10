"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import { useMemo } from "react";
import MobileProductImages from "./product/mobile-product-images";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthProvider";
import DesktopProductImages from "./product/desktop-product-images";
import { ProductImageSkeleton } from "./ui/skeletons";

export default function ProductImages({
  images,
  ownerId,
}: {
  images: string[];
  ownerId: string;
}) {
  const { user } = useAuthContext();
  const pathname = usePathname();

  const isOwner = useMemo(() => user?.id == ownerId, [ownerId, user?.id]);

  const { windowWidth } = useWindowWidth();

  return (
    <div className="w-full flex flex-col items-center gap-6 overflow-hidden">
        windowWidth < 640 ? (
          <MobileProductImages
            isOwner={isOwner}
            images={images}
            pathname={pathname}
          />
        ) : (
          <DesktopProductImages
            isOwner={isOwner}
            images={images}
            pathname={pathname}
          />
        )
      ) : (
      )}
    </div>
  );
}
