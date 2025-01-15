import { create } from "zustand";
import { FilledVariant } from "../../../types";

interface ProductState {
  selectedVariant: FilledVariant | null;
  setSelectedVariant: (variant: FilledVariant) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  updateQuantity: (delta: number) => void;
}

const useProductStore = create<ProductState>((set) => ({
  selectedVariant: null,
  setSelectedVariant: (variant) => set({ selectedVariant: variant }),
  quantity: 1,
  setQuantity: (quantity) => set({ quantity }),
  updateQuantity: (delta) => set((state) => ({ quantity: state.quantity + delta })),
}));

export const useProductContext = (filledVariant?: FilledVariant) => {
  const { selectedVariant, setSelectedVariant, quantity, updateQuantity, setQuantity } = useProductStore();

  if (filledVariant && selectedVariant === null) {
    setSelectedVariant(filledVariant);
  }

  return { selectedVariant, setSelectedVariant, quantity, updateQuantity, setQuantity };
};
