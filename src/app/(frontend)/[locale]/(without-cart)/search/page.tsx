const SearchPage = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
  const { search } = await searchParams;
  console.log(search);

  return <div>Results for {search}</div>;
};
export default SearchPage;
