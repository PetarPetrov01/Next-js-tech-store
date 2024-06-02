import { Product } from "../types/Product";

export const getProds = async (): Promise<Product[]> => {
    const res = await fetch("http://localhost:3030/products");
    return res.json();
  };