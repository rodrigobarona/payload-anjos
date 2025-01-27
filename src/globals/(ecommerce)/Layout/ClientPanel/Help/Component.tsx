import RichText from "@/components/RichText";
import { Locale } from "@/i18n/config";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getLocale } from "next-intl/server";

export const ClientHelp = async () => {
  const locale = (await getLocale()) as Locale;
  const { clientPanel } = await getCachedGlobal("shopLayout", locale, 1)();
  return (
    <>
      <h2>{clientPanel.help?.title}</h2>
      <RichText data={clientPanel.help?.content} />
    </>
  );
};
