import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PendingTable from "./pending-table";
export default function Page() {
  return (
    <div className="!pr-6">
      <div className="!pt-12">
        <PendingTable />
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
