"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface MobileFiltersContextProps {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
}

const MobileFiltersContext = createContext<MobileFiltersContextProps | undefined>(undefined);

export const MobileFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <MobileFiltersContext.Provider value={{ mobileFiltersOpen, setMobileFiltersOpen }}>
      {children}
    </MobileFiltersContext.Provider>
  );
};

export const useMobileFilters = () => {
  const context = useContext(MobileFiltersContext);
  if (!context) {
    throw new Error("useMobileFilters must be used within a MobileFiltersProvider");
  }
  return context;
};
