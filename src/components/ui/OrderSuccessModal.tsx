// components/core/OrderSuccessModal.tsx

"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Landmark, MapPin, Tag } from "lucide-react";
import { useRouter } from "next/navigation";

// Define a type for the order data based on your API response
type OrderData = {
    order_id: number;
    total_price: number;
    payment_status: string;
    delivery_status: string;
    delivery_address: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    data: OrderData | null;
};

export default function OrderSuccessModal({ isOpen, onClose, data }: Props) {
    const router = useRouter();

    if (!data) return null;

    const handleTrackOrder = () => {
        onClose(); // Close the modal first
        router.push("/my-orders"); // Then navigate
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex justify-center items-center mb-4">
                        <CheckCircle2 className="size-16 text-green-500" />
                    </div>
                    <DialogTitle className="text-center text-2xl font-bold">
                        Order Placed Successfully!
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Thank you for your purchase. Here are your order details.
                    </DialogDescription>
                </DialogHeader>

                <div className="!mt-6 !space-y-4 text-sm">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <Tag className="size-4" /> Order ID
                        </span>
                        <span className="font-semibold">#{data.order_id}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <Landmark className="size-4" /> Payment
                        </span>
                        <span className="font-semibold capitalize">{data.payment_status}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <Package className="size-4" /> Status
                        </span>
                        <span className="font-semibold capitalize">{data.delivery_status}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="size-4" /> Address
                        </span>
                        <span className="font-semibold text-right">{data.delivery_address}</span>
                    </div>
                </div>

                <DialogFooter className="!mt-6 sm:justify-between gap-2">
                    <Button variant="outline" onClick={onClose} className="w-full">
                        Close
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}