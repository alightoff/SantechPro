import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from './types';

interface ShopState {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  moveToCartFromWishlist: (id: number) => void;
  clearWishlist: () => void;          // ← новая функция
}

export const useShopStore = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),

      clearCart: () => set({ cart: [] }),

      addToWishlist: (product: Product) =>
        set((state) => {
          const exists = state.wishlist.some((p) => p.id === product.id);
          if (exists) {
            // Удаляем, если уже есть (toggle)
            return {
              wishlist: state.wishlist.filter((p) => p.id !== product.id),
            };
          }
          // Добавляем, если нет
          return {
            wishlist: [...state.wishlist, product],
          };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({ wishlist: state.wishlist.filter((p) => p.id !== id) })),

      moveToCartFromWishlist: (id) =>
        set((state) => {
          const product = state.wishlist.find((p) => p.id === id);
          if (!product) return state;
          return {
            wishlist: state.wishlist.filter((p) => p.id !== id),
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),

      // ← Добавлена функция очистки всего списка отложенного
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'plumbing-shop-storage', // ключ в localStorage
    }
  )
);