import React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
export default function AddCat() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-4 right-4">
            <PlusIcon /> Add Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new category</DialogTitle>
          </DialogHeader>
          <div className="">
            <form className="w-full">
              <Input placeholder="Category name" />
              <div className="w-full !mt-6">
                <Button className="block !mx-auto text-sm">
                  Create Category
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
