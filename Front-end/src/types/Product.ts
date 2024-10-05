import { User } from "./User";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  category: string;
  brandId: number;
  brand: string;
  model: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type APIProduct = Product & {
  _id: string;
  _ownerId: string;
  __v: string;
  createdAt: string;
};

export type PopulatedProduct = Omit<APIProduct, "_ownerId" | "images"> & {
  _ownerId: User;
  images: { url: string }[];
};

export type Categories = {
  id: number;
  name: string;
  _count: number;
}[];

export type Brands = Categories;
