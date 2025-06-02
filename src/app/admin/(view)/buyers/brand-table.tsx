import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EyeIcon, TrashIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardDescription } from "@/components/ui/card";
import { PopoverArrow } from "@radix-ui/react-popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BrandTable() {
  const customers = [
    {
      srNo: "#2354",
      customer: "Ali Hasan",
      email: "bdtim123@gmail.com",
      location: "New York",
    },
    {
      srNo: "#2355",
      customer: "Jane Doe",
      email: "jane.doe@example.com",
      location: "Los Angeles",
    },
    {
      srNo: "#2356",
      customer: "John Smith",
      email: "john.smith@example.com",
      location: "Chicago",
    },
    {
      srNo: "#2357",
      customer: "Emily White",
      email: "emily.white@example.com",
      location: "Houston",
    },
    {
      srNo: "#2358",
      customer: "Michael Brown",
      email: "michael.brown@example.com",
      location: "Phoenix",
    },
  ];

  return (
    <Table>
      <TableHeader className="bg-zinc-100">
        <TableRow>
          <TableHead className="w-[100px] text-center">Sr. No</TableHead>
          <TableHead className="text-center">Buyer</TableHead>
          <TableHead className="text-center">Email</TableHead>
          <TableHead className="text-center">Location</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-center">
              {customer.srNo}
            </TableCell>
            <TableCell className="text-center">{customer.customer}</TableCell>
            <TableCell className="text-center">{customer.email}</TableCell>
            <TableCell className="text-center">{customer.location}</TableCell>
            <TableCell className="text-center !space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-amber-500"
                    size="icon"
                  >
                    <EyeIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-center items-center">
                    <Avatar className="size-[140px]">
                      <AvatarImage src="https://avatar.iran.liara.run/public" />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center gap-2">
                    <h2 className="text-2xl font-bold">Lord Tim</h2>
                    <p className="text-sm font-medium text-muted-foreground">
                      bdtim123@gmail.com
                    </p>
                    <div className="w-full flex justify-between items-center">
                      <span className="font-bold">Phone:</span>{" "}
                      <span className="text-sm">+93215789654</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <span className="font-bold">User ID:</span>
                      <span className="text-sm">#23345</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <span className="font-bold">Took services:</span>
                      <span className="text-sm">23</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <span className="font-bold">Address:</span>
                      <span className="text-sm">Queensland</span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-destructive"
                    size="icon"
                  >
                    <TrashIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="left">
                  <PopoverArrow />
                  <h3>Are you sure?</h3>
                  <CardDescription>
                    You are going to delete this user account and this can not
                    be undone
                  </CardDescription>
                  <Button variant="destructive" className="text-sm !mt-6">
                    <TrashIcon />
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
