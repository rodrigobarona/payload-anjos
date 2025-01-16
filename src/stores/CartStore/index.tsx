import { create } from "zustand";
import canUseDOM from "@/utilities/canUseDOM";
import { Cart } from "./types";

interface CartState {
  cart: Cart | null;
  setCart: (cartToSet: Cart) => void;
  updateCart: (cartToSet: Cart) => void;
  removeFromCart: (productId: string, variantSlug?: string) => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: canUseDOM ? (JSON.parse(window.localStorage.getItem("cart") ?? "[]") as Cart) : null,

  setCart: (cartToSet: Cart) => {
    if (canUseDOM) {
      window.localStorage.setItem("cart", JSON.stringify(cartToSet));
    }
    console.log(cartToSet);
    set({ cart: cartToSet });
  },

  updateCart: (cartToSet: Cart) => {
    set((state) => {
      const prevCart = state.cart;

      if (prevCart === null) {
        if (canUseDOM) {
          window.localStorage.setItem("cart", JSON.stringify(cartToSet));
        }
        return { cart: cartToSet };
      }

      const updatedCart = [...prevCart];

      cartToSet.forEach((newProduct) => {
        const existingProductIndex = updatedCart.findIndex(
          (product) =>
            product.id === newProduct.id &&
            (product.choosenVariantSlug === newProduct.choosenVariantSlug ||
              (!product.choosenVariantSlug && !newProduct.choosenVariantSlug)),
        );

        if (existingProductIndex >= 0) {
          updatedCart[existingProductIndex].quantity += newProduct.quantity;
        } else {
          updatedCart.push(newProduct);
        }
      });

      if (canUseDOM) {
        window.localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return { cart: updatedCart };
    });
  },

  removeFromCart: (productId: string, variantSlug?: string) => {
    set((state) => {
      const updatedCart = state.cart?.filter((product) => {
        if (variantSlug) {
          return product.id !== productId || product.choosenVariantSlug !== variantSlug;
        }

        return product.id !== productId;
      });

      if (canUseDOM) {
        window.localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      return { cart: updatedCart };
    });
  },
}));

export const useCart = () => useCartStore((state) => state);
