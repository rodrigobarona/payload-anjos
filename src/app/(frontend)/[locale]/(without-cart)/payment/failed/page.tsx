const FailedPage = async ({ searchParams }: { searchParams: Promise<{ orderID: string }> }) => {
  const { orderID } = await searchParams;

  return <div>Order failed, orderID: {orderID}</div>;
};
export default FailedPage;
