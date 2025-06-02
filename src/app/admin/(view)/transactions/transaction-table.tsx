import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TransactionTable() {
  const customers = [
    {
      srNo: "#2354",
      service: "Yoga",
      creator: "Ali Hasan",
      brand: "Ali Hasan",
      price: "100",
      percentage: "8%($12.00)",
    },
    {
      srNo: "#2355",
      service: "Meditation",
      creator: "Bina Patel",
      brand: "Mindful Living",
      price: "75",
      percentage: "10%($7.50)",
    },
    {
      srNo: "#2356",
      service: "Pilates",
      creator: "Chris Johnson",
      brand: "Core Strength",
      price: "120",
      percentage: "7%($8.40)",
    },
    {
      srNo: "#2357",
      service: "Zumba",
      creator: "Diana Lee",
      brand: "Dance Fit",
      price: "60",
      percentage: "12%($7.20)",
    },
    {
      srNo: "#2358",
      service: "CrossFit",
      creator: "Ethan Green",
      brand: "Elite Fitness",
      price: "150",
      percentage: "5%($7.50)",
    },
    {
      srNo: "#2359",
      service: "Spin Class",
      creator: "Fiona White",
      brand: "Cycle Zone",
      price: "80",
      percentage: "9%($7.20)",
    },
    {
      srNo: "#2360",
      service: "Personal Training",
      creator: "George Black",
      brand: "Peak Performance",
      price: "200",
      percentage: "6%($12.00)",
    },
    {
      srNo: "#2361",
      service: "Nutrition Coaching",
      creator: "Hannah Brown",
      brand: "Healthy Habits",
      price: "90",
      percentage: "11%($9.90)",
    },
    {
      srNo: "#2362",
      service: "Martial Arts",
      creator: "Ivan Petrov",
      brand: "Dragon Dojo",
      price: "110",
      percentage: "8%($8.80)",
    },
    {
      srNo: "#2363",
      service: "Swimming Lessons",
      creator: "Jessica Davis",
      brand: "Aqua Fitness",
      price: "70",
      percentage: "10%($7.00)",
    },
    {
      srNo: "#2364",
      service: "Hiking Group",
      creator: "Kyle Wilson",
      brand: "Outdoor Adventures",
      price: "40",
      percentage: "15%($6.00)",
    },
    {
      srNo: "#2365",
      service: "Massage Therapy",
      creator: "Laura King",
      brand: "Relaxation Station",
      price: "95",
      percentage: "9%($8.55)",
    },
  ];

  return (
    <Table>
      <TableHeader className="bg-zinc-100">
        <TableRow>
          <TableHead className="w-[100px] text-center">Sr. No</TableHead>
          <TableHead className="text-center">Service</TableHead>
          <TableHead className="text-center">Sell details</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Your Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-center">
              {customer.srNo}
            </TableCell>
            <TableCell className="text-center font-semibold">
              {customer.service}
            </TableCell>
            <TableCell className="flex flex-col justify-center items-center">
              <div className="font-medium">
                <p>
                  <b>Seller:</b> {customer.creator}
                </p>
                <p>
                  <b>Buyer:</b> {customer.brand}
                </p>
              </div>
            </TableCell>

            <TableCell className="text-center font-semibold">
              ${customer.price}.00
            </TableCell>
            <TableCell className="text-center font-bold text-lg">
              {customer.percentage}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
