import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { OverviewChart } from "../../OverviewChart";
import { OverviewLastOrders } from "../../OverviewLastOrders";

export const Overview = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="twp grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-xl border-payload-elevation-100 bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-payload-elevation-900">
            <CardTitle className="text-base font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-5 w-5 text-payload-elevation-900 opacity-75"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent className="text-payload-elevation-900">
            <div className="text-3xl font-bold">$45,231.89</div>
            <p className="mt-1 text-sm text-payload-elevation-900 opacity-75">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-payload-elevation-100 bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-payload-elevation-900">
            <CardTitle className="text-base font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-5 w-5 text-payload-elevation-900 opacity-75"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent className="text-payload-elevation-900">
            <div className="text-3xl font-bold">$45,231.89</div>
            <p className="mt-1 text-sm text-payload-elevation-900 opacity-75">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-payload-elevation-100 bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-payload-elevation-900">
            <CardTitle className="text-base font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-5 w-5 text-payload-elevation-900 opacity-75"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent className="text-payload-elevation-900">
            <div className="text-3xl font-bold">$45,231.89</div>
            <p className="mt-1 text-sm text-payload-elevation-900 opacity-75">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-payload-elevation-100 bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-payload-elevation-900">
            <CardTitle className="text-base font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-5 w-5 text-payload-elevation-900 opacity-75"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent className="text-payload-elevation-900">
            <div className="text-3xl font-bold">$45,231.89</div>
            <p className="mt-1 text-sm text-payload-elevation-900 opacity-75">+20.1% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-7">
        <OverviewChart />
        <OverviewLastOrders />
      </div>
    </section>
  );
};
