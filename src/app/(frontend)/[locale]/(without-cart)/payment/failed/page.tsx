const FailedPage = async ({ params }: { params: Promise<{ orderID: string }> }) => {
  const { orderID } = await params;
  return <div>Order failed, orderID: {orderID}</div>;
};
export default FailedPage;
