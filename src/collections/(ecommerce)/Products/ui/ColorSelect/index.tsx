"use client";

import { Product } from "@/payload-types";
import { FieldLabel, Select, useField, useForm } from "@payloadcms/ui";
import { TextFieldClientComponent } from "payload";

export const ColorSelect: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path });

  const variantSlugPath = path.replace(/[^.]+$/, "variantSlug");

  const { setValue: setVariantSlugValue } = useField<string>({
    path: variantSlugPath,
  });

  const { getDataByPath, getSiblingData } = useForm();

  const colors = getDataByPath("colors") as Product["colors"];

  const handleColorChange = (option: { label: string; value: string }) => {
    setValue(option.value);

    const siblings = getSiblingData(path);
    const size = siblings.size as string;

    setVariantSlugValue(`${option.value}-${size}`);
  };

  return (
    <div className="twp my-auto h-fit w-1/2 px-2">
      <FieldLabel label="Kolor" />
      <Select
        value={{
          label: colors?.find((color) => color.slug === value)?.label,
          value,
        }}
        onChange={handleColorChange}
        options={
          colors
            ? colors?.map((color) => ({
                label: color.label,
                value: color.slug,
              }))
            : []
        }
      />
    </div>
  );
};
