import { Input } from "@/components/ui/input";
import React from "react";
import CreatorsTable from "./creators-table";

export default function Page() {
  return (
    <div className="!pb-12 !pr-6">
      <div className="w-full flex flex-row justify-between items-center">
        <div className="w-[30dvw]">
          <Input placeholder="Search brands" inputMode="search" />
        </div>
      </div>
      <div className="!mt-12">
        <CreatorsTable />
      </div>
    </div>
  );
}
