import { getPayload } from "payload";
import config from "@payload-config";
import { createInpostPickupPackage } from "@/lib/couriers/packages/createInpostPickupPackage";
import { isAxiosError } from "axios";

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config });
    const { orderID, dimension } = await req.json();

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

    let packageID: string | null | undefined = null;

    switch (order.orderDetails?.shipping) {
      case "inpost-pickup":
        packageID = await createInpostPickupPackage(order, dimension ?? "small");
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
