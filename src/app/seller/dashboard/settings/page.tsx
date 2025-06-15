"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import React from "react";
import ProfUpdateForm from "./prof-update-form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
export default function Page() {
  return (
    <div className="!pb-12 !pr-6">
      <div className="flex flex-row justify-center items-center">
        <Avatar className="size-[140px] relative overflow-visible">
          <AvatarImage src="https://avatar.iran.liara.run/public" />
          <AvatarFallback>AV</AvatarFallback>
          <Button
            className="absolute bottom-0 right-0 z-30"
            variant="outline"
            size="icon"
          >
            <label
              htmlFor="imageUpload"
              className="cursor-pointer w-full h-full flex items-center justify-center"
            >
              <EditIcon />
            </label>
            <Input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </Button>
        </Avatar>
      </div>
      <div className="">
        <ProfUpdateForm />
      </div>
      <div className="!mt-12 w-2/3 !mx-auto rounded-lg border-2 !p-6">
        <Button className="w-full text-sm" variant="secondary" asChild>
          <Link href="settings/change-pass">Change Password</Link>
        </Button>
        <div className="!mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full text-sm border-destructive text-destructive"
                variant="outline"
              >
                Deactivate account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  Write your name &quot;Raven&quot; below to confirm and delete
                  this account
                </DialogDescription>
              </DialogHeader>
              <div className="">
                <Input placeholder="" className="" />
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline" className="text-sm" asChild>
                    <Link href="/login"> Deactivate account</Link>
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
