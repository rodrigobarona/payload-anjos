import { isAxiosError } from "axios";
import { headers as getHeaders } from "next/headers";
import { getLocale } from "next-intl/server";
import { getPayload } from "payload";

import { createCouriers } from "@/globals/(ecommerce)/Couriers/utils/couriersConfig";
import { type Locale } from "@/i18n/config";
import config from "@payload-config";

export async function GET(req: Request) {
  try {
    const payload = await getPayload({ config });
    const { searchParams } = new URL(req.url);
    const orderID = searchParams.get("orderID");

    const headers = await getHeaders();
    const { user } = await payload.auth({ headers });

    if (!user || user?.collection !== "administrators") {
      return Response.json("Unauthorized", { status: 401 });
    }

    if (!orderID) {
      return Response.json("Cannot find order ID", { status: 400 });
    }

    const order = await payload.findByID({
      collection: "orders",
      id: orderID,
    });

    if (!order) {
      return Response.json("Cannot find order", { status: 400 });
    }

    const locale = (await getLocale()) as Locale;

    const courier = createCouriers(locale).find((c) => c.key === order.orderDetails?.shipping);

    const file: ArrayBuffer | null | undefined = courier
      ? await courier.getLabel(order.printLabel?.packageNumber ?? "")
      : null;

    if (!file) {
      return Response.json("Cannot find file, check if printing labels is configured properly.", {
        status: 400,
      });
    }

    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${orderID}.pdf"`,
      },
    });
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
