import { Locale } from "@/i18n/config";
import { Order } from "@/payload-types";
import { getPayload } from "payload";
import config from "@payload-config";
import { getCachedGlobal } from "@/utilities/getGlobals";
import axios from "axios";
import { getLocale } from "next-intl/server";
import { Dimensions } from "@/app/(frontend)/next/package/route";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createInpostCourierPackage = async (order: Order, dimension: Dimensions) => {
  const locale = (await getLocale()) as Locale;
  const inpostCourierSettings = await getCachedGlobal("inpost-courier", locale, 1)();
  const fulfilment = await getCachedGlobal("fulfilment", locale, 1)();
  const { APIUrl, shipXAPIKey, clientId } = inpostCourierSettings;
  const { shopAddress } = fulfilment;
  const { shippingAddress } = order;

  const payload = await getPayload({ config });

  const addressParts = shopAddress.address.split(" ");
  const building_number = addressParts[addressParts.length - 1];
  const street = addressParts.slice(0, -1).join(" ");

  const shippingAddressParts = shippingAddress.address.split(" ");
  const shippingBuildingNumber = addressParts[addressParts.length - 1];
  const shippingStreet = addressParts.slice(0, -1).join(" ");

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
        address: {
          street: shippingStreet,
          building_number: shippingBuildingNumber,
          city: shippingAddress.city,
          post_code: shippingAddress.postalCode,
          country_code: shippingAddress.country.toUpperCase(),
        },
      },
      parcels: [
        {
          id: order.id,
          dimensions: {
            width: dimension.width,
            height: dimension.height,
            length: dimension.length,
            unit: "mm",
          },
          weight: {
            amount: dimension.weight,
            unit: "kg",
          },
          is_non_standard: false,
        },
      ],
      service: "inpost_courier_standard",
      reference: order.id,
    },
    {
      headers: {
        Authorization: `Bearer ${shipXAPIKey}`,
      },
    },
  );

  const packageID: string = data.id;

  const checkShipmentStatus = async (maxAttempts = 10): Promise<string> => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const { data: shipmentData } = await axios.get(`${APIUrl}/v1/shipments/${packageID}`, {
        headers: {
          Authorization: `Bearer ${shipXAPIKey}`,
        },
      });
      console.log(shipmentData);
      if (shipmentData.status === "confirmed" && shipmentData.tracking_number) {
        await payload.update({
          id: order.id,
          collection: "orders",
          data: {
            orderDetails: {
              trackingNumber: shipmentData.tracking_number,
            },
            printLabel: {
              packageNumber: packageID,
            },
          },
        });

        return packageID;
      }

      await wait(2000);
    }

    throw new Error("Timeout waiting for shipment confirmation");
  };

  await checkShipmentStatus();

  return packageID;
};
