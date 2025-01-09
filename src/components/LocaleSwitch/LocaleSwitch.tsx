import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { LocaleSwitchSelect } from "./LocaleSwitchSelect";
import { SelectItem } from "@/components/ui/select";

export default function LocaleSwitch() {
  const t = useTranslations("LocaleSwitch");
  const locale = useLocale();

  return (
    <LocaleSwitchSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <SelectItem key={cur} value={cur}>
          {t("locale", { locale: cur })}
        </SelectItem>
      ))}
    </LocaleSwitchSelect>
  );
}
