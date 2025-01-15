"use client";

import { Dialog } from "@headlessui/react";
import { useMobileFilters } from "../stores/MobileFiltersContext";
import { ReactNode } from "react";

export const MobileFiltersDialog = ({ children }: { children: ReactNode }) => {
  const { mobileFiltersOpen, setMobileFiltersOpen } = useMobileFilters();
  return (
    <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-50 lg:hidden">
      {children}
    </Dialog>
  );
};
