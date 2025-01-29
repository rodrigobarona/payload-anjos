"use client";
import { CustomTranslationsKeys, CustomTranslationsObject } from "@/admin/translations/custom-translations";
import { useTranslation } from "@payloadcms/ui";
import axios from "axios";
import { useState } from "react";

export const AdminResetPassword = () => {
  const [message, setMessage] = useState("");
  const handleResetPassword = async () => {
    setMessage("");
    const emailInput = document.getElementById("field-email") as HTMLInputElement;
    if (emailInput) {
      const email = emailInput.value;
      try {
        const res = await axios.post("/next/reset-password", { email });
        console.log(res);
        if (res.status === 200) {
          setMessage(t("custom:resetPasswordSuccess"));
        }
      } catch (error) {
        setMessage(t("custom:resetPasswordError"));
      }
    }
  };
  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();
  return (
    <div className="twp">
      <a onClick={handleResetPassword} className="cursor-pointer text-foreground">
        {t("custom:resetPassword")}
      </a>
      <p className="mt-3 text-foreground opacity-85">{message}</p>
    </div>
  );
};
