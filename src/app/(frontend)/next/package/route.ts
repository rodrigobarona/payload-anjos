import { getPayload } from "payload";
import config from "@payload-config";
import { headers as getHeaders } from "next/headers";
import { createInpostPickupPackage } from "@/lib/couriers/packages/createInpostPickupPackage";
import { isAxiosError } from "axios";
import { createInpostCourierPackage } from "@/lib/couriers/packages/createInpostCourierPackage";
import { createInpostCODCourierPackage } from "@/lib/couriers/packages/createInpostCODCourierPackage";
import { createCouriers } from "@/globals/(ecommerce)/Couriers/utils/couriersConfig";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/config";

export type Dimensions = { width: number; height: number; length: number; weight: number };

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config });
    /**
     * dimension - for inpost-pickup, string (small, medium, large). Exact dimensions not needed there.
     * dimensions - for inpost-courier, object { width: number, height: number, length: number, weight: number }
     */
    const {
      orderID,
      dimension,
      dimensions,
    }: {
      orderID: string;
      dimension: string;
      dimensions: Dimensions;
    } = await req.json();

    if (!orderID) {
      return Response.json("Cannot find order ID", { status: 400 });
    }

    const headers = await getHeaders();
    const { user } = await payload.auth({ headers });

    const locale = (await getLocale()) as Locale;

    if (!user || user?.collection !== "administrators") {
      return Response.json("Unauthorized", { status: 401 });
    }

    const order = await payload.findByID({
      collection: "orders",
      id: orderID,
    });

    if (!order) {
      return Response.json("Cannot find order", { status: 400 });
    }

    const courier = createCouriers(locale).find((c) => c.key === order.orderDetails?.shipping);
    const packageID = courier ? await courier.createPackage(order, dimension, dimensions) : null;

    if (!packageID) {
      return Response.json("Cannot create package", { status: 400 });
    }

    return Response.json(`${packageID}`, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      console.log();
      return Response.json(
        `${error.response?.data.message} \n
        Error details: ${JSON.stringify(error.response?.data.details)}`,
        { status: 400 },
      );
    } else {
      console.log(error);
      return Response.json("No file found", { status: 400 });
    }
  }
}
