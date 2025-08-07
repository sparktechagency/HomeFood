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
import { CheckIcon, Loader2, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAcceptRequestedFooditemMutation, useGetrequestedFoodItemsQuery, useRejectRequestedFooditemMutation } from "@/redux/features/Seller/SellerApi";

export default function PendingTable() {
  const [page, setPage] = React.useState(1);
  const per_page = 8;

  // Fetch data using the RTK Query hook
  const { data: foodItemsResponse, isLoading, refetch } = useGetrequestedFoodItemsQuery({
    page,
    per_page,
  });
  const [acceptRequestedFooditem, { isLoading: isAccepting }] = useAcceptRequestedFooditemMutation();
  const [rejectRequestedFooditem, { isLoading: isRejecting }] = useRejectRequestedFooditemMutation();



  console.log('foodItemsResponse', foodItemsResponse);

  const [isApprovingId, setIsApprovingId] = React.useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = React.useState<string | null>(null);
  // Extract the array of requests and pagination metadata
  const requests = foodItemsResponse?.data?.data || [];
  const meta = foodItemsResponse?.data;

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
  const handleCompleteOrder = async (orderId: string) => {
    const confirmed = window.confirm("Are you sure you want to accept this request?");
    if (!confirmed) return;

    setIsApprovingId(orderId);
    try {
      console.log('Approving food item with ID:', orderId);
      const res = await acceptRequestedFooditem({ id: orderId }).unwrap();
      console.log('Approve success:', res);
      if (res?.success) {
        toast.success(res?.message || "Item approved successfully");
        refetch();
        setIsApprovingId(null);
      }
    } catch (error) {
      console.error('Approve error:', error);
    } finally {
      setIsApprovingId(null);
    }
  };


  // Delete Handler
  const handeDeleteOrder = async (orderId: string) => {
    const confirmed = window.confirm("Are you sure you want to cancelled this request?");
    if (!confirmed) return;

    setIsDeletingId(orderId);
    try {
      console.log('Deleting food item with ID:', orderId);
      const res = await rejectRequestedFooditem({ id: orderId }).unwrap();
      console.log('Delete success:', res);
      if (res?.success) {
        toast.success(res?.message || "Item deleted successfully");
        refetch();
        setIsDeletingId(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsDeletingId(null);
    }
  };
  // Handle loading state
  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div>
      <Table className="">
        <TableHeader className="bg-zinc-100">
          <TableRow>
            <TableHead className="w-[100px] text-center">Order ID</TableHead>
            <TableHead className="text-center">Preferred Date</TableHead>
            <TableHead className="text-center">Customer</TableHead>
            <TableHead className="text-center">Dish Name</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Location</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length > 0 ? (
            requests.map((request: any) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium text-center">
                  #{request.id}
                </TableCell>
                <TableCell className="text-center">
                  {request.preferred_date}
                </TableCell>
                <TableCell className="text-center">
                  {request.user?.full_name || "N/A"}
                </TableCell>
                <TableCell className="text-center">{request.dish_name}</TableCell>
                <TableCell className="text-center">
                  ${request.preferred_price}
                </TableCell>
                <TableCell className="text-center">{request.location}</TableCell>
                <TableCell className="text-center">
                  {request.quantity_needed}
                </TableCell>
                <TableCell className="text-center">
                  <TableBadge type={request?.status} />
                </TableCell>
                <TableCell className="text-center !space-x-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-green-600 hover:bg-green-50"
                      onClick={() => handleCompleteOrder(request?.id)}
                    >
                      {isApprovingId === request?.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckIcon className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                      onClick={() => handeDeleteOrder(request?.id)}
                    >
                      {isDeletingId === request?.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrashIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center h-24">
                No food requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Render pagination only if there are requests */}
      {requests.length > 0 && meta && (
        <div className="!pt-4 !pb-12 flex flex-row justify-between items-center w-full">
          <p className="text-sm font-semibold">
            Showing {meta.from} to {meta.to} of {meta.total} results
          </p>
          <Pagination className="w-min">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePrevious}
                  // Disable button if there's no previous page

                  className={!meta.prev_page_url ? "cursor-not-allowed text-muted-foreground" : ""}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={handleNext}
                  // Disable button if there's no next page

                  className={!meta.next_page_url ? "cursor-not-allowed text-muted-foreground" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}