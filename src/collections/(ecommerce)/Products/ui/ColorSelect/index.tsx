"use client";

import { Product } from "@/payload-types";
import { FieldLabel, Select, useField, useForm } from "@payloadcms/ui";
import { TextFieldClientComponent } from "payload";
import { useEffect } from "react";

export const ColorSelect: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path });

  const variantSlugPath = path.replace(/[^.]+$/, "variantSlug");

  const { setValue: setVariantSlugValue } = useField<string>({
    path: variantSlugPath,
  });

  const { getDataByPath, getSiblingData } = useForm();

  const { value: variantType } = useField<string>({ path: "variantsType" });

  const colors = getDataByPath("colors") as Product["colors"];

  const handleColorChange = (option: { value: string }) => {
    setValue(option.value);

    const siblings = getSiblingData(path);

    const size = siblings.size as string;

    setVariantSlugValue(`${option.value ?? ""}${option.value && size ? "-" : ""}${size ?? ""}`);
  };

  useEffect(() => {
    if (variantType === "sizes") {
      handleColorChange({ value: "" });
    }
  }, [variantType]);

  return variantType !== "sizes" ? (
    <div className="twp my-auto h-fit w-1/2">
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
  ) : null;
};
