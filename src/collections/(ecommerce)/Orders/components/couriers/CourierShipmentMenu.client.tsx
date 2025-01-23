"use client";

import { CustomTranslationsKeys, CustomTranslationsObject } from "@/admin/translations/custom-translations";
import { Button } from "@/components/ui/button";
import { cn } from "@/utilities/cn";
import { FieldLabel, Select, TextInput, useField, useForm, useTranslation } from "@payloadcms/ui";
import axios from "axios";
import { useState } from "react";
import { getShippingLabel } from "../../utils/getShippingLabel";
import { Dimensions } from "@/app/(frontend)/next/package/route";
import { Input } from "@/components/ui/input";
import { AdminInput } from "@/components/ui/AdminInput";

export const CourierShipmentMenuClient = ({ orderID }: { orderID: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const { value: width, setValue: setWidth } = useField<number>({ path: "printLabel.width" });
  const { value: height, setValue: setHeight } = useField<number>({ path: "printLabel.height" });
  const { value: length, setValue: setLength } = useField<number>({ path: "printLabel.length" });
  const { value: weight, setValue: setWeight } = useField<number>({ path: "printLabel.weight" });

  const dimensions: Dimensions = { width, height, length, weight };

  const { value } = useField<string>({ path: "printLabel.packageNumber" });

  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();

  const form = useForm();

  const createPackage = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post<string>(`/next/package`, {
        orderID,
        dimensions,
      });

      await form.submit({ skipValidation: true, overrides: { printLabel: { packageNumber: data } } });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
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

  const onSubmit = () => {};

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
          <form className="grid flex-1 grid-cols-2 gap-4 md:flex lg:grid xl:flex">
            <div className="flex-1">
              <FieldLabel htmlFor="width" label="Szerokość [mm]" />
              <AdminInput
                type="number"
                id="width"
                value={width ?? 0}
                onChange={(e) => {
                  setWidth(e.target.value ? Number(e.target.value) : 0);
                }}
              />
            </div>
            <div className="flex-1">
              <FieldLabel htmlFor="height" label="Wysokość [mm]" />
              <AdminInput
                type="number"
                id="height"
                value={height ?? 0}
                onChange={(e) => {
                  setHeight(e.target.value ? Number(e.target.value) : 0);
                }}
              />
            </div>
            <div className="flex-1">
              <FieldLabel htmlFor="length" label="Długość [mm]" />
              <AdminInput
                type="number"
                id="length"
                value={length ?? 0}
                onChange={(e) => {
                  setLength(e.target.value ? Number(e.target.value) : 0);
                }}
              />
            </div>
            <div className="flex-1">
              <FieldLabel htmlFor="weight" label="Waga [kg]" />
              <AdminInput
                type="number"
                id="weight"
                value={weight ?? 0}
                onChange={(e) => {
                  setWeight(e.target.value ? Number(e.target.value) : 0);
                }}
              />
            </div>
          </form>
          <p className="mt-3">{t("custom:inPostMessage")}</p>
        </div>
        <Button
          disabled={Boolean(value) && value.length > 0}
          className={cn(
            "twp mt-7 min-h-[38px] flex-1 text-base md:w-1/6 lg:w-full xl:w-1/6",
            ((value && value.length > 0) || isLoading) && "pointer-events-none cursor-not-allowed opacity-50",
          )}
          onClick={createPackage}
        >
          {isLoading ? t("custom:generating") : t("custom:createPackage")}
        </Button>
        <div className="mt-7 flex flex-col md:w-1/6 lg:w-full xl:w-1/6">
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
