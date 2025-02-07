"use client";

import { Select, useField, useForm, useTranslation } from "@payloadcms/ui";
import axios, { isAxiosError } from "axios";
import { useState } from "react";

import {
  type CustomTranslationsKeys,
  type CustomTranslationsObject,
} from "@/admin/translations/custom-translations";
import { Button } from "@/components/ui/button";
import { cn } from "@/utilities/cn";

import { getShippingLabel } from "../../utils/getShippingLabel";

export const PickupShipmentMenuClient = ({ orderID }: { orderID: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const { value: dimension, setValue: setDimension } = useField<string>({ path: "printLabel.dimension" });

  const { value } = useField<string>({ path: "printLabel.packageNumber" });

  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

  const handleDimensionChange = (option: { value: string }) => {
    setDimension(option.value);
  };

  const form = useForm();

  const inPostDimensions = [
    {
      label: "A (8 x 38 x 64 cm), 25kg limit",
      value: "small",
    },
    {
      label: "B (19 x 38 x 64 cm), 25kg limit",
      value: "medium",
    },
    {
      label: "C (41 x 38 x 64 cm), 25kg limit",
      value: "large",
    },
  ];

  const createPackage = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post<string>(`/next/package`, {
        orderID,
        dimension,
      });

      await form.submit({ skipValidation: true, overrides: { printLabel: { packageNumber: data } } });
    } catch (error) {
      if (isAxiosError(error) && error.response?.data) {
        const errorData = JSON.stringify(error.response.data);
        console.log("Error:", errorData);
        setError(errorData || "Error downloading file");
      } else {
        console.log("Unknown error:", error);
        setError("Unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPackage = async () => {
    try {
      await form.submit({ skipValidation: true, overrides: { printLabel: { packageNumber: "" } } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="twp flex w-full flex-col gap-4 md:flex-row lg:flex-col xl:flex-row">
        <div className="min-h-[38px] md:w-2/3 lg:w-full xl:w-2/3">
          <Select
            value={{
              value: dimension,
              label: inPostDimensions.find((option) => option.value === dimension)?.label,
            }}
            onChange={handleDimensionChange}
            options={inPostDimensions}
            className="min-h-[38px]"
          />
          <p className="mt-3">{t("custom:inPostMessage")}</p>
        </div>
        <Button
          disabled={Boolean(value) && value?.length > 0}
          className={cn(
            "twp min-h-[38px] flex-1 text-base md:w-1/6 lg:w-full xl:w-1/6",
            (value?.length > 0 || isLoading) && "pointer-events-none cursor-not-allowed opacity-50",
          )}
          onClick={createPackage}
        >
          {isLoading ? t("custom:generating") : t("custom:createPackage")}
        </Button>
        <div className="flex flex-col md:w-1/6 lg:w-full xl:w-1/6">
          <Button
            disabled={!value}
            className={cn(
              "twp max-h-[38px] min-h-[38px] flex-1 text-base",
              (!value || isDownloading) && "pointer-events-none cursor-not-allowed opacity-50",
            )}
            onClick={() => getShippingLabel({ setIsDownloading, setError, orderID })}
          >
            {isDownloading ? t("custom:downloadingLabel") : t("custom:downloadLabel")}
          </Button>

          <Button variant="link" onClick={handleResetPackage} disabled={!value} className="mt-2 pl-0">
            {t("custom:resetPackage")}
          </Button>
        </div>
      </div>
      <p className="twp mt-3 text-red-600">{error}</p>
    </>
  );
};
