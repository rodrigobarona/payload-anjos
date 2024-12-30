import type { Access } from "payload";

export const adminOrPublished: Access = ({ req: { user } }) => {
  if (user && user.collection === "administrators") {
    return true;
  }

  return {
    _status: {
      equals: "published",
    },
  };
};
