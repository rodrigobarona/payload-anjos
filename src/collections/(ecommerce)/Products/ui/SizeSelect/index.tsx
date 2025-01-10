"use client";

import { Product } from "@/payload-types";
import { FieldLabel, Select, useField, useForm } from "@payloadcms/ui";
import { TextFieldClientComponent } from "payload";

export const SizeSelect: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path });

  const variantSlugPath = path.replace(/[^.]+$/, "variantSlug");

  const { setValue: setVariantSlugValue } = useField<string>({
    path: variantSlugPath,
  });

  const { getDataByPath, getSiblingData } = useForm();

  const sizes = getDataByPath("sizes") as Product["sizes"];

  const handleSizeChange = (option: { label: string; value: string }) => {
    setValue(option.value);

    const siblings = getSiblingData(path);
    const size = siblings.size as string;

    setVariantSlugValue(`${option.value}-${size}`);
  };

  return (
    <div className="twp my-auto h-fit w-1/2 px-2">
      <FieldLabel label="Rozmiar" />
      <Select
        value={{
          label: sizes?.find((size) => size.slug === value)?.label,
          value,
        }}
        onChange={handleSizeChange}
        options={
          sizes
            ? sizes?.map((size) => ({
                label: size.label,
                value: size.slug,
              }))
            : []
        }
      />
    </div>
  );
};
