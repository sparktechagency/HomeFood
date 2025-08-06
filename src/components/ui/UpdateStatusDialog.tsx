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
// If you have a mutation hook for updating the order, you would import it here.
// e.g., import { useUpdateOrderStatusMutation } from "@/redux/features/Seller/SellerApi";

// The order object passed as a prop should have an `id` and a `status`
export default function UpdateStatusDialog({ order }: any) {
    // State to manage the selected status in the dialog
    const [status, setStatus] = React.useState(order.status);
    const [isOpen, setIsOpen] = React.useState(false);

    // Example of using a mutation hook (currently commented out)
    // const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

    const handleUpdate = async () => {
        console.log(`Updating order #${order.id} to status: ${status}`);
        // Example of how you would call the mutation
        /*
        try {
          await updateOrderStatus({ orderId: order.id, status }).unwrap();
          toast.success("Order status updated successfully!");
          setIsOpen(false); // Close the dialog on success
        } catch (error) {
          toast.error("Failed to update order status.");
          console.error(error);
        }
        */

        // Placeholder toast notification
        toast.success(`Order #${order.id} status changed to "${status}"`);
        setIsOpen(false); // Close the dialog
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
                            <Label htmlFor={`pending-${order.id}`}>Pending</Label>
                        </div>
                        <div className="flex items-center !space-x-2">
                            <RadioGroupItem value="processing" id={`processing-${order.id}`} />
                            <Label htmlFor={`processing-${order.id}`}>Processing</Label>
                        </div>
                        <div className="flex items-center !space-x-2">
                            <RadioGroupItem value="completed" id={`completed-${order.id}`} />
                            <Label htmlFor={`completed-${order.id}`}>Completed</Label>
                        </div>
                        <div className="flex items-center !space-x-2">
                            <RadioGroupItem value="canceled" id={`canceled-${order.id}`} />
                            <Label htmlFor={`canceled-${order.id}`}>Canceled</Label>
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