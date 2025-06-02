// OrderTable.js (Original data, now compatible with modified table-badge.tsx)
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableBadge from "@/components/ui/table-badge";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function OrderTable() {
  const orders = [
    {
      orderId: "#001",
      customer: "Ali Hasan",
      price: "$50.00",
      items: "1 item",
      status: "complete",
    },
    {
      orderId: "#002",
      customer: "Fatima Khan",
      price: "$120.50",
      items: "3 items",
      status: "pending",
    },
    {
      orderId: "#003",
      customer: "Ahmed Raza",
      price: "$75.20",
      items: "2 items",
      status: "processing", // This will now work
    },
    {
      orderId: "#004",
      customer: "Sara Begum",
      price: "$30.00",
      items: "1 item",
      status: "cancelled", // This will now work
    },
    {
      orderId: "#005",
      customer: "Usman Ghani",
      price: "$200.00",
      items: "5 items",
      status: "complete",
    },
    {
      orderId: "#006",
      customer: "Aisha Bibi",
      price: "$99.99",
      items: "2 items",
      status: "pending",
    },
    {
      orderId: "#007",
      customer: "Omar Farooq",
      price: "$15.75",
      items: "1 item",
      status: "processing",
    },
    {
      orderId: "#008",
      customer: "Zainab Ali",
      price: "$85.00",
      items: "3 items",
      status: "complete",
    },
  ] as const;

  return (
    <Table className="">
      <TableHeader className="bg-zinc-100 ">
        <TableRow className="">
          <TableHead className="w-[100px] text-center">Order</TableHead>
          <TableHead className="text-center">Customer</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Items</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.orderId}>
            <TableCell className="font-medium text-center">
              {order.orderId}
            </TableCell>
            <TableCell className="text-center">{order.customer}</TableCell>
            <TableCell className="text-center">{order.price}</TableCell>
            <TableCell className="text-center">{order.items}</TableCell>
            <TableCell className="text-center">
              <TableBadge type={order.status} />
            </TableCell>
            <TableCell className="text-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <EditIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Status</DialogTitle>
                  </DialogHeader>
                  <div className="!mt-6">
                    <RadioGroup defaultValue="option-one">
                      <div className="flex items-center !space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Pending</Label>
                      </div>
                      <div className="flex items-center !space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Processing</Label>
                      </div>
                      <div className="flex items-center !space-x-2">
                        <RadioGroupItem
                          value="option-three"
                          id="option-three"
                        />
                        <Label htmlFor="option-three">Completed</Label>
                      </div>
                      <div className="flex items-center !space-x-2">
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Canceled</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <DialogFooter className="!mt-6">
                    <Button className="w-full">Update</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
