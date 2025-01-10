import type { AccessArgs } from "payload";

import type { Administrator } from "@/payload-types";

type isAuthenticated = (args: AccessArgs<Administrator>) => boolean;

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user?.collection === "administrators");
};
