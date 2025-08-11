import { Input } from "@/components/ui/input";
import React from "react";
import BrandTable from "./brand-table";

export default function Page() {
  return (
    <div className="!pb-12 !pr-6">

      <div className="!mt-12">
        <BrandTable />
      </div>
    </div>
  );
}
