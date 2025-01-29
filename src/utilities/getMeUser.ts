 
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getClientSideURL } from "./getURL";

import type { Administrator } from "@/payload-types";

export const getMeUser = async (args?: {
  nullUserRedirect?: string;
  validUserRedirect?: string;
}): Promise<{
  token: string;
  user: Administrator;
}> => {
  const { nullUserRedirect, validUserRedirect } = args ?? {};
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token")?.value;

  const meUserReq = await fetch(`${getClientSideURL()}/api/administrators/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  const {
    user,
  }: {
    user: Administrator;
  } = (await meUserReq.json()) as { user: Administrator };

  if (validUserRedirect && meUserReq.ok && user) {
    redirect(validUserRedirect);
  }

  if (nullUserRedirect && (!meUserReq.ok || !user)) {
    redirect(nullUserRedirect);
  }

  // Token will exist here because if it doesn't the user will be redirected
  return {
    token: token!,
    user,
  };
};
