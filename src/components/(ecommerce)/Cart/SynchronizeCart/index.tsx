"use client";

import { useEffect } from "react";

import { useCart } from "@/stores/CartStore";

const SynchronizeCart = () => {
  const { synchronizeCart } = useCart();
  useEffect(() => {
    synchronizeCart();
  }, []);
  return <></>;
};
export default SynchronizeCart;
