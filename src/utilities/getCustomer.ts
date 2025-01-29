"use server";
import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";

import config from "@payload-config";

export const getCustomer = async () => {
  const payload = await getPayload({ config });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  // if admin or unauthorized it returns false, if customer it returns the user
  if (user && user.collection === "customers") {
    return user;
  } else {
    return undefined;
  }
};
