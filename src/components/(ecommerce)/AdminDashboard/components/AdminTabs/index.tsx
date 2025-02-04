"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminTabs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("view", value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs defaultValue="overview" onValueChange={handleValueChange}>
      <TabsList className="h-fit rounded-lg bg-payload-elevation-100 p-1.5 text-base">
        <TabsTrigger
          className="rounded-lg px-3.5 text-base text-payload-elevation-900 data-[state=active]:bg-payload-backgroundColor"
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="rounded-lg text-base text-payload-elevation-900 data-[state=active]:bg-payload-backgroundColor"
          value="analytics"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          className="rounded-lg text-base text-payload-elevation-900 data-[state=active]:bg-payload-backgroundColor"
          value="reports"
        >
          Reports
        </TabsTrigger>
        <TabsTrigger
          className="rounded-lg text-base text-payload-elevation-900 data-[state=active]:bg-payload-backgroundColor"
          value="notifications"
        >
          Notifications
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
