"use client";

import { useTranslation } from "@payloadcms/ui";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import {
  type CustomTranslationsKeys,
  type CustomTranslationsObject,
} from "@/admin/translations/custom-translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  {
    name: "January",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "February",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "March",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "April",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "June",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "July",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "August",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "September",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "October",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "November",
    orders: Math.floor(Math.random() * 1000) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "December",
    orders: Math.floor(Math.random() * 100) + 10,
    revenue: Math.floor(Math.random() * 5000) + 1000,
  },
];

export const OverviewChart = () => {
  const { t } = useTranslation<CustomTranslationsObject, CustomTranslationsKeys>();
  const chartConfig = {
    revenue: {
      label: t("adminDashboard:revenue"),
    },
    orders: {
      label: t("adminDashboard:orders"),
    },
  } satisfies ChartConfig;
  return (
    <Card className="twp rounded-xl border border-payload-elevation-150 bg-transparent lg:col-span-4">
      <CardHeader>
        <CardTitle>{t("adminDashboard:overview")}</CardTitle>
      </CardHeader>
      <CardContent className="mt-6">
        <ResponsiveContainer width="100%" height={500}>
          <ChartContainer config={chartConfig}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: string) => value.slice(0, 3)}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                cursor={false}
                labelClassName="text-payload-elevation-900"
                content={
                  <ChartTooltipContent className="border-payload-elevation-150 bg-payload-elevation-50 text-sm text-payload-elevation-900" />
                }
              />
              <Bar
                dataKey="revenue"
                fill="var(--theme-elevation-900)"
                stackId="a"
                className="fill-payload-elevation-900"
              />
              <Bar
                dataKey="orders"
                fill="var(--theme-elevation-600)"
                radius={[4, 4, 0, 0]}
                stackId="a"
                className="fill-payload-elevation-600"
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
