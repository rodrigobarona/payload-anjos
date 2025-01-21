import { Locale } from "@/i18n/config";
import { InpostCourier } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";

export const getCouriersArray = async (locale: Locale, withZones?: boolean) => {
  const deliveryMethods: {
    slug: string;
    title: string;
    turnaround: string;
    deliveryZones: InpostCourier["deliveryZones"] | null | undefined;
  }[] = [];

  // INPOST PACZKOMATY
  const {
    settings: parcelLockerSettings,
    enabled: parcelLockers,
    deliveryZones: parcelLockerDeliveryZones,
  } = await getCachedGlobal("inpost-pickup", locale, 1)();
  if (parcelLockers && parcelLockerSettings) {
    deliveryMethods.push({
      slug: "inpost-pickup",
      title: parcelLockerSettings.label,
      turnaround: parcelLockerSettings.description ?? "",
      deliveryZones: withZones ? parcelLockerDeliveryZones : undefined,
    });
  }

  // INPOST KURIER
  const {
    settings: courierSettings,
    enabled: courier,
    deliveryZones: courierDeliveryZones,
  } = await getCachedGlobal("inpost-courier", locale, 1)();
  if (courier && courierSettings) {
    deliveryMethods.push({
      slug: "inpost-courier",
      title: courierSettings.label,
      turnaround: courierSettings.description ?? "",
      deliveryZones: withZones ? courierDeliveryZones : undefined,
    });
  }

  // ADD OTHER COURIER INTEGRATIONS HERE, AND PUT THEM INTO deliveryMethods.

  return deliveryMethods;
};

// ADD OTHER COURIER SLUGS HERE
export const courierSlugsList = ["inpost-pickup", "inpost-courier"] as const;
export type CourierSlugs = typeof courierSlugsList;
