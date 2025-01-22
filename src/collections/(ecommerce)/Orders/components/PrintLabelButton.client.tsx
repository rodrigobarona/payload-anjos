"use client";
import { Order } from "@/payload-types";
import { Button, useTranslation } from "@payloadcms/ui";
import axios from "axios";
import { useState } from "react";

export const PrintLabelButtonClient = ({
  recieverData,
  selectedCourier,
}: {
  recieverData: Order["shippingAddress"];
  selectedCourier: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const generateShippingLabel = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/media/file/flip-flops.jpg", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "image/jpeg" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "flip-flops.jpg");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setIsLoading(false);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setIsLoading(false);
      console.error("Error downloading file:", error);
    }
  };

  return <Button onClick={generateShippingLabel}>{isLoading ? "Generowanie..." : "Generuj etykietę"}</Button>;
};
