"use client";
import axios from "axios";

export const AdminResetPassword = () => {
  const handleResetPassword = async () => {
    const emailInput = document.getElementById("field-email") as HTMLInputElement;
    if (emailInput) {
      const email = emailInput.value;
      try {
        const res = await axios.post("/next/reset-password", { email });
        console.log(res);
      } catch (error) {}
    }
  };
  return (
    <a onClick={handleResetPassword} className="twp text-white">
      Resetuj hasło (podaj e-mail w formularzu)
    </a>
  );
};
