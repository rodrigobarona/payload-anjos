"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  {
    name: "January",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "February",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "March",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "April",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "June",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "July",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "August",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "September",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "October",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "November",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "December",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

const chartConfig = {
  total: {
    label: "Total",
    theme: {
      light: "var(--theme-elevation-0)",
      dark: "var(--theme-elevation-900)",
    },
  },
} satisfies ChartConfig;

export const OverviewChart = () => {
  return (
    <Card className="twp rounded-xl border border-payload-elevation-150 bg-transparent lg:col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
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
              <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
