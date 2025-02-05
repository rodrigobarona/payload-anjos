import { type PayloadRequest, type Where } from "payload";

export type RevenueResponse = {
  totalRevenue: number;
  percentage: number;
};

export const getRevenue = async (req: PayloadRequest) => {
  try {
    const payload = req.payload;

    if (req.method !== "POST") {
      return Response.json({ message: "Method not allowed" }, { status: 405 });
    }

    if (req.user?.collection !== "administrators") {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const dates = req.json && ((await req.json()) as { dateFrom?: string; dateTo?: string });

    const dateFrom = dates?.dateFrom && new Date(dates.dateFrom).setHours(0, 0, 0, 0);
    const dateTo = dates?.dateTo && new Date(dates.dateTo).setHours(23, 59, 59, 999);

    const dateFromISO = dateFrom && new Date(dateFrom).toISOString();
    const dateToISO = dateTo && new Date(dateTo).toISOString();

    let whereQuery: Where | undefined = undefined;

    if (dateFromISO && !dateToISO) {
      whereQuery = {
        createdAt: {
          greater_than_equal: dateFromISO,
        },
      };
    } else if (dateToISO && !dateFromISO) {
      whereQuery = {
        createdAt: {
          less_than_equal: dateToISO,
        },
      };
    } else if (dateFromISO && dateToISO) {
      whereQuery = {
        createdAt: {
          greater_than_equal: dateFromISO,
          less_than_equal: dateToISO,
        },
      };
    }

    const { docs } = await payload.find({
      collection: "orders",
      depth: 1,
      pagination: false,
      select: {
        orderDetails: {
          total: true,
        },
      },
      ...((whereQuery && { where: whereQuery }) ?? {}),
    });

    const totalRevenue = Number(
      docs
        .reduce((acc: number, doc: { orderDetails: { total: number } }) => {
          return acc + doc.orderDetails.total;
        }, 0)
        .toFixed(2),
    );
    return Response.json(
      {
        totalRevenue,
        percentage: 20.1,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
