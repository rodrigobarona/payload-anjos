import type { CollectionBeforeOperationHook } from "payload";

export const generateID: CollectionBeforeOperationHook = async ({ args, operation, req }) => {
  if (operation === "create") {
    console.log(args);
  }

  return args;
};
