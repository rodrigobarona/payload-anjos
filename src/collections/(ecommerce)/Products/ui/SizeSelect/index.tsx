"use client";

import { FieldLabel, Select, useField, useForm } from "@payloadcms/ui";
import { type TextFieldClientComponent } from "payload";
import { useEffect } from "react";

import { Product } from "@/payload-types";

export const SizeSelect: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path });

  const variantSlugPath = path.replace(/[^.]+$/, "variantSlug");

  const { setValue: setVariantSlugValue } = useField<string>({
    path: variantSlugPath,
  });

  const { getDataByPath, getSiblingData } = useForm();

  const { value: variantType } = useField<string>({ path: "variantsType" });

  const sizes = getDataByPath("sizes");

  const handleSizeChange = (option: { value: string }) => {
    setValue(option.value);

    const siblings = getSiblingData(path);
    const color = siblings.color as string;

    setVariantSlugValue(`${color ?? ""}${color && option.value ? "-" : ""}${option.value ?? ""}`);
  };

  useEffect(() => {
    if (variantType === "colors") {
      handleSizeChange({ value: "" });
    }
  }, [variantType]);


  return variantType !== "colors" ? (
    <div className="twp my-auto h-fit flex-1">
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
  ) : null;
};
