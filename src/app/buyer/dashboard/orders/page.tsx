import React from "react";
import OrderTable from "./order-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export default function Page() {
  return (
    <div className="!pr-6">
      <div className="w-full grid grid-cols-3 gap-24">
        <div className="aspect-video border-2 rounded-lg flex flex-col justify-center items-center gap-6">
          <h4 className="text-xl font-semibold">Total Orders</h4>
          <h3 className="text-5xl font-bold">21</h3>
        </div>
        <div className="aspect-video border-2 rounded-lg flex flex-col justify-center items-center gap-6">
          <h4 className="text-xl font-semibold">Canceled orders</h4>
          <h3 className="text-5xl font-bold">4</h3>
        </div>
        <div className="aspect-video border-2 rounded-lg flex flex-col justify-center items-center gap-6">
          <h4 className="text-xl font-semibold">Completed orders</h4>
          <h3 className="text-5xl font-bold">11</h3>
        </div>
      </div>
      <div className="!pt-12">
        <OrderTable />
        <hr />
        <div className="!pt-4 !pb-12 flex flex-row justify-between items-center w-full col-span-5">
          <p className="text-sm font-semibold">Page 1 to 10</p>
          <Pagination className="w-min">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
