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
