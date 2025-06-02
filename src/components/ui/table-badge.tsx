// table-badge.tsx (MODIFIED)
import { cn } from "@/lib/utils";
import React from "react";

const styles = {
  complete: {
    container: "bg-[#F3FFF5] border-2 border-[#47BE10] text-[#47BE10]",
    dot: "bg-[#47BE10]",
  },
  canceled: {
    container: "bg-[#FFF5F5] border-2 border-[#BE1047] text-[#BE1047]",
    dot: "bg-[#BE1047]",
  },
  // Adding 'cancelled' to handle the common misspelling, mapping to the same styles as 'canceled'
  cancelled: {
    // Added
    container: "bg-[#FFF5F5] border-2 border-[#BE1047] text-[#BE1047]",
    dot: "bg-[#BE1047]",
  },
  pending: {
    container: "bg-[#FFF9E6] border-2 border-[#E1BE10] text-[#E1BE10]",
    dot: "bg-[#E1BE10]",
  },
  processing: {
    // Added new style for 'processing'
    container: "bg-[#E6F5FF] border-2 border-[#10BEE1] text-[#10BEE1]",
    dot: "bg-[#10BEE1]",
  },
} as const;

export default function TableBadge({
  type,
}: {
  type: "complete" | "canceled" | "pending" | "processing" | "cancelled"; // Updated type
}) {
  const { container, dot } = styles[type];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 !px-3 !py-1 rounded-full font-semibold text-xs",
        container
      )}
    >
      <div className={cn("w-2 h-2 rounded-full", dot)} />
      {/* Capitalize and display the type, ensuring consistency */}
      {type.charAt(0).toUpperCase() + type.slice(1).replace("ed", "ed")}{" "}
      {/* Just to show it's "cancelled" with two 'l's if that's what's passed */}
    </div>
  );
}
