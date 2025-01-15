"use client";

import { createContext, useCallback, useContext, useState } from "react";

import canUseDOM from "@/utilities/canUseDOM";
import { Cart } from "./types";

export interface ContextType {
  cart: Cart | null;
  setCart: (cartToSet: Cart) => void;
}

const initialContext: ContextType = {
  cart: null,
  setCart: () => null,
};

const CartContext = createContext(initialContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Cart from local storage as initial state
  const [cart, setCartState] = useState<Cart | null>(
    (canUseDOM && (JSON.parse(window.localStorage.getItem("cart") ?? "[]") as Cart)) || null,
  );

  // Function to update cart state and local storage
  const setCart = useCallback((cartToSet: Cart) => {
    canUseDOM && window.localStorage.setItem("cart", JSON.stringify(cartToSet));
    setCartState(cartToSet);
  }, []);

  return <CartContext.Provider value={{ cart, setCart }}>{children}</CartContext.Provider>;
};

export const useCart = (): ContextType => useContext(CartContext);
