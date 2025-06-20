import React from "react";
import { ChartPart } from "./chart-part";
import { StatCard } from "@/components/core/stat-card";
export default function Page() {
  const mockStats = [
    {
      id: "total-buyers",
      icon: "Users",
      value: "37k",
      trend: {
        direction: "up" as const,
        percentage: 12,
      },
      title: "Registered Sellers",
      description: "0.5k increase than last 7 days",
    },
    {
      id: "total-revenue",
      icon: "DollarSign",
      value: "14k",
      trend: {
        direction: "up" as const,
        percentage: 8,
      },
      title: "Registered Buyers",
      description: "$12k increase than last month",
    },
    {
      id: "active-users",
      icon: "UserCheck",
      value: "2.4k",
      trend: {
        direction: "down" as const,
        percentage: 3,
      },
      title: "Active Users",
      description: "120 decrease than yesterday",
    },
    {
      id: "conversion-rate",
      icon: "TrendingUp",
      value: "32k",
      trend: {
        direction: "up" as const,
        percentage: 15,
      },
      title: "Listing Created",
      description: "0.4% increase than last week",
    },
    {
      id: "bounce-rate",
      icon: "MousePointer",
      value: "23k",
      trend: {
        direction: "down" as const,
        percentage: 5,
      },
      title: "Active Listings",
      description: "2% decrease than last month",
    },
    {
      id: "avg-session",
      icon: "AlignVerticalDistributeEnd",
      value: "37k",
      trend: {
        direction: "up" as const,
        percentage: 0,
      },
      title: "Food Request by Buyers",
      description: "No change from last week",
    },
    {
      id: "avg-session",
      icon: "Clock",
      value: "15k",
      trend: {
        direction: "neutral" as const,
        percentage: 0,
      },
      title: "Total value in €",
      description: "No change from last week",
    },
  ];

  return (
    <>
      <div className="!pb-6 ">
        <h3 className="text-lg font-semibold">Overview</h3>
        <p className="text-sm text-muted-foreground font-medium">
          Activities summary at a glance{" "}
        </p>
      </div>
      <div className="space-y-6!">
        <div className="grid grid-cols-3 gap-6 !pr-6">
          {mockStats.slice(0, 3).map((x, i) => (
            <StatCard data={x} key={i} />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-6 !pr-6">
          {mockStats.slice(3, 7).map((x, i) => (
            <StatCard data={x} key={i} />
          ))}
        </div>
      </div>
      <div className="!mt-6 !pr-6">
        <ChartPart />
      </div>
    </>
  );
}
