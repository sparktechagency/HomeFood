"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { cn } from "@/lib/utils"; // For conditional styling
import { useGetAllNotificationQuery, useReadNotificationByIdMutation } from "@/redux/features/AuthApi";
// import { useGetAllNotificationsQuery } from "@/redux/features/admin/notificationApi";
// import { useReadNotificationByIdMutation } from "@/redux/features/AuthApi";

// Define a type for a single notification for better code quality
type Notification = {
  id: string;
  read_at: string | null;
  data: {
    message: string;
    [key: string]: any; // Other properties like reason, reporter, etc.
  };
};

export default function Page() {
  const [page, setPage] = useState(1);
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);

  // Fetch notifications for the current page
  const { data: notificationResponse, isLoading, isFetching } = useGetAllNotificationQuery({ page });
  console.log('notificationResponse:', notificationResponse);

  // Initialize the mutation for marking a notification as read
  const [readNotification, { isLoading: isMarkingAsRead }] = useReadNotificationByIdMutation();

  // This effect merges newly fetched notifications into our list for infinite scrolling
  useEffect(() => {
    if (notificationResponse?.data?.data) {
      setAllNotifications(prev => {
        const newNotifications = notificationResponse.data.data.filter(
          (newItem: Notification) => !prev.some(prevItem => prevItem.id === newItem.id)
        );
        return [...prev, ...newNotifications];
      });
    }
  }, [notificationResponse]);

  // Handler for the "Mark as Read" button
  const handleMarkAsRead = async (id: string) => {
    try {
      await readNotification(id).unwrap();
      toast.success("Notification marked as read.");
      // The list will refetch automatically due to `invalidatesTags`
    } catch (error) {
      toast.error("Failed to mark notification as read.");
    }
  };

  // --- Render States ---

  // Initial loading skeleton
  if (isLoading && page === 1) {
    return (
      <div className="!pb-12 !pr-6 !space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (allNotifications.length === 0) {
    return (
      <div className="flex items-center justify-center h-[90dvh] px-4">
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 text-center shadow-md">

          {/* Icon Container */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>

          {/* Text Content */}
          <h2 className="text-xl font-semibold text-gray-800">
            All Caught Up
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            You have no new notifications right now.
          </p>
        </div>
      </div>
    );
  }


  const { current_page, last_page } = notificationResponse?.data || {};

  return (
    <div className="!pb-12 !pr-6 !space-y-6">
      {allNotifications.map((notification) => (
        <Card
          key={notification.id}
          // Use `cn` to add a subtle background for unread notifications
          className={cn(!notification.read_at && "bg-green-50 border-green-200")}
        >
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              {/* Add a visual indicator for unread items */}
              {!notification.read_at && (
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
              )}
              {notification.data.message}
            </CardTitle>
            <CardDescription>
              Reason: {notification.data.reason || "N/A"}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <CardAction>
              <Button className="text-sm" variant="ghost">View Details</Button>
              <Button
                className="text-sm"
                variant="secondary"
                onClick={() => handleMarkAsRead(notification.id)}
                disabled={!!notification.read_at || isMarkingAsRead} // Disable if already read or currently loading
              >
                {notification.read_at ? "Read" : "Mark as Read"}
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      ))}

      {/* Pagination Button */}
      {current_page < last_page && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setPage(p => p + 1)}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}