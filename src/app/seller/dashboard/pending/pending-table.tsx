"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPendingRequestsQuery } from "@/redux/features/Seller/SellerApi";
import { format } from "date-fns";
import StatusBadge from "@/components/ui/status-badge";

// Custom Badge Component


const PendingTable = () => {
  const [page, setPage] = useState(1);
  const perPage = 8;
  const { data, isLoading, isError } = useGetAllPendingRequestsQuery({
    page,
    perPage,
  });

  const orders = data?.data?.data || [];
  const pagination = data?.data || {};

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (pagination.last_page || 1)) {
      setPage(newPage);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  if (isError) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-center text-red-600">
        Failed to load orders. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[120px]">Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
              : orders.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    #{order.order_id}
                  </TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>{order.user?.full_name || "N/A"}</TableCell>
                  <TableCell>{order.payment_status}</TableCell>
                  <TableCell className="text-right">
                    ${order.total_price}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.order_status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-green-600 hover:bg-green-50"
                        onClick={() =>
                          toast.success("Order marked as complete!")
                        }
                      >
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                        onClick={() => toast.error("Order cancelled!")}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {!isLoading && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <strong>
              {pagination.from}-{pagination.to}
            </strong>{" "}
            of <strong>{pagination.total}</strong> orders
          </div>
          <Pagination className="m-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(page - 1)}

                  className={page === 1 ? "opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from(
                { length: Math.min(5, pagination.last_page || 1) },
                (_, i) => {
                  let pageNum;
                  if (pagination.last_page <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= (pagination.last_page || 0) - 2) {
                    pageNum = (pagination.last_page || 0) - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNum)}
                        isActive={pageNum === page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(page + 1)}

                  className={
                    page === pagination.last_page ? "opacity-50" : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

const PendingOrdersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pending Orders</h1>
        <div className="text-sm text-muted-foreground">
          Manage your pending orders
        </div>
      </div>
      <PendingTable />
    </div>
  );
};

export default PendingOrdersPage;