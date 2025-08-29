'use client'

import React from "react";
import { ChartPart } from "./chart-part";
import { StatCard } from "@/components/core/stat-card";
import { useGetoverviewQuery } from "@/redux/features/admin/dashboard";
import { DashboardData, TotalOrders } from "@/lib/types/api";


// Fallback data with proper typing
const fallbackData: DashboardData = {
  seller_count: 0,
  buyer_count: 0,
  total_orders: {
    pending: 0,
    preparing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0
  },
  total_reports: 0,
  total_reviews: 0
};

export default function Page() {
  const { data: overView } = useGetoverviewQuery({});
  console.log('overview', overView);

  const dashboardData: DashboardData = overView?.data || fallbackData;

  const calculateTotalOrders = (orders: TotalOrders): number => {
    return Object.values(orders).reduce((sum: number, count: number) => sum + count, 0);
  };

  const stats = [
    {
      id: "total-sellers",
      icon: "Users",
      value: dashboardData.seller_count.toString(),
      trend: {
        direction: "up" as const,
        percentage: 12,
      },
      title: "Registered Sellers",
      description: `${dashboardData.seller_count} total sellers`,
    },
    {
      id: "total-buyers",
      icon: "UserCheck",
      value: dashboardData.buyer_count.toString(),
      trend: {
        direction: "up" as const,
        percentage: 8,
      },
      title: "Registered Buyers",
      description: `${dashboardData.buyer_count} total buyers`,
    },
    {
      id: "total-orders",
      icon: "ShoppingCart",
      value: calculateTotalOrders(dashboardData.total_orders).toString(),
      trend: {
        direction: "up" as const,
        percentage: 15,
      },
      title: "Total Orders",
      description: "All order statuses combined",
    },
    {
      id: "pending-orders",
      icon: "Clock",
      value: dashboardData.total_orders.pending.toString(),
      trend: {
        direction: dashboardData.total_orders.pending > 0 ? "up" : "neutral" as const,
        percentage: 0,
      },
      title: "Pending Orders",
      description: "Awaiting processing",
    },
    {
      id: "delivered-orders",
      icon: "PackageCheck",
      value: dashboardData.total_orders.delivered.toString(),
      trend: {
        direction: "up" as const,
        percentage: 10,
      },
      title: "Delivered Orders",
      description: "Successfully completed",
    },
    {
      id: "total-reports",
      icon: "AlertTriangle",
      value: dashboardData.total_reports.toString(),
      trend: {
        direction: dashboardData.total_reports > 0 ? "up" : "neutral" as const,
        percentage: 0,
      },
      title: "Total Reports",
      description: "Issues reported by users",
    },
    {
      id: "total-reviews",
      icon: "Star",
      value: dashboardData.total_reviews.toString(),
      trend: {
        direction: "up" as const,
        percentage: 5,
      },
      title: "Total Reviews",
      description: "Customer feedback received",
    }
  ];

  return (
    <>
      <div className="!pb-6 ">
        <h3 className="text-lg font-semibold">Overview</h3>
        <p className="text-sm text-muted-foreground font-medium">
          {overView?.message || "Loading dashboard data..."}
        </p>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6 !pr-6">
          {stats.slice(0, 3).map((x, i) => (
            <StatCard
              data={{
                id: x.id,
                icon: x.icon,
                value: x.value,

                title: x.title,
                description: x.description,
              }}
              key={i}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-6 !pr-6">
          {stats.slice(3, 7).map((x, i) => (
            <StatCard
              data={{
                id: x.id,
                icon: x.icon,
                value: x.value,

                title: x.title,
                description: x.description,
              }}
              key={i}
            />
          ))}
        </div>
      </div>

      <div className="!mt-6 !pr-6">
        <ChartPart />
      </div>
    </>
  );
}