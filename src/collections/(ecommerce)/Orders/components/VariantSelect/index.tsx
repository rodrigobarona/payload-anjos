import { FieldLabel } from "@payloadcms/ui";
import { type TextFieldServerComponent } from "payload";

import { VariantSelectClient } from "./VariantSelect.client";

export type VariantsArr = {
  label: string | null | undefined;
  value: string | null | undefined;
}[];

export const VariantSelect: TextFieldServerComponent = async ({ path }) => {
  return (
    <div className="max-w-1/2 twp mx-[5px] my-auto h-fit w-full flex-1">
      <FieldLabel label="Wariant" />
      <VariantSelectClient path={path} />
    </div>
  );
};
