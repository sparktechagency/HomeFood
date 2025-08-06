// src/components/ui/status-badge.tsx

"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Recommended for combining class names

// Define the shape of the props the component accepts for type safety.
interface StatusBadgeProps {
    status: string | null | undefined;
}

// Define the styles for each status in a map.
// Using a map like this makes the component easy to update and maintain.
const statusMap: Record<string, { className: string; text: string }> = {
    pending: {
        className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400",
        text: "Pending",
    },
    completed: {
        className: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400",
        text: "Completed",
    },
    pickup: {
        className: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400",
        text: "Pickup",
    },
    cancelled: {
        className: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400",
        text: "Cancelled",
    },
    // You can easily add more statuses here
    // delivered: {
    //   className: "bg-purple-100 text-purple-800",
    //   text: "Delivered",
    // },
};

// Define a fallback style for any status that isn't in the map.
const defaultStatus = {
    className: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    text: "Unknown",
};

/**
 * A reusable badge component to display order or request status.
 * It safely handles unknown or null statuses by showing a default style.
 * @param {StatusBadgeProps} props - The props for the component.
 * @param {string | null | undefined} props.status - The status string to display.
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
    // Determine the current status style.
    // 1. Convert the incoming status to lowercase to make it case-insensitive.
    // 2. Look it up in the statusMap.
    // 3. If it's not found (or if status is null), use the defaultStatus.
    const currentStatus = (status && statusMap[status.toLowerCase()]) || defaultStatus;

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
                currentStatus.className
            )}
        >
            {currentStatus.text}
        </span>
    );
}
