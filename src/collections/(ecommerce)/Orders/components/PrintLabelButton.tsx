import { Order } from "@/payload-types";
import { PrintLabelButtonClient } from "./PrintLabelButton.client";

export const PrintLabelButton = ({ data }: { data: Order }) => {
  return <PrintLabelButtonClient orderID={data.id} />;
};
