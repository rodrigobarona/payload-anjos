"use client";

import { useCart } from "@/stores/CartStore";
import { useEffect } from "react";

const SynchronizeCart = () => {
  const { synchronizeCart } = useCart();
  useEffect(() => {
    synchronizeCart();
  }, []);
  return <></>;
};
export default SynchronizeCart;
