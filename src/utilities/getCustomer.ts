"use server";
import { unstable_cache } from "next/cache";
import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";

import config from "@payload-config";

export const getCustomer = async () => {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config });
        const headers = await getHeaders();

        const { user } = await payload.auth({
          headers,
        });

        if (!user || user.collection !== "customers") {
          return undefined;
        }

        return user;
      } catch (error) {
        console.error("Auth error:", error);
        return undefined;
      }
    },
    ["user-auth"],
    {
      revalidate: 1,
      tags: ["user-auth"],
    },
  )();
};
