import { create } from "zustand";
import { persist } from "zustand/middleware";
import { showWarning } from "@/utils/swl";
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  clearCart: () => void;
  removeItem: (id: Number) => void;
  increasequantity: (id: Number) => void;
  removequantity: (id: Number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {

          if(item.price <= 0) {
            showWarning(
              "Warning",
              `Price must be greater than 0 for ${item.title}.`
            );
            return state;
          }

          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            if (existing.price !== item.price) {
              showWarning(
                "Warning",
                `Price mismatch for ${item.title}. Please check the price.`
              );
              return state;
            }

            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      clearCart: () => set({ items: [] }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      increasequantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      removequantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ).filter((item) => item.quantity > 0),
        })),
    }),
    { name: "cart-storage" }
  )
);
