import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  product_id: number;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product_id: number) => void;
  removeFromCart: (product_id: number) => void;
  increaseCount: (product_id: number) => void;
  decreaseCount: (product_id: number) => void;
  setQuantity: (product_id: number, quantity: number) => void;
  getQuantity: (product_id: number) => number;
  added: (product_id: number) => boolean;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product_id) =>
        set((state) => {
          const existing = state.cart.find(
            (item) => item.product_id === product_id
          );

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.product_id === product_id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          toast.info("Added to cart");

          return {
            cart: [...state.cart, { product_id, quantity: 1 }],
          };
        }),

      removeFromCart: (product_id) =>
        set((state) => {
          toast.info("Removed from cart");
          return {
            cart: state.cart.filter(
              (item) => item.product_id !== product_id
            ),
          };
        }),

      increaseCount: (product_id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product_id === product_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseCount: (product_id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product_id === product_id
              ? {
                  ...item,
                  quantity: item.quantity > 1 ? item.quantity - 1 : 1,
                }
              : item
          ),
        })),

      setQuantity: (product_id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product_id === product_id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),

      getQuantity: (product_id) => {
        const item = get().cart.find(
          (it) => it.product_id === product_id
        );
        return item ? item.quantity : 0;
      },

      added: (product_id) =>
        get().cart.some((item) => item.product_id === product_id),

      clearCart: () =>
        set(() => {
          toast.info("Cart cleared");
          return { cart: [] };
        }),
    }),
    {
      name: "cart",

      // ✅ ONLY thing you actually needed for your bug
      version: 2,
      migrate: (state: any, version) => {
        if (!state) return { cart: [] };

        if (version < 2) {
          return {
            ...state,
            cart: state.cart.map((item: any) => ({
              product_id: item.product_id ?? item.id,
              quantity: item.quantity ?? 1,
            })),
          };
        }

        return state;
      },
    }
  )
);
