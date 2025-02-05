import { type PayloadRequest, type Where } from "payload";

export type OrderCountResponse = {
  total: number;
  percentage: number;
};

export const getOrderCount = async (req: PayloadRequest) => {
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

    const { totalDocs } = await payload.find({
      collection: "orders",
      depth: 1,
      pagination: false,
      select: {},
      ...((whereQuery && { where: whereQuery }) ?? {}),
    });

    return Response.json(
      {
        total: totalDocs,
        percentage: 20.1,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
};
