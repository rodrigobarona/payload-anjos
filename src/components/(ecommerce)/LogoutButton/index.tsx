"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import axios from "axios";
import { ReactNode } from "react";

export const LogoutButton = ({
  className,
  children,
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.post("/api/customers/logout");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={handleLogout} className={className} {...props}>
      {children}
    </Button>
  );
};
