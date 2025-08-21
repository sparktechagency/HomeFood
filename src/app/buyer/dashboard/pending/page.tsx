"use client";

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PendingTable from "./pending-table";

export default function PendingPage() {
  return (
    <div className="!pr-6">
      <div className="!pt-12">
        <PendingTable />
      </div>
    </div>
  );
}