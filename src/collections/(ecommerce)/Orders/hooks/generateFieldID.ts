import { FieldHook, getPayload } from "payload";
import config from "@payload-config";

export const generateFieldID: FieldHook = async ({ value }) => {
  if (!value) {
    const payload = await getPayload({ config });
    let attempts = 0;
    let uniqueFound = false;

    while (!uniqueFound && attempts < 5) {
      const lastOrder = await payload.find({
        collection: "orders",
        sort: "-id",
        limit: 1,
      });

      const lastID = lastOrder.docs[0]?.id ?? "00000000";
      const newID = (parseInt(lastID) + 1).toString().padStart(8, "0");

      const existing = await payload.find({
        collection: "orders",
        where: {
          id: { equals: newID },
        },
      });

      if (existing.docs.length === 0) {
        value = newID;
        uniqueFound = true;
      }

      attempts++;
    }

    if (!uniqueFound) {
      throw new Error("Could not generate unique ID");
    }
  }
  return value;
};
