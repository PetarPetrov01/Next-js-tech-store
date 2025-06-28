import { User } from "./User";
import { Prisma } from "@prisma/client";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  brandId: number;
  model: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type APIProduct = Product & {
  ownerId: string;
};

export const populatedProductInclude = {
  category: { select: { id: true } },
  brand: { select: { id: true } },
  images: { select: { url: true } },
  owner: { select: { id: true } },
} satisfies Prisma.ProductInclude;

export type PopulatedProduct = Prisma.ProductGetPayload<{
  include: typeof populatedProductInclude;
}>

export type ProductWithImages = {
  id: string;
  ownerId: string;
  name: string;
  images: {
      id: number;
      url: string;
  }[];
}

export type Categories = {
  id: number;
  name: string;
  _count: number;
}[];

export interface ProductQueryParams {
  search?: string;
  category?: number;
  brand?: number;
  price?: {
    gte?: number;
    lte?: number;
  };
  sort?: {
    key: string;
    order: 'asc' | 'desc';
  };
}

export type Brands = Categories;
