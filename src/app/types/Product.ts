import { User } from "./User";

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string[];
  style: string;
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  material: string[];
  color: string;
  price: number;
  _ownerId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type APIProduct = Product & {
  _id: string;
  _ownerId: string;
  __v: string;
  createdAt: string;
};

export type PopulatedProduct = Omit<APIProduct, '_ownerId'> & { _ownerId: User };
