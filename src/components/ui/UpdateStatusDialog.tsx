"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useUpdateDaliveryStatusMutation } from "@/redux/features/Seller/SellerApi";
// If you have a mutation hook for updating the order, you would import it here.
// e.g., import { useUpdateOrderStatusMutation } from "@/redux/features/Seller/SellerApi";

// The order object passed as a prop should have an `id` and a `status`
export default function UpdateStatusDialog({ order }: any) {
    // State to manage the selected status in the dialog
    const [status, setStatus] = React.useState(order.status);
    const [isOpen, setIsOpen] = React.useState(false);

    const [updateDaliveryStatus, { isLoading }] = useUpdateDaliveryStatusMutation();
    const [selectedStatusLoadingId, setSelectedStatusLoadingId] = React.useState(null);
    // Example of using a mutation hook (currently commented out)
    // const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

    const handleUpdate = async () => {
        const confirmed = window.confirm("Are you sure you want to approve this order?");
        if (!confirmed) return;
        setSelectedStatusLoadingId(order.id);

        try {
            const res = await updateDaliveryStatus({ id: order.id, status }).unwrap();
            if (res?.success) {
                toast.success(res?.message || "Status updated successfully");
                setIsOpen(false);
                setSelectedStatusLoadingId(null);
                toast.success(res?.message || "Status updated successfully");
            }
            setIsOpen(false);
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setSelectedStatusLoadingId(null);
        }

    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <EditIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Status for Order #{order.id}</DialogTitle>
                </DialogHeader>
                <div className="!mt-6">
                    {/* The `value` is bound to state, and `onValueChange` updates it */}
                    <RadioGroup value={status} onValueChange={setStatus}>
                        {/* The `value` of each item should match the status strings from your API */}
                        <div className="flex items-center !space-x-2">
                            <RadioGroupItem value="pending" id={`pending-${order.id}`} />
                            <Label htmlFor={`pending-${order.id}`}>pending</Label>
                        </div>
                        <div className="flex items-center !space-x-2">
                            <RadioGroupItem value="preparing" id={`preparing-${order.id}`} />
                            <Label htmlFor={`preparing-${order.id}`}>preparing</Label>
                        </div>
                        <div className="flex items-center !space-x-2">
                            <RadioGroupItem value="shipped" id={`shipped-${order.id}`} />
                            <Label htmlFor={`shipped-${order.id}`}>shipped</Label>
                        </div>
                        <div className="flex items-center !space-x-2">
                            <RadioGroupItem value="delivered" id={`delivered-${order.id}`} />
                            <Label htmlFor={`delivered-${order.id}`}>delivered</Label>
                        </div>
                        <div className="flex items-center !space-x-2">
                            <RadioGroupItem value="cancelled" id={`cancelled-${order.id}`} />
                            <Label htmlFor={`cancelled-${order.id}`}>cancelled</Label>
                        </div>
                    </RadioGroup>
                </div>
                <DialogFooter className="!mt-6">
                    <Button
                        className="w-full"
                        onClick={handleUpdate}
                    // disabled={isLoading} // Disable button while mutation is in progress
                    >
                        {/* {isLoading ? "Updating..." : "Update"} */}
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}