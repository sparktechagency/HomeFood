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
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/AuthApi";
import { Loader2 } from "lucide-react"; // Optional: for a loading spinner

// The schema is updated to resolve the TypeScript error.
// 'rememberMe' is now a required boolean, and its initial value is set in useForm's defaultValues.
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean(),
});

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const [, setCookie] = useCookies(["token"]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false, // This correctly provides the initial value for the form
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Use the RTK Query mutation and unwrap the result
      const response = await login(values).unwrap();
      console.log('response', response);
      if (response?.data?.token) {
        toast.success(response.message || "Login successful!");

        const cookieOptions: { path: string; maxAge?: number } = {
          path: "/",
        };

        // If 'rememberMe' is true, set the cookie to expire in 30 days
        if (values.rememberMe) {
          cookieOptions.maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
        }

        // If 'rememberMe' is false, the cookie will be a session cookie (no maxAge)
        setCookie("token", response.data.token, cookieOptions);

        if (response.data.user.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
        // router.push("/");
      } else {
        // Handle cases where the API responds 200 OK but doesn't provide a token
        toast.error(response.message || "Login failed: No token received.");
      }
    } catch (err: any) {
      // 'unwrap' will throw an error on failure, which we catch here
      console.error("Login failed:", err);
      // Display a specific error message from the API, or a generic one
      const errorMessage = err?.data?.message || "Invalid credentials or server error.";
      toast.error(errorMessage);
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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

          {/* Controlled Checkbox Field for 'Remember me' */}
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 !mt-6">
                <FormControl>
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <Label htmlFor="rememberMe">Remember me</Label>
                </div>
              </FormItem>
            )}
          />

          <Button className="w-full !mt-12" type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
}