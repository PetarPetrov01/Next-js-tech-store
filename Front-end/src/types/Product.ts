import { User } from "./User";

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

export type PopulatedProduct = Omit<APIProduct, "_ownerId"> & {
  ownerId: User;
};

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
