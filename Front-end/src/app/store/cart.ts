import { APIProduct, PopulatedProduct } from "@/types/Product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartProduct extends APIProduct {
  quantity: number;
}

interface CartState {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product: CartProduct) =>
        set((state) => ({
          cart: state.cart.some((prod) => prod.id == product.id)
            ? state.cart.map((prod) => {
                return prod.id == product.id
                  ? { ...prod, quantity: prod.quantity + product.quantity }
                  : prod;
              })
            : [...state.cart, product],
        })),
      increaseQuantity: (productId: string) =>
        set((state) => ({
          cart: state.cart.map((prod) => {
            return prod.id == productId
              ? { ...prod, quantity: prod.quantity + 1 }
              : prod;
          }),
        })),
      decreaseQuantity: (productId: string) =>
        set((state) => ({
          cart: state.cart.map((prod) => {
            return prod.id == productId
              ? { ...prod, quantity: prod.quantity - 1 }
              : prod;
          }),
        })),
      removeFromCart: (productId: string) =>
        set((state) => ({
          cart: state.cart.filter((prod) => productId != prod.id),
        })),
      clearCart: () => set(() => ({ cart: [] })),
    }),
    { name: "cart-storage" }
    //By default localstorage is used
  )
);

export default useCartStore;
