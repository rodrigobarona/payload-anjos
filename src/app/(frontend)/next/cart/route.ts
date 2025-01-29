import { getPayload } from "payload";
import config from "@payload-config";
import { Cart } from "@/stores/CartStore/types";
import { getCustomer } from "@/utilities/getCustomer";

export async function POST(req: Request) {
  try {
    const contentLength = req.headers.get("content-length");
    if (!contentLength || contentLength === "0") {
      return Response.json(JSON.stringify({ error: "Empty request body" }), { status: 400 });
    }

    let cart: Cart | undefined;
    try {
      cart = await req.json();
    } catch (parseError) {
      return Response.json(JSON.stringify({ error: "Invalid JSON in request body" }), { status: 400 });
    }

    const user = await getCustomer();

    if (!cart || !user) {
      return Response.json({ status: 400 });
    }

    const payload = await getPayload({ config });

    await payload.update({
      collection: "customers",
      id: user.id,
      data: {
        cart: JSON.stringify(cart),
      },
    });

    return Response.json({ status: 200, message: "Cart saved successfully" });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ status: 500, message: "Internal server error" }), { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getCustomer();

    if (!user) {
      return Response.json({ status: 400 });
    }

    return Response.json({
      status: 200,
      data: typeof user.cart === "string" ? JSON.parse(user.cart) : user.cart,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ status: 500, message: "Internal server error" }), { status: 500 });
  }
}
