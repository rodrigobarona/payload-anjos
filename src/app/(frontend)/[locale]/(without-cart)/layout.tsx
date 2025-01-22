import { Header } from "@/globals/Header/Component";
import { ReactNode } from "react";

const WithoutCartLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header disableCart />
      {children}
    </>
  );
};
export default WithoutCartLayout;
