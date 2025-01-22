import { Order } from "@/payload-types";
import { PrintLabelButtonClient } from "./PrintLabelButton.client";

export const PrintLabelButton = ({ data }: { data: Order }) => {
  const recieverData = data.shippingAddress;
  const selectedCourier = data.orderDetails?.shipping ?? "";
  return <PrintLabelButtonClient recieverData={recieverData} selectedCourier={selectedCourier} />;
};
