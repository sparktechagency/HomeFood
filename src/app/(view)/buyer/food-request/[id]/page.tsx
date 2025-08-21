// "use client";

// import React from "react";
// import ProfilePart from "@/components/core/profile-part";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
// import { useParams } from "next/navigation";
// import { useGetuserDetailsByIdQuery } from "@/redux/features/Seller/SellerApi";

// const formSchema = z.object({
//   dish_name: z
//     .string()
//     .min(1, { message: "Dish name is required." })
//     .max(100, { message: "Dish name cannot exceed 100 characters." }),
//   description: z
//     .string()
//     .max(300, { message: "Description cannot exceed 300 characters." })
//     .optional(),
//   dietary: z.string().min(1, { message: "Dietary information is required." }),
//   quantity: z
//     .string()
//     .min(1, { message: "Quantity is required." })
//     .regex(/^\d+$/, { message: "Quantity must be a whole number." }),
//   price: z
//     .string()
//     .min(1, { message: "Price is required." })
//     .regex(/^\d+(\.\d{1,2})?$/, {
//       message: "Price must be a valid number with up to two decimal places.",
//     }),
//   date: z
//     .string()
//     .min(1, { message: "Date is required." })
//     .refine((val) => !isNaN(new Date(val).getTime()), {
//       message: "Invalid date format or value.",
//     }),
//   time: z.string().min(1, { message: "Time is required." }),
//   location: z.string().min(1, { message: "Location is required." }),
//   link: z.string().url({ message: "Invalid URL format." }).optional(),
//   image: z
//     .union([
//       z.instanceof(File, { message: "Image must be a file." }),
//       z
//         .array(z.instanceof(File, { message: "Image must be a file." }))
//         .min(1, { message: "At least one image is required." }),
//     ])
//     .optional(),
// });

// type FormSchemaType = z.infer<typeof formSchema>;

// // Configuration for form fields
// const formFieldsConfig: Array<{
//   name: keyof FormSchemaType;
//   label: string;
//   component: React.ElementType; // e.g., Input, Textarea
//   type?: string; // HTML input type
//   placeholder?: string;
//   inputClassName?: string; // Specific class for the input/textarea element
//   selfStartLabel?: boolean; // For aligning label to the start (e.g., for textarea)
//   inputProps?: Record<string, unknown>; // For additional props like 'accept', 'multiple'
//   customOnChange?: (
//     event: React.ChangeEvent<HTMLInputElement>,
//     rhfOnChange: (...event: unknown[]) => void
//   ) => void;
// }> = [
//     {
//       name: "dish_name",
//       label: "Dish Name",
//       component: Input,
//       placeholder: "e.g., Chicken Biryani",
//     },
//     {
//       name: "description",
//       label: "Description",
//       component: Textarea,
//       placeholder: "Brief description of the dish...",
//       inputClassName: "min-h-[140px]",
//       selfStartLabel: true,
//     },
//     {
//       name: "dietary",
//       label: "Dietary Info",
//       component: Input,
//       placeholder: "e.g., Vegetarian, Halal, Gluten-free",
//     },
//     {
//       name: "quantity",
//       label: "Quantity",
//       component: Input,
//       type: "number",
//       placeholder: "e.g., 5",
//     },
//     {
//       name: "price",
//       label: "Price",
//       component: Input,
//       type: "text", // Using text to allow flexible input, Zod regex validates
//       placeholder: "e.g., 12.99",
//     },
//     {
//       name: "date",
//       label: "Date",
//       component: Input,
//       type: "date",
//     },
//     {
//       name: "time",
//       label: "Time",
//       component: Input,
//       type: "time",
//     },
//     {
//       name: "location",
//       label: "Location",
//       component: Input,
//       placeholder: "e.g., City Center Park",
//     },
//     {
//       name: "link",
//       label: "External Link",
//       component: Input,
//       type: "url",
//       placeholder: "e.g., https://example.com",
//     },
//     {
//       name: "image",
//       label: "Image(s)",
//       component: Input,
//       type: "file",
//       inputProps: {
//         accept: "image/*",
//         multiple: true, // Allows selecting multiple files, aligning with Array.from logic
//       },
//       // Custom onChange handler for file input to provide File[] or undefined to RHF
//       customOnChange: (event, rhfOnChange) => {
//         rhfOnChange(
//           event.target.files && event.target.files.length > 0
//             ? Array.from(event.target.files)
//             : undefined
//         );
//       },
//     },
//   ];

// export default function Page() {
//   const { id } = useParams();
//   const { data, isLoading, isError } = useGetuserDetailsByIdQuery(
//     { id },
//     {

//       skip: !id,
//     }
//   );
//   const user = data?.data?.user;

//   const form = useForm<FormSchemaType>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       dish_name: "",
//       description: "",
//       dietary: "",
//       quantity: "",
//       price: "",
//       date: "",
//       time: "",
//       location: "",
//       link: "",
//       image: undefined,
//     },
//   });

//   function onSubmit(values: FormSchemaType) {
//     console.log(values);
//     // You would typically send this data to an API
//   }

//   return (
//     <div className="!py-12 !px-4 md:!px-12 grid md:grid-cols-11 gap-6 mt-18">
//       <div className="md:col-span-3 border-2 rounded-lg !p-6 self-start">
//         <ProfilePart user={user} />
//       </div>

//       <div className="!mt-12 md:!mt-0 md:col-span-8">
//         <div>
//           <div className="flex flex-row justify-between items-center">
//             <div className="w-full">
//               <h2 className="text-xl md:text-3xl font-semibold text-green-700 text-center md:text-start">
//                 Create Food Request
//               </h2>
//             </div>
//           </div>
//           <div className="w-full !mt-6">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="!space-y-8"
//               >
//                 {formFieldsConfig.map((config) => (
//                   <FormField
//                     key={config.name}
//                     control={form.control}
//                     name={config.name}
//                     render={({ field }) => (
//                       <FormItem className="flex flex-col md:grid md:grid-cols-7 items-start md:items-center">
//                         <FormLabel
//                           className={`md:col-span-2 font-semibold ${config.selfStartLabel ? "self-start" : ""
//                             }`}
//                         >
//                           {config.label}:
//                         </FormLabel>
//                         <FormControl className="md:col-span-5">
//                           <config.component
//                             placeholder={config.placeholder}
//                             type={config.type}
//                             className={config.inputClassName}
//                             {...config.inputProps} // Spread custom input props (e.g., accept, multiple)
//                             {...field} // Spread RHF field props (name, onBlur, ref, etc.)
//                             // Conditionally set value for file inputs to prevent issues
//                             value={
//                               config.type === "file" ? undefined : field.value
//                             }
//                             // Handle onChange, using custom one if provided, else RHF's default
//                             onChange={(
//                               event: React.ChangeEvent<HTMLInputElement>
//                             ) => {
//                               if (config.customOnChange) {
//                                 config.customOnChange(event, field.onChange);
//                               } else {
//                                 field.onChange(event);
//                               }
//                             }}
//                           />
//                         </FormControl>
//                         <div className="col-start-3 col-span-5">
//                           <FormMessage />
//                         </div>
//                       </FormItem>
//                     )}
//                   />
//                 ))}

//                 <div className="flex flex-row justify-center items-center !mt-6">
//                   <Button type="submit">Submit Request</Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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

// 1. Schema updated to match API field names
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
  image: z.any().optional(), // z.any() is best for file inputs with RHF
});

type FormSchemaType = z.infer<typeof formSchema>;

// 2. Configuration updated to use API field names and remove extra fields
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
    defaultValues: { // 3. Default values updated to match API field names
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

    // Append all values to FormData. No mapping needed now.
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'image' && value && value.length > 0) {
        formData.append('image', value[0]); // Append the first file
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
                        {/* 4. FIX: Deconstruct field to handle file inputs correctly */}
                        <Input
                          placeholder={config.placeholder}
                          type={config.type}
                          {...form.register(config.name)} // Use register for better file handling
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