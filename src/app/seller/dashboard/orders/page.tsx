'use client';
import React from "react";
import OrderTable from "./order-table";

import { useGetOrderHistoryQuery } from "@/redux/features/Seller/SellerApi";
import Dashboard from "@/components/ui/Dashboard";
export default function Page() {


  return (
    <div className="!pr-6">
      <Dashboard />
      <div className="!pt-12">
        <OrderTable />
      </div>
    </div>
  );
}
