"use client";

import React, { useState, useRef, useCallback } from "react";
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
import { useRegisterMutation } from "@/redux/features/AuthApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

// --- Reusable InputField Component (No changes needed) ---
interface InputFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
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

// --- NEW Address Autocomplete Component ---
const AddressAutocomplete = ({ form }: { form: any }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (ac: google.maps.places.Autocomplete) => {
    setAutocomplete(ac);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const address = place.formatted_address || "";
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();

      if (address && lat && lng) {
        form.setValue("address", address, { shouldValidate: true });
        form.setValue("latitude", String(lat), { shouldValidate: true });
        form.setValue("longitude", String(lng), { shouldValidate: true });
      } else {
        toast.error("Could not get location details. Please select a valid address from the list.");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-bold">Address</FormLabel>
          <FormControl>
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              fields={["formatted_address", "geometry.location"]} // Optimize API cost by requesting only needed fields
            >
              <Input
                placeholder="Start typing your address..."
                {...field}
              />
            </Autocomplete>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};


// --- Updated RegisterForm Component ---

// Define the libraries to load for Google Maps
const libraries: ("places")[] = ["places"];

// Updated Zod schema to include latitude and longitude
const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Please select an address from the suggestions"),
    postal_code: z
      .string()
      .min(1, "Postal code is required")
      .regex(/^\d{4,}$/, "Invalid postal code"),
    // Add latitude and longitude to the schema
    latitude: z.string().min(1, "Latitude is required. Please select a valid address."),
    longitude: z.string().min(1, "Longitude is required. Please select a valid address."),
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
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_Maps_API_KEY as string,
    libraries,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      address: "",
      postal_code: "",
      // Add default values for lat/lng
      latitude: "",
      longitude: "",
      password: "",
      confirmPass: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("full_name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.confirmPass);
      formData.append("city", values.city);
      formData.append("address", values.address);
      formData.append("postal_code", values.postal_code);
      formData.append("role", "SELLER");
      // Append latitude and longitude
      formData.append("latitude", values.latitude);
      formData.append("longitude", values.longitude);

      console.log("Submitting FormData:");
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const response = await register(formData).unwrap();
      console.log('response', response);

      if (response?.success) {
        toast.success(response?.message || "Registration successful!");
        form.reset();
        router.push(`/verify-otp?isRegisterpage=true&email=${values?.email}`);
      } else {
        toast.error(response?.message || "Registration failed. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "An unexpected error occurred during registration.");
    }
  }

  if (loadError) return <div>Error loading maps. Please check your API key and configuration.</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-4">
          <InputField control={form.control} placeholder="eg.mehedi" name="name" label="Full Name" />
          <InputField control={form.control} placeholder="eg.mehedi@gmail.com" name="email" label="E-mail" type="email" />
          <InputField control={form.control} placeholder="eg.Dhaka" name="city" label="City" />

          {/* --- Use the new AddressAutocomplete component --- */}
          <AddressAutocomplete form={form} />

          <InputField control={form.control} placeholder="1234" name="postal_code" label="Postal Code" />
          <InputField control={form.control} placeholder="******" name="password" label="Password" type="password" />
          <InputField control={form.control} placeholder="******" name="confirmPass" label="Confirm Password" type="password" />

          <div className="flex items-center gap-2 !mt-12 text-blue-600/80">
            <Checkbox className="border-2 border-blue-600" id="tnc-checkbox" />
            <Label htmlFor="tnc-checkbox" className="!space-x-0 gap-1 font-semibold">
              Please accept the
              <Link href={"/tnc"} className="underline">
                Terms and conditions
              </Link>
            </Label>
          </div>

          <Button className="w-full !mt-12" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
}