'use server'

import {
  ProductQueryParams,
  APIProduct,
  ProductWithImages,
  populatedProductInclude,
  PopulatedProduct,
} from '@/types/Product'
import { prisma } from '../config/db-config'
import { Prisma } from '@prisma/client'
import { redirect } from 'next/navigation'

const baseUrl = 'http://localhost:3001/api'

const getOrderByClause = (sortParam: any) => {
  if (!sortParam) {
    return { name: 'asc' } as Prisma.ProductOrderByWithRelationInput
  }

  if (sortParam.key == 'brand') {
    return {
      ['brand']: {
        ['name']: sortParam.order,
      },
    }
  } else {
    return {
      [sortParam.key]: sortParam.order,
    }
  }
}

export const getProduct = async (productId: string): Promise<PopulatedProduct> => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: populatedProductInclude,
  })

  if (!product) {
    throw new Error('Product not found')
  }

  console.log(product)

  return product
}

export const getProducts = async (searchParams: ProductQueryParams): Promise<APIProduct[]> => {
  const orderBy = getOrderByClause(searchParams?.sort)

  const prods = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: { contains: searchParams.search || undefined, mode: 'insensitive' },
        },
        {
          brand: {
            name: { contains: searchParams.search || undefined, mode: 'insensitive' },
          },
        },
        {
          model: { contains: searchParams.search || undefined, mode: 'insensitive' },
        },
      ],
      category: { id: Number(searchParams.category) || undefined },
      brand: { id: Number(searchParams.brand) || undefined },
      price: {
        gte: Number(searchParams.price?.gte) || undefined,
        lte: Number(searchParams.price?.lte) || undefined,
      },
    },
    include: {
      category: { select: { name: true } },
      brand: { select: { name: true } },
      images: { select: { url: true } },
    },
    orderBy,
  })

  return prods.map((p) => ({
    ...p,
    category: p.category.name,
    brand: p.brand.name,
    images: p.images.map((i) => i.url),
  }))
}

export const getProductImages = async (prodId: string, cookie: string): Promise<ProductWithImages> => {
  const res = await fetch(`${baseUrl}/products/${prodId}/images`, {
    headers: { Cookie: cookie },
    cache: 'no-cache',
  })

  if (!res.ok) {
    const error = await res.json()
    redirect('/login')
  }

  const product = await res.json()

  return product
}
