const SuccessPage = async ({ params }: { params: Promise<{ orderID: string }> }) => {
  const { orderID } = await params;
  return <div>SuccessPage, orderID: {orderID}</div>;
};
export default SuccessPage;
