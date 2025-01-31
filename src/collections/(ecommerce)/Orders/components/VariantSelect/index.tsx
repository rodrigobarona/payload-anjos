import { FieldLabel, Select } from "@payloadcms/ui";
import { type TextFieldServerComponent } from "payload";

import { type Product } from "@/payload-types";

import { VariantSelectClient } from "./VariantSelect.client";

export type VariantsArr = {
  label: string | null | undefined;
  value: string | null | undefined;
}[];

export const VariantSelect: TextFieldServerComponent = async ({ siblingData, req, path }) => {
  const productID = siblingData.product as string;
  console.log(productID);
  const payload = req.payload;
  let product: Product | null = null;
  try {
    product = await payload.findByID({
      collection: "products",
      id: productID,
    });
    if (!product?.variants) {
      throw new Error("No variants found");
    }
  } catch {
    return (
      <div className="max-w-1/2 twp mx-[5px] my-auto h-fit w-full flex-1">
        <FieldLabel label="Wariant" />
        <Select
          value={{
            label: "Brak",
            value: "nd",
          }}
          disabled
          options={[]}
        />
        <p className="mt-2 text-sm" style={{ color: "var(--theme-eleveation-150)" }}>
          Jeśli dodajesz produkt ręcznie, to warianty pojawią się po zapisaniu produktu
        </p>
      </div>
    );
  }

  const variantsArr: VariantsArr = product.variants.map((variant) => ({
    label: variant.variantSlug,
    value: variant.variantSlug,
  }));

  return (
    <div className="max-w-1/2 twp mx-[5px] my-auto h-fit w-full flex-1">
      <FieldLabel label="Wariant" />
      <VariantSelectClient variantsArr={variantsArr} path={path} />
    </div>
  );
};
