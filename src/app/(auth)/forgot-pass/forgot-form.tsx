"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useTakeEmailForForgetpassMutation } from "@/redux/features/AuthApi";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string(),
});

export default function ForgotForm() {

  const [takeEmailForForgetpass, { isLoading }] = useTakeEmailForForgetpassMutation();
  const navig = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const response = await takeEmailForForgetpass({ email: values?.email })
      console.log('response', response);

      if (response?.data?.success) {
        toast.success(response?.data?.message)
        navig.push(`/verify-otp?email=${values?.email}`)
      }

    } catch (error: any) {
      console.log('error', error);
      toast.error(error?.data?.message || "Something went wrong")

    }

    // navig.push("/verify-otp");
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    {...field}
                    className="bg-secondary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full md:w-1/2 col-span-2 !mx-auto block"
            type="submit"
          >
            Send OTP
          </Button>
        </form>
      </Form>
    </div>
  );
}
