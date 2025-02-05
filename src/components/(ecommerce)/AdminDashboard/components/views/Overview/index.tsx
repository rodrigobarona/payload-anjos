"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { OverviewChart } from "../../OverviewChart";
import { OverviewLastOrders } from "../../OverviewLastOrders";
import { type SetStateAction, type Dispatch, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { RevenueResponse } from "@/endpoints/adminDashboard/getRevenue";
import { useSearchParams } from "next/navigation";
import { animate } from "motion/react";
import { OrderCountResponse } from "@/endpoints/adminDashboard/getOrderCount";
import { subDays, format } from "date-fns";
import { Currency } from "@/stores/Currency/types";

export const Overview = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [rangedOrders, setRangedOrders] = useState(0);
  const [rangedRevenue, setRangedRevenue] = useState(0);

  const [currency, setCurrency] = useState<Currency | null>(null);

  const searchParams = useSearchParams();
  const dateFrom = searchParams.get("from") ?? format(subDays(new Date(), 30), "yyyy-MM-dd");
  const dateTo = searchParams.get("to") ?? format(new Date(), "yyyy-MM-dd");

  const fetchOrderCount = useCallback(
    async (
      orderCount: number,
      setOrderCount: Dispatch<SetStateAction<number>>,
      requestData?: { dateFrom?: string; dateTo?: string },
    ) => {
      const { data } = await axios.post<OrderCountResponse>("/api/orders/count", requestData ?? {}, {
        withCredentials: true,
      });
      const animation = animate(orderCount, data.total, {
        duration: 1,
        onUpdate: (value) => setOrderCount(Math.round(value)),
        onComplete: () => setOrderCount(data.total),
      });

      return () => animation.stop();
    },
    [],
  );

  const fetchRevenue = useCallback(
    async (
      revenue: number,
      setRevenue: Dispatch<SetStateAction<number>>,
      requestData?: { dateFrom?: string; dateTo?: string },
    ) => {
      const { data } = await axios.post<RevenueResponse>("/api/orders/revenue", requestData ?? {}, {
        withCredentials: true,
      });
      const animation = animate(revenue, data.totalRevenue, {
        duration: 1,
        onUpdate: (value) => setRevenue(Math.round(value)),
        onComplete: () => setRevenue(data.totalRevenue),
      });

      return () => animation.stop();
    },
    [],
  );

  useEffect(() => {
    void fetchRevenue(totalRevenue, setTotalRevenue);
  }, []);

  useEffect(() => {
    void fetchRevenue(rangedRevenue, setRangedRevenue, { dateFrom, dateTo });
  }, [dateFrom, dateTo]);

  useEffect(() => {
    void fetchOrderCount(totalOrders, setTotalOrders);
  }, []);

  useEffect(() => {
    void fetchOrderCount(rangedOrders, setRangedOrders, { dateFrom, dateTo });
  }, [dateFrom, dateTo]);

  return (
    <section className="flex flex-col gap-6">
      <div className="twp grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="rounded-xl border-payload-elevation-150 bg-transparent">
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
            <div className="text-3xl font-bold">{totalRevenue}</div>
            <p className="mt-1 text-sm text-payload-elevation-900 opacity-75">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-payload-elevation-150 bg-transparent">
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
            <div className="text-3xl font-bold">{rangedRevenue}</div>
            <p className="mt-1 text-sm text-payload-elevation-900 opacity-75">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-payload-elevation-150 bg-transparent">
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
            <div className="text-3xl font-bold">{totalOrders}</div>
            <p className="mt-1 text-sm text-payload-elevation-900 opacity-75">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-payload-elevation-150 bg-transparent">
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
            <div className="text-3xl font-bold">{rangedOrders}</div>
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
