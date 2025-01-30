import { type ReactNode } from "react";

import { SynchronizeCart } from "@/components/(ecommerce)/Cart/SynchronizeCart";
import { Cart } from "@/globals/(ecommerce)/Layout/Cart/Component";
import { Header } from "@/globals/Header/Component";

const CartLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SynchronizeCart />
      <Header />
      <Cart />
      {children}
    </>
  );
};
export default CartLayout;
