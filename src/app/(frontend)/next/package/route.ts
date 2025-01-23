import { getPayload } from "payload";
import config from "@payload-config";
import { headers as getHeaders } from "next/headers";
import { createInpostPickupPackage } from "@/lib/couriers/packages/createInpostPickupPackage";
import { isAxiosError } from "axios";
import { createInpostCourierPackage } from "@/lib/couriers/packages/createInpostCourierPackage";

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

    let packageID: string | null | undefined = null;

    switch (order.orderDetails?.shipping) {
      case "inpost-pickup":
        packageID = await createInpostPickupPackage(order, dimension);
        break;
      case "inpost-courier":
        packageID = await createInpostCourierPackage(order, dimensions);
        break;
    }

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
