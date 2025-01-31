"use client";
import { NumberField, useForm } from "@payloadcms/ui";
import { type SanitizedFieldPermissions, type NumberFieldClient } from "payload";
import { useState } from "react";

export const ProductUnitPriceFieldClient = ({
  path,

  isFromAPI,
  field,
  schemaPath,
  permissions,
}: {
  path: string;
  unitPrice?: number;
  isFromAPI: boolean;
  field: Omit<NumberFieldClient, "type"> & Partial<Pick<NumberFieldClient, "type">>;
  schemaPath?: string;
  permissions?: SanitizedFieldPermissions;
}) => {
  const [unlocked, setUnlocked] = useState(false);
  const form = useForm();

  const handleUnlock = () => {
    if (isFromAPI) {
      setUnlocked(true);
      form.dispatchFields({
        type: "UPDATE",
        path: "products.1.autoprice",
        value: !unlocked,
      });
    } else {
      setUnlocked(!unlocked);
      form.dispatchFields({
        type: "UPDATE",
        path: "products.1.autoprice",
        value: !unlocked,
      });
    }
  };

  return (
    <div className="no-twp">
      <NumberField
        readOnly={!unlocked}
        field={field}
        path={path}
        schemaPath={schemaPath}
        permissions={permissions}
      />

      <p className="mt-2" onClick={handleUnlock}>
        {unlocked ? "Włącz auto-cenę" : "Wyłącz auto-cenę"}
      </p>
    </div>
  );
};
