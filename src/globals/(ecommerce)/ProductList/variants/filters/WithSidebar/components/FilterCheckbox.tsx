"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export const FilterCheckbox = ({
  option,
  sectionId,
  optionIdx,
}: {
  option: {
    value: string;
    label: string;
    checked: boolean | undefined;
  };
  sectionId: string;
  optionIdx: number;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCheckFilter = (e: ChangeEvent<HTMLInputElement>, filterType: string) => {
    const value = e.target.value;
    const checked = e.target.checked;

    const currentParams = new URLSearchParams(searchParams?.toString());

    const currentValues = currentParams.get(filterType)?.split(",") || [];

    if (checked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      const index = currentValues.indexOf(value);
      if (index !== -1) {
        currentValues.splice(index, 1);
      }
    }

    if (currentValues.length > 0) {
      currentParams.set(filterType, currentValues.join(","));
    } else {
      currentParams.delete(filterType);
    }

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <input
      defaultValue={option.value}
      defaultChecked={option.checked}
      onChange={(e) => {
        handleCheckFilter(e, sectionId);
      }}
      id={`filter-${sectionId}-${optionIdx}`}
      name={`${sectionId}[]`}
      type="checkbox"
      className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
    />
  );
};
