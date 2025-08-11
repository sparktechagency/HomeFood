"use client";

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
import { EyeIcon, Loader2Icon, TrashIcon } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useDeleteBuyerMutation, useGetbyersQuery } from "@/redux/features/admin/dashboard";
import { toast } from "sonner";

export default function BrandTable() {
  const [page, setPage] = React.useState(1);
  const per_page = 10;
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState(search);
  const [deleteBuyer, { isLoading: isDeleting }] = useDeleteBuyerMutation()
  // Debounce search input to avoid making API calls on every keystroke
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 when search term changes
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data: buyersData, isLoading } = useGetbyersQuery({
    page,
    perPage: per_page,
    search: debouncedSearch,
  });

  const buyers = buyersData?.data?.data || [];
  const paginationInfo = buyersData?.data;



  const handleDelete = async (id: any) => {
    try {
      const response = await deleteBuyer(id).unwrap();
      console.log("Deleted successfully:", response);
      if (response?.success) {
        toast.success(response?.message || "Item deleted successfully");
      }

    } catch (error: any) {
      console.error("Error deleting item:", error);
      toast.error(error.data.message || "Failed to delete item");
    }
  };




  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="w-[30dvw] mb-4">
          <Input
            placeholder="Search buyers by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Table>
        <TableHeader className="bg-zinc-100">
          <TableRow>
            <TableHead className="w-[100px] text-center">Sr. No</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buyers.length > 0 ? (
            buyers.map((buyer: any, index: number) => (
              <TableRow key={buyer.id}>
                <TableCell className="font-medium text-center">
                  {paginationInfo.from + index}
                </TableCell>
                <TableCell>{buyer.full_name}</TableCell>
                <TableCell>{buyer.email}</TableCell>
                <TableCell>{buyer.address}</TableCell>
                <TableCell className="text-center !space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-amber-500 hover:text-amber-600"
                        size="icon"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Buyer Details</DialogTitle>
                      </DialogHeader>
                      <div className="flex justify-center items-center py-4">
                        <Avatar className="size-[140px]">
                          {/* Assuming the base URL needs to be prepended for the profile image */}
                          <AvatarImage src={`http://103.186.20.110:8123/${buyer.profile}`} />
                          <AvatarFallback>
                            {buyer.full_name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="w-full flex flex-col justify-center items-center gap-3">
                        <h2 className="text-2xl font-bold">{buyer.full_name}</h2>
                        <p className="text-sm font-medium text-muted-foreground">
                          {buyer.email}
                        </p>
                        <div className="w-full flex justify-between items-center border-t pt-3 mt-2">
                          <span className="font-bold">User ID:</span>
                          <span className="text-sm">#{buyer.id}</span>
                        </div>
                        <div className="w-full flex justify-between items-center">
                          <span className="font-bold">Address:</span>
                          <span className="text-sm text-right">{buyer.address}</span>
                        </div>
                        <div className="w-full flex justify-between items-center">
                          <span className="font-bold">Joined On:</span>
                          <span className="text-sm">{new Date(buyer.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-destructive hover:text-red-600"
                        size="icon"
                      >
                        {isDeleting ? <Loader2Icon className="animate-spin h-4 w-4" /> : <TrashIcon className="h-4 w-4" />}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent side="left" className="w-fit">
                      <PopoverArrow />
                      <div className="p-2">
                        <h3 className="font-bold">Are you sure?</h3>
                        <CardDescription className="max-w-xs">
                          This action cannot be undone. This will permanently delete the buyer's account.
                        </CardDescription>
                        <Button onClick={() => handleDelete(buyer.id)} variant="destructive" size="sm" className="w-full !mt-4">
                          <TrashIcon className="mr-2 h-4 w-4" />
                          {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No buyers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {paginationInfo?.from || 0} to {paginationInfo?.to || 0} of {paginationInfo?.total || 0} results.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={!paginationInfo?.prev_page_url}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={!paginationInfo?.next_page_url}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}