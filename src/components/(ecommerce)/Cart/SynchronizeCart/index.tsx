"use client";

import { useEffect } from "react";

import { useCart } from "@/stores/CartStore";

const SynchronizeCart = () => {
  const { synchronizeCart } = useCart();
  useEffect(() => {
    void synchronizeCart();
  }, [synchronizeCart]);
  return <></>;
};
export default SynchronizeCart;
