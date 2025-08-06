'use client'

import { useGetDashboardQuery } from '@/redux/features/Seller/SellerApi';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton'; // Assuming you have a Skeleton component from shadcn/ui

/**
 * A reusable card component to display a statistic.
 * It shows a skeleton placeholder while the data is loading.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the statistic (e.g., "Total Orders").
 * @param {string | number} props.value - The value of the statistic.
 * @param {boolean} props.isLoading - A boolean to indicate if data is still loading.
 */
const StatCard = ({ title, value, isLoading }: { title: string, value: string | number, isLoading: boolean }) => {
    // If isLoading is true, we render the skeleton UI.
    if (isLoading) {
        return (
            <div className="aspect-video border-2 rounded-lg flex flex-col justify-center items-center gap-6 p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-12 w-1/2" />
            </div>
        );
    }

    // Otherwise, we render the actual data.
    return (
        <div className="aspect-video border-2 rounded-lg flex flex-col justify-center items-center gap-6 p-4">
            <h4 className="text-xl font-semibold text-center">{title}</h4>
            <h3 className="text-5xl font-bold">{value}</h3>
        </div>
    );
};

/**
 * The main Dashboard component that fetches and displays statistics.
 */
export default function Dashboard() {
    // Fetch dashboard data from the API.
    const { data, isLoading, isError } = useGetDashboardQuery({});

    // Safely extract the data from the API response, providing default values (0) to prevent errors.
    const stats = {
        total: data?.data?.total_order || 0,
        cancelled: data?.data?.cancelled_order || 0,
        completed: data?.data?.delivered_order || 0, // Assuming 'delivered_order' means completed
    };

    // If there's an error fetching data, show an error message.
    if (isError) {
        return (
            <div className="w-full text-center p-10 bg-red-50 text-red-600 border border-red-200 rounded-lg">
                Failed to load dashboard data. Please try again later.
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* We use the StatCard component for each statistic. */}
            {/* The `isLoading` state is passed to each card to control its display. */}
            <StatCard
                title="Total Orders"
                value={stats.total}
                isLoading={isLoading}
            />
            <StatCard
                title="Canceled Orders"
                value={stats.cancelled}
                isLoading={isLoading}
            />
            <StatCard
                title="Completed Orders"
                value={stats.completed}
                isLoading={isLoading}
            />
        </div>
    );
}
