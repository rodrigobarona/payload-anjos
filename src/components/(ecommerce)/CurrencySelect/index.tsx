"use client";

import { ShopSetting } from "@/payload-types";
import { FieldLabel, Select, useField } from "@payloadcms/ui";
import axios from "axios";
import { TextFieldClientComponent } from "payload";
import { useEffect, useState } from "react";

export const CurrencySelect: TextFieldClientComponent = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await axios.get<ShopSetting>("/api/globals/shopSettings");
        setOptions(
          data.availableCurrencies.map((currency) => ({
            label: currency,
            value: currency,
          })),
        );
      } catch (error) {
        setOptions([]);
      }
    };
    fetchOptions();
  }, []);

  return (
    <div className="twp my-auto h-fit flex-1">
      <FieldLabel label="Waluta" />
      <Select
        value={{
          label: value,
          value,
        }}
        onChange={(option: { value: string }) => setValue(option.value)}
        options={options}
      />
    </div>
  );
};
