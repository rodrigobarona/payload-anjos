import { getPayload } from "payload";
import config from "@payload-config";
import { headers as getHeaders } from "next/headers";
import { isAxiosError } from "axios";
import { getInpostPickupLabel } from "@/lib/couriers/labels/getInpostPickupLabel";

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

    let file: ArrayBuffer | null | undefined = null;

    switch (order.orderDetails?.shipping) {
      case "inpost-pickup":
        file = await getInpostPickupLabel(order.printLabel?.packageNumber ?? "");
        break;
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
