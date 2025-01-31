"use client";
import { Select, useField } from "@payloadcms/ui";

import { type VariantsArr } from ".";

export const VariantSelectClient = ({ variantsArr, path }: { variantsArr: VariantsArr; path: string }) => {
  const { value, setValue } = useField<string>({ path });

  const handleVariantChange = (valueToSet: VariantsArr[number]) => {
    setValue(valueToSet.value);
  };

  return (
    <Select
      value={{
        label: value,
        value,
      }}
      onChange={handleVariantChange}
      options={variantsArr}
    />
  );
};
