"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableBadge from "@/components/ui/table-badge";
import { useGetOrderHistoryQuery } from "@/redux/features/Seller/SellerApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
// This import path is correct based on your previous code.
import UpdateStatusDialog from "@/components/ui/UpdateStatusDialog";
import StatusBadge from "@/components/ui/status-badge";
import { Order } from "@/lib/types/api";


// Define a type for your order object for better type safety and code completion.
// Adjust the properties based on your actual API response.





export default function OrderTable() {
  const [page, setPage] = React.useState(1);
  const per_page = 8;

  // Fetch data using the RTK Query hook
  const { data: ordersResponse, isLoading } = useGetOrderHistoryQuery({
    page,
    per_page,
  });

  // Extract the array of orders and pagination metadata
  const orders: Order[] = ordersResponse?.data?.data || [];
  const meta = ordersResponse?.data;

  // Pagination handlers
  const handlePrevious = () => {
    if (meta?.current_page > 1) {
      setPage(meta.current_page - 1);
    }
  };

  const handleNext = () => {
    if (meta?.current_page < meta?.last_page) {
      setPage(meta.current_page + 1);
    }
  };

  // Handle loading state
  if (isLoading) {
    return <div className="text-center p-10">Loading orders...</div>;
  }

  console.log('orders', orders);


  return (
    <>
      <Table className="">
        <TableHeader className="bg-zinc-100 dark:bg-zinc-800">
          <TableRow>
            <TableHead className="w-[100px] text-center">Order ID</TableHead>
            <TableHead className="text-center">Customer</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Items</TableHead>
            <TableHead className="text-center">order_status</TableHead>
            <TableHead className="text-center">payment_status</TableHead>
            <TableHead className="text-center">delivery_status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order: Order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-center">
                  #{order.id}
                </TableCell>
                <TableCell className="text-center">
                  {order.user?.full_name || "N/A"}
                </TableCell>
                <TableCell className="text-center">
                  ${Number(order.total_price || 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  {order.items?.length || 0}
                </TableCell>
                <TableCell className="text-center ">
                  <StatusBadge status={order.order_status} />
                </TableCell>
                <TableCell className="text-center ">
                  {/* <StatusBadge status={order.payment_status} /> */}
                  {order.payment_status}
                </TableCell>
                <TableCell className="text-center">
                  <StatusBadge status={order.delivery_status} />
                </TableCell>
                <TableCell className="text-center">
                  <UpdateStatusDialog order={order} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center h-24">
                No order history found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Render pagination only if there are orders */}
      {orders.length > 0 && meta && (
        <div className="!pt-4 !pb-12 flex flex-row justify-between items-center w-full">
          <p className="text-sm font-semibold">
            Showing {meta.from} to {meta.to} of {meta.total} results
          </p>
          <Pagination className="w-min">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrevious}
                  // Add the disabled prop for better accessibility and functionality

                  className={!meta.prev_page_url ? "cursor-not-allowed text-muted-foreground" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  // Add the disabled prop for better accessibility and functionality

                  className={!meta.next_page_url ? "cursor-not-allowed text-muted-foreground" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}