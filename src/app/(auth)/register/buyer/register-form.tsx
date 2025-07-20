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
import { toast } from "sonner";

// --- Reusable InputField Component ---
interface InputFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any; // Type from react-hook-form's control
  name: string;
  label: string;
  placeholder?: string;
  type?: string; // Optional for password fields
}

const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = "text", // Default type is text
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-base font-bold">{label}</FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
            className=""
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// --- Original RegisterForm Component ---
const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    city: z.string().min(1, "City is required"),
    postal_code: z
      .string()
      .min(1, "Postal code is required")
      .regex(/^\d{4,}$/, "Invalid postal code"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPass: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
    acceptedTnC: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Passwords do not match",
    path: ["confirmPass"],
  });

export default function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      postal_code: "",
      password: "",
      confirmPass: "",
      acceptedTnC: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const finalizer = {
        full_name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPass,
        city: values.city,
      };
      console.log(finalizer);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-4">
          <InputField
            control={form.control}
            name="name"
            label="Full Name"
            // placeholder="John Doe"
          />

          <InputField
            control={form.control}
            name="email"
            label="E-mail"
            type="email"
          />

          <InputField control={form.control} name="city" label="City" />

          <InputField
            control={form.control}
            name="postal_code"
            label="Postal Code"
            type="number"
          />

          <InputField
            control={form.control}
            name="password"
            label="Password"
            type="password"
          />

          <InputField
            control={form.control}
            name="confirmPass"
            label="Confirm Password"
            type="password"
          />

          <FormField
            control={form.control}
            name="acceptedTnC"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-3 mt-10">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-2 border-blue-600 mt-0.5"
                  />
                </FormControl>
                <div className="space-y-0.5">
                  <FormLabel className="font-medium text-sm text-blue-600/80">
                    <span>
                      Please accept the{" "}
                      <Link
                        href="/tnc"
                        className="underline text-blue-700 hover:text-blue-800 transition-colors"
                      >
                        Terms and Conditions
                      </Link>
                    </span>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button className="w-full !mt-12" type="submit">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
