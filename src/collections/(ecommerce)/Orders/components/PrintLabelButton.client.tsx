"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@payloadcms/ui";
import axios from "axios";
import { useState } from "react";

export const PrintLabelButtonClient = ({ orderID }: { orderID: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dimension, setDimension] = useState("small");

  const handleDimensionChange = (option: { value: string }) => {
    setDimension(option.value);
  };

  const inPostDimensions = [
    {
      label: "A (8 x 38 x 64 cm)",
      value: "small",
    },
    {
      label: "B (19 x 38 x 64 cm)",
      value: "medium",
    },
    {
      label: "C (41 x 38 x 64 cm)",
      value: "large",
    },
    {
      label: "[Courier only] D (50 x 50 x 80 cm)",
      value: "xlarge",
    },
  ];

  const generateShippingLabel = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/next/courierLabel?orderID=${orderID}&dimension=${dimension}`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${orderID}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data instanceof Blob) {
        const text = await error.response.data.text();
        const errorData = JSON.parse(text);
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

  return (
    <>
      <div className="twp flex h-[38px] w-full gap-4">
        <Select
          value={{
            value: dimension,
            label: inPostDimensions.find((option) => option.value === dimension)?.label,
          }}
          onChange={handleDimensionChange}
          options={inPostDimensions}
          className="h-full min-h-full w-3/4"
        />
        <Button className="twp h-full flex-1 text-base" onClick={generateShippingLabel}>
          {isLoading ? "Generowanie..." : "Pobierz etykietę"}
        </Button>
      </div>
      <p className="twp mt-3 text-red-600">{error}</p>
    </>
  );
};
