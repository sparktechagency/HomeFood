

"use client";

import React from "react";
import ProfilePart from "@/components/core/profile-part";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { useGetuserDetailsByIdQuery } from "@/redux/features/Seller/SellerApi";
import { useRequestForAfoodMutation } from "@/redux/features/Foodsitems/FoodApi";
import { toast } from "sonner";

const formSchema = z.object({
  dish_name: z.string().min(1, { message: "Dish name is required." }),
  description: z.string().max(500).optional(),
  dietary: z.string().min(1, { message: "Dietary info is required." }),
  quantity_needed: z.string().min(1, { message: "Quantity is required." }),
  preferred_price: z.string().min(1, { message: "Price is required." }),
  preferred_date: z.string().min(1, { message: "Date is required." }),
  preferred_time: z.string().min(1, { message: "Time is required." }),
  location: z.string().min(1, { message: "Location is required." }),
  link: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  image: z.any().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const formFieldsConfig: Array<{
  name: keyof FormSchemaType;
  label: string;
  component: React.ElementType;
  type?: string;
  placeholder?: string;
}> = [
    { name: "dish_name", label: "Dish Name", component: Input, placeholder: "e.g., Chicken Biryani" },
    { name: "description", label: "Description", component: Textarea, placeholder: "Briefly describe the dish..." },
    { name: "dietary", label: "Dietary Info", component: Input, placeholder: "e.g., Halal, Gluten-free" },
    { name: "quantity_needed", label: "Quantity Needed", component: Input, type: "number", placeholder: "e.g., 5" },
    { name: "preferred_price", label: "Preferred Price", component: Input, type: "number", placeholder: "e.g., 12.99" },
    { name: "preferred_date", label: "Preferred Date", component: Input, type: "date" },
    { name: "preferred_time", label: "Preferred Time", component: Input, type: "time" },
    { name: "location", label: "Location", component: Input, placeholder: "e.g., Gulshan 1, Dhaka" },
    { name: "link", label: "Reference Link", component: Input, type: "url", placeholder: "https://example.com/dish_photo" },
    { name: "image", label: "Image", component: Input, type: "file" },
  ];

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const { data } = useGetuserDetailsByIdQuery({ id }, { skip: !id });
  const user = data?.data?.user;
  const [requestForAfood, { isLoading }] = useRequestForAfoodMutation();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dish_name: "",
      description: "",
      dietary: "",
      quantity_needed: "",
      preferred_price: "",
      preferred_date: "",
      preferred_time: "",
      location: "",
      link: "",
      image: undefined,
    },
  });

  async function onSubmit(values: FormSchemaType) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === 'image' && value && value.length > 0) {
        formData.append('image', value[0]);
      } else if (value) {
        formData.append(key, value as string);
      }
    });

    try {
      const res = await requestForAfood({ id, body: formData }).unwrap();
      toast.success(res?.message || "Food request submitted!");
      form.reset();

    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit request.");
    }
  }

  return (
    <div className="!py-12 !px-4 md:!px-12 grid md:grid-cols-11 gap-6 mt-18">
      <div className="md:col-span-3 border-2 rounded-lg !p-6 self-start">
        <ProfilePart user={user} />
      </div>

      <div className="!mt-12 md:!mt-0 md:col-span-8">
        <h2 className="text-xl md:text-3xl font-semibold text-green-700 text-center md:text-start">
          Create Food Request
        </h2>
        <div className="w-full !mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-8">
              {formFieldsConfig.map((config) => (
                <FormField
                  key={config.name}
                  control={form.control}
                  name={config.name}
                  render={({ field }) => (
                    <FormItem className="flex flex-col md:grid md:grid-cols-7 items-start md:items-center">
                      <FormLabel className="md:col-span-2 font-semibold">
                        {config.label}:
                      </FormLabel>
                      <FormControl className="md:col-span-5">
                        <Input
                          placeholder={config.placeholder}
                          type={config.type}
                          {...form.register(config.name)}
                        />
                      </FormControl>
                      <div className="col-start-3 col-span-5">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              ))}
              <div className="flex flex-row justify-center items-center !mt-6">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}