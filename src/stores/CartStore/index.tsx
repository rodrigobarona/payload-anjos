import { create } from "zustand";
import canUseDOM from "@/utilities/canUseDOM";
import { Cart } from "./types";
import { getPayload } from "payload";
import axios from "axios";

interface CartState {
  cart: Cart | null;
  setCart: (cartToSet: Cart) => void;
  updateCart: (cartToSet: Cart) => void;
  removeFromCart: (productId: string, variantSlug?: string) => void;
  synchronizeCart: () => Promise<void>;
}

const saveCartToUserAccount = async (cart: Cart) => {
  try {
    await axios.post("/next/cart", cart);
  } catch (error) {
    console.error("Failed to save cart to UserAccount:", error);
  }
};

const fetchCartFromUserAccount = async (): Promise<Cart | null> => {
  try {
    const { data } = await axios.get<{ data: Cart; status: number }>("/next/cart");
    if (data.status === 400) return null;
    return data.data;
  } catch (error) {
    console.error("Failed to fetch cart from UserAccount:", error);
    return null;
  }
};

const useCartStore = create<CartState>((set, get) => ({
  cart: canUseDOM ? (JSON.parse(window.localStorage.getItem("cart") ?? "[]") as Cart) : null,

  setCart: (cartToSet: Cart) => {
    if (canUseDOM) {
      window.localStorage.setItem("cart", JSON.stringify(cartToSet));
    }
    saveCartToUserAccount(cartToSet);
    set({ cart: cartToSet });
  },

  updateCart: (cartToSet: Cart) => {
    set((state) => {
      const prevCart = state.cart;

      if (prevCart === null) {
        if (canUseDOM) {
          window.localStorage.setItem("cart", JSON.stringify(cartToSet));
        }
        saveCartToUserAccount(cartToSet);
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
      saveCartToUserAccount(updatedCart);
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
      saveCartToUserAccount(updatedCart ?? []);
      return { cart: updatedCart };
    });
  },

  synchronizeCart: async () => {
    if (!canUseDOM) return;

    const cartFromLocalStorage = JSON.parse(window.localStorage.getItem("cart") ?? "[]") as Cart;
    const cartFromUserAccount = await fetchCartFromUserAccount();

    if (!cartFromUserAccount) {
      if (cartFromLocalStorage.length > 0) {
        saveCartToUserAccount(cartFromLocalStorage);
      }
      return;
    }

    window.localStorage.setItem("cart", JSON.stringify(cartFromUserAccount));
    set({ cart: cartFromUserAccount });
  },
}));

export const useCart = () => useCartStore((state) => state);
