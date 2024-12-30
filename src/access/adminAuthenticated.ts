import type { AccessArgs } from "payload";

import type { Administrator } from "@/payload-types";

type isAuthenticated = (args: AccessArgs<Administrator>) => boolean;

export const adminAuthenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user && user.collection === "administrators");
};
