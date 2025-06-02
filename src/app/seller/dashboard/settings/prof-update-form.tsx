"use client";
import { Button } from "@/components/ui/button";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  address: z.string(),
});
export default function ProfUpdateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Raven",
      email: "example@email.com",
      address: "New York",
    },
  });

  function submitter(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Your profile data is updated");
  }

  return (
    <div className="!mt-12 w-2/3 !mx-auto rounded-lg border-2 !p-6">
      <Form {...form}>
        <form className="!space-y-6" onSubmit={form.handleSubmit(submitter)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full !mt-6">Update Profile</Button>
        </form>
      </Form>
      <div className="!mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="destructive">
              Delete Account
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
                <Button variant="destructive" className="text-sm" asChild>
                  <Link href="/login"> Delete account</Link>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
