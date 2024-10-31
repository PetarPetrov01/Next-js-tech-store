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
  _ownerId: string; // Not yet returned from BE
};

export type PopulatedProduct = Omit<APIProduct, "_ownerId"> & {
  _ownerId: User;
};

export type ProductWithImages = {
  id: string;
  ownerId: string;
  name: string;
  images: {
      id: string;
      url: string;
  }[];
}

export type Categories = {
  id: number;
  name: string;
  _count: number;
}[];

export type Brands = Categories;
