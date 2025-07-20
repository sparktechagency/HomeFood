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
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import howl from "@/lib/howl";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const [, setCookie] = useCookies(["token"]);
  const navig = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const call = await howl({ link: "/login", method: "post", data: values });
      if (!call.data.token) {
        toast.error(call.error ?? call.message ?? "");
      } else {
        toast.success(call.message);
        setCookie("token", call.data.token);
        navig.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-4">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-bold">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Abc123..."
                    {...field}
                    className="bg-secondary"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href={"/forgot-pass"}
            className="text-pretty text-primary font-bold hover:underline"
          >
            Forget your password?
          </Link>
          <div className="flex items-center gap-2 !mt-12">
            <Checkbox /> <Label>Remember me?</Label>
          </div>
          <Button className="w-full" type="submit">
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
}
