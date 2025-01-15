"use client";
import { Select } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export const SortSelect = ({ children, defaultValue }: { children: ReactNode; defaultValue: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSortingOptions = (value: string) => {
    const currentParams = new URLSearchParams(searchParams?.toString());

    if (!value || value === "most-popular") {
      currentParams.delete("sortBy");
    } else {
      currentParams.set("sortBy", value);
    }

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <Select defaultValue={defaultValue} onValueChange={handleSortingOptions}>
      {children}
    </Select>
  );
};
