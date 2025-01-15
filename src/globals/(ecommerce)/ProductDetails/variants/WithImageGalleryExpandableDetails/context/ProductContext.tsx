"use client";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { FilledVariant } from "../../../types";

interface ProductContextProps {
  selectedVariant: FilledVariant | null;
  setSelectedVariant: Dispatch<SetStateAction<FilledVariant>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({
  children,
  filledVariants,
}: {
  children: ReactNode;
  filledVariants?: FilledVariant[] | undefined;
}) => {
  const [selectedVariant, setSelectedVariant] = useState<FilledVariant | null>(
    filledVariants ? filledVariants[0] : null,
  );
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <ProductContext.Provider value={{ selectedVariant, setSelectedVariant, quantity, setQuantity }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProductContext must be used within a ProductProvider");
  return context;
};
