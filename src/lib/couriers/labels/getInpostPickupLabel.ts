import { Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";
import axios from "axios";
import { getLocale } from "next-intl/server";

export const getInpostPickupLabel = async (packageID: string) => {
  const locale = (await getLocale()) as Locale;
  const inpostPickupSettings = await getCachedGlobal("inpost-pickup", locale, 1)();
  const { APIUrl, shipXAPIKey } = inpostPickupSettings;

  const { data } = await axios.get(`${APIUrl}/v1/shipments/${packageID}/label?type=A6`, {
    headers: {
      Authorization: `Bearer ${shipXAPIKey}`,
    },
    responseType: "arraybuffer",
  });
  console.log(packageID);
  console.log(data);

  return data;
};
