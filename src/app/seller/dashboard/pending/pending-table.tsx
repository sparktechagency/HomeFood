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
import { Button } from "@/components/ui/button";
import { CheckIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

export default function PendingTable() {
  const orders = [
    {
      orderId: "#001",
      date: "20/06/2025",
      customer: "Ali Hasan",
      payment: "complete",
      price: "$50.00",
      delivery: "N/A",
      items: "1 item",
      status: "complete",
    },
    {
      orderId: "#002",
      date: "19/06/2025",
      customer: "Fatima Khan",
      payment: "pending",
      price: "$120.50",
      delivery: "21/06/2025",
      items: "3 items",
      status: "pending",
    },
    {
      orderId: "#003",
      date: "18/06/2025",
      customer: "Ahmed Raza",
      payment: "complete",
      price: "$75.20",
      delivery: "20/06/2025",
      items: "2 items",
      status: "processing",
    },
    {
      orderId: "#004",
      date: "17/06/2025",
      customer: "Sara Begum",
      payment: "cancelled",
      price: "$30.00",
      delivery: "N/A",
      items: "1 item",
      status: "cancelled",
    },
    {
      orderId: "#005",
      date: "16/06/2025",
      customer: "Usman Ghani",
      payment: "complete",
      price: "$200.00",
      delivery: "18/06/2025",
      items: "5 items",
      status: "complete",
    },
    {
      orderId: "#006",
      date: "15/06/2025",
      customer: "Aisha Bibi",
      payment: "pending",
      price: "$99.99",
      delivery: "17/06/2025",
      items: "2 items",
      status: "pending",
    },
    {
      orderId: "#007",
      date: "14/06/2025",
      customer: "Omar Farooq",
      payment: "complete",
      price: "$15.75",
      delivery: "16/06/2025",
      items: "1 item",
      status: "processing",
    },
    {
      orderId: "#008",
      date: "13/06/2025",
      customer: "Zainab Ali",
      payment: "complete",
      price: "$85.00",
      delivery: "15/06/2025",
      items: "3 items",
      status: "complete",
    },
  ] as const;

  return (
    <Table className="">
      <TableHeader className="bg-zinc-100 ">
        <TableRow className="">
          <TableHead className="w-[100px] text-center">Order</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Customer</TableHead>
          <TableHead className="text-center">Payment</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Delivery</TableHead>
          <TableHead className="text-center">Items</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.orderId}>
            <TableCell className="font-medium text-center">
              {order.orderId}
            </TableCell>
            <TableCell className="text-center">{order.date}</TableCell>
            <TableCell className="text-center">{order.customer}</TableCell>
            <TableCell className="text-center">{order.payment}</TableCell>
            <TableCell className="text-center">{order.price}</TableCell>
            <TableCell className="text-center">{order.delivery}</TableCell>
            <TableCell className="text-center">{order.items}</TableCell>
            <TableCell className="text-center">
              <TableBadge type={order.status} />
            </TableCell>
            <TableCell className="text-center !space-x-2">
              <Button
                size="icon"
                className="text-green-600"
                variant="outline"
                onClick={() => {
                  toast.success("Order marked as COMPLETE!");
                }}
              >
                <CheckIcon />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => {
                  toast.success("Order Canceled!");
                }}
              >
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
