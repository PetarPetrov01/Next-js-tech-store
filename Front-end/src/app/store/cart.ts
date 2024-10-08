import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product: CartItem) =>
        // set((state) => ({ cart: [...state.cart, product] })),
        set((state) => ({
          cart: state.cart.some((prod) => prod.productId == product.productId)
            ? state.cart.map((prod) => {
                return prod.productId == product.productId
                  ? { ...prod, quantity: prod.quantity + product.quantity }
                  : prod;
              })
            : [...state.cart, product],
        })),
      removeFromCart: (productId: string) =>
        set((state) => ({
          cart: state.cart.filter((prod) => productId != prod.productId),
        })),
      clearCart: () => set(() => ({ cart: [] })),
    }),
    { name: "cart-storage" }
    //By default localstorage is used
  )
);

export default useCartStore;
