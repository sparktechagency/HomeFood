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
    address: z.string().min(1, "Address is required"),
    postal_code: z
      .string()
      .min(1, "Postal code is required")
      .regex(/^\d{4,}$/, "Invalid postal code"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPass: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
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
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
            placeholder=""
            type="email"
          />

          <InputField
            control={form.control}
            name="city"
            label="City"
            placeholder=""
          />
          <InputField
            control={form.control}
            name="address"
            label="Address"
            placeholder=""
          />

          <InputField
            control={form.control}
            name="postal_code"
            label="Postal Code"
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

          <div className="flex items-center gap-2 !mt-12 text-blue-600/80">
            <Checkbox className="border-2 border-blue-600" />
            <Label className="!space-x-0 gap-1 font-semibold">
              Please accept the
              <Link href={"/tnc"} className="underline">
                Terms and conditions
              </Link>
            </Label>
          </div>

          <Button className="w-full !mt-12" type="submit">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
