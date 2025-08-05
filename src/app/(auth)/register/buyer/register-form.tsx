"use client";

import React, { useState } from "react";
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
import { useRegisterMutation } from "@/redux/features/AuthApi";
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

// --- Reusable Address Autocomplete Component ---
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
              fields={["formatted_address", "geometry.location"]}
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


// --- Updated RegisterForm Component for BUYER ---

const libraries: ("places")[] = ["places"];

// Updated Zod schema to include address, latitude, and longitude
const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    city: z.string().min(1, "City is required"),
    // Add address, lat, and long fields
    address: z.string().min(1, "Please select an address from the suggestions"),
    latitude: z.string().min(1, "Latitude is required. Please select a valid address."),
    longitude: z.string().min(1, "Longitude is required. Please select a valid address."),
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
  const router = useRouter();
  const [register, { isLoading, error }] = useRegisterMutation();
  console.log('errorrrrr', error);

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
      // Add default values for new fields
      address: "",
      latitude: "",
      longitude: "",
      postal_code: "",
      password: "",
      confirmPass: "",
      acceptedTnC: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("full_name", values.name);
      formData.append("email", values.email);
      formData.append("city", values.city);
      // Remove the hardcoded address and add the dynamic values
      formData.append("address", values.address);
      formData.append("latitude", values.latitude);
      formData.append("longitude", values.longitude);
      // Send values as plain strings. JSON.stringify is not needed for FormData.
      formData.append("postal_code", values.postal_code);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.confirmPass);
      formData.append("role", "BUYER");

      console.log("Submitting FormData for BUYER:");
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
      console.error('error', error);
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Something went wrong during registration.");
      }
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

          {/* --- Use the AddressAutocomplete component --- */}
          <AddressAutocomplete form={form} />

          <InputField control={form.control} placeholder="eg.1234" name="postal_code" label="Postal Code" />
          <InputField control={form.control} placeholder="******" name="password" label="Password" type="password" />
          <InputField control={form.control} placeholder="******" name="confirmPass" label="Confirm Password" type="password" />

          <FormField
            control={form.control}
            name="acceptedTnC"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-3 !mt-10">
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

          <Button className="w-full !mt-12" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
}