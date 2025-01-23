import { Locale } from "@/i18n/config";
import { Order } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import axios, { isAxiosError } from "axios";
import { getLocale } from "next-intl/server";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getInpostPickupLabel = async (order: Order, dimension: string) => {
  const locale = (await getLocale()) as Locale;
  const inpostPickupSettings = await getCachedGlobal("inpost-pickup", locale, 1)();
  const fulfilment = await getCachedGlobal("fulfilment", locale, 1)();
  const { APIUrl, shipXAPIKey, clientId } = inpostPickupSettings;
  const { shopAddress } = fulfilment;
  const { shippingAddress } = order;

  const addressParts = shopAddress.address.split(" ");
  const building_number = addressParts[addressParts.length - 1];
  const street = addressParts.slice(0, -1).join(" ");

  if (!shippingAddress) {
    throw new Error("No shipping address found");
  }

  const { data } = await axios.post(
    `${APIUrl}/v1/organizations/${clientId}/shipments`,
    {
      sender: {
        company_name: shopAddress.name,
        email: shopAddress.email,
        phone: shopAddress.phone,
        address: {
          street,
          building_number,
          city: shopAddress.city,
          post_code: shopAddress.postalCode,
          country_code: shopAddress.country.toUpperCase(),
        },
      },
      receiver: {
        ...(order.invoice?.isCompany
          ? { company_name: shippingAddress.name }
          : {
              first_name: shippingAddress.name.split(" ")[0],
              last_name: shippingAddress.name.split(" ").slice(1).join(" "),
            }),
        email: shippingAddress.email,
        phone: shippingAddress.phone,
      },
      parcels: {
        template: dimension,
      },
      custom_attributes: {
        target_point: shippingAddress.pickupPointID,
      },
      service: "inpost_locker_standard",
      reference: order.id,
    },
    {
      headers: {
        Authorization: `Bearer ${shipXAPIKey}`,
      },
    },
  );
  const packageID = data.id;

  const checkShipmentStatus = async (maxAttempts = 10): Promise<string> => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const { data: shipmentData } = await axios.get(`${APIUrl}/v1/shipments/${packageID}`, {
        headers: {
          Authorization: `Bearer ${shipXAPIKey}`,
        },
      });
      if (shipmentData.status === "confirmed") {
        return packageID;
      }

      await wait(2000);
    }

    throw new Error("Timeout waiting for shipment confirmation");
  };

  await checkShipmentStatus();

  const { data: label } = await axios.get(`${APIUrl}/v1/shipments/${packageID}/label?type=A6`, {
    headers: {
      Authorization: `Bearer ${shipXAPIKey}`,
    },
    responseType: "arraybuffer",
  });

  return label;
};
