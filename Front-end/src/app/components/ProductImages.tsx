'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

import { useAuthContext } from '@/contexts/AuthProvider'
import useMounted from '@/hooks/useMounted'
import useWindowWidth from '@/hooks/useWindowWidth'

import { ProductImageSkeleton } from '@/components/ui/loaders/skeletons'

import DesktopProductImages from './product/desktop-product-images'
import MobileProductImages from './product/mobile-product-images'

export default function ProductImages({ images, ownerId }: { images: string[]; ownerId: string }) {
  const { user } = useAuthContext()
  const pathname = usePathname()
  const hasMounted = useMounted()

  const isOwner = useMemo(() => user?.id == ownerId, [ownerId, user?.id])

  const { windowWidth } = useWindowWidth()

  return (
    <div className="relative w-full flex flex-col items-center gap-6 overflow-hidden">
      {hasMounted ? (
        windowWidth < 640 ? (
          <MobileProductImages isOwner={isOwner} images={images} pathname={pathname} />
        ) : (
          <DesktopProductImages isOwner={isOwner} images={images} pathname={pathname} />
        )
      ) : (
        <ProductImageSkeleton />
      )}
    </div>
  )
}
