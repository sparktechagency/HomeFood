// "use client";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CalendarIcon, Upload } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import type React from "react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { useAddAfooditemMutation } from "@/redux/features/Seller/SellerApi";
// import { toast } from "sonner";
// import { useGetAllCategorysQuery } from "@/redux/features/categorys/CategoryApi";

// const formSchema = z.object({
//   category: z.string().min(1, "Please select a category"),
//   title: z.string().min(1, "Please enter a title"),
//   ingredients: z.string().min(1, "Please enter ingredients"),
//   description: z.string().min(1, "Please enter a description"),
//   dietaryInfo: z.string().min(1, "Please select dietary info"),
//   price: z.string().min(1, "Please enter a price"),
//   quantityAvailability: z.string().min(1, "Please enter quantity"),
//   image: z.any().optional(),
//   containerSize: z.string().optional(),
//   containerWeight: z.string().optional(),
//   deliveryOption: z.enum(["delivery", "pickup", "both"]),
//   minimumOrder: z.string().min(1, "Please enter minimum order"),
//   deliveryFee: z.string().min(1, "Please enter delivery fee"),
//   deliveryDate: z.date({
//     required_error: "Please select a delivery date",
//   }),
//   deliveryTime: z.string(),
// });

// export default function Page() {

//   const [addAfooditem, { isLoading }] = useAddAfooditemMutation();
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const { data: allCategorys } = useGetAllCategorysQuery({});
//   console.log('allCategorys', allCategorys?.data?.data);
//   // This creates an array of objects, e.g., [{id: 1, name: "Vegetables"}, {id: 2, name: "Fruits"}]
//   const categories = allCategorys?.data?.data?.map((category: any) => ({
//     id: category.id,
//     name: category.name
//   })) || [];


//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       category: "",
//       title: "",
//       ingredients: "",
//       description: "",
//       dietaryInfo: "",
//       price: "",
//       quantityAvailability: "",
//       containerSize: "",
//       containerWeight: "",
//       deliveryOption: "delivery",
//       minimumOrder: "",
//       deliveryFee: "",
//       deliveryTime: "",
//     },
//   });


//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedImage(file);
//       form.setValue("image", file);
//     }
//   };


//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     const formData = new FormData();

//     formData.append("category_id", values.category);
//     formData.append("title", values.title);
//     formData.append("ingredients", values.ingredients);
//     formData.append("description", values.description);
//     formData.append("dietary_info", values.dietaryInfo);
//     formData.append("price", values.price.toString());
//     formData.append("quantity", values.quantityAvailability.toString());
//     formData.append("container_size", values.containerSize?.toString() || "");
//     formData.append("container_weight", values.containerWeight?.toString() || "");
//     formData.append("delivery_option", values.deliveryOption);
//     formData.append("minimum_order", values.minimumOrder.toString());
//     formData.append("delivery_fee", values.deliveryFee.toString());
//     formData.append("delivery_time", values.deliveryTime);


//     if (selectedImage) {
//       formData.append("images[]", selectedImage);
//     }

//     formData.forEach((value, key) => {
//       console.log(`${key}:`, value, `(type: ${typeof value})`);
//     });

//     try {


//       const response = await addAfooditem(formData).unwrap();
//       console.log('response', response);

//       if (response?.success) {
//         toast.success(response?.message || "Registration successful!");
//         form.reset();

//       } else {
//         toast.error(response?.message || "Registration failed. Please try again.");
//       }

//     } catch (error: any) {
//       console.log('error', error);
//       toast.error(error?.data?.message || "An error occurred. Please try again.");

//     }
//   };


//   return (
//     <div className="w-full p-6!">
//       <div className="mb-6!">
//         <h1 className="text-2xl! font-bold!">Add your food item</h1>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6!">
//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Select Category</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select your product category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {/* Check if categories are loaded before trying to map */}
//                     {categories.length > 0 ? (
//                       categories.map((category: { id: number; name: string }) => (
//                         <SelectItem
//                           key={category.id}
//                           // The value submitted to the form must be the ID.
//                           // It's important to convert the ID to a string.
//                           value={String(category.id)}
//                         >
//                           {/* This is the name the user sees in the dropdown */}
//                           {category.name}
//                         </SelectItem>
//                       ))
//                     ) : (
//                       // Optional: Show a loading or empty message
//                       <SelectItem value="loading" disabled>
//                         Loading categories...
//                       </SelectItem>
//                     )}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Please enter your full name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="ingredients"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Ingredients</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter ingredients of food" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter description of food" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="dietaryInfo"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Select Dietary Info</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select your dietary info" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="vegetarian">Vegetarian</SelectItem>
//                     <SelectItem value="vegan">Vegan</SelectItem>
//                     <SelectItem value="gluten-free">Gluten Free</SelectItem>
//                     <SelectItem value="dairy-free">Dairy Free</SelectItem>
//                     <SelectItem value="keto">Keto</SelectItem>
//                     <SelectItem value="halal">Halal</SelectItem>
//                     <SelectItem value="none">None</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="price"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Price</FormLabel>
//                 <FormControl>
//                   <Input

//                     placeholder="Please enter service price"
//                     type="number"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="quantityAvailability"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Quantity Availability</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Please enter your quantity" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="image"
//             // eslint-disable-next-line @typescript-eslint/no-unused-vars
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Image of the Food</FormLabel>
//                 <div className="border-2! border-dashed! border-gray-300! rounded-lg! p-8!">
//                   <div className="text-center!">
//                     <p className="text-sm! text-gray-600! mb-4!">
//                       Add Food Image
//                     </p>
//                     <div className="flex! justify-center!">
//                       <label htmlFor="image-upload" className="cursor-pointer!">
//                         <div className="flex! items-center! gap-2! bg-gray-100! hover:bg-gray-200! px-4! py-2! rounded-md! transition-colors!">
//                           <Upload className="w-4! h-4!" />
//                           <span className="text-sm!">Upload Image</span>
//                         </div>
//                         <input
//                           id="image-upload"
//                           type="file"
//                           accept="image/*"
//                           className="hidden!"
//                           onChange={handleImageChange}
//                         />
//                       </label>
//                     </div>
//                     {selectedImage && (
//                       <p className="text-sm! text-green-600! mt-2!">
//                         {selectedImage.name}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="containerSize"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   Container Size{" "}
//                   <span className="text-gray-500!">(optional)</span>
//                 </FormLabel>
//                 <FormControl>
//                   <Input placeholder="Please enter container size" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="containerWeight"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   Container Weight{" "}
//                   <span className="text-gray-500!">(optional)</span>
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Please enter container weight"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="deliveryOption"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Delivery Option</FormLabel>
//                 <FormControl>
//                   <RadioGroup
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                     className="flex! gap-6!"
//                   >
//                     <div className="flex! items-center! space-x-2!">
//                       <RadioGroupItem value="delivery" id="delivery" />
//                       <label htmlFor="delivery" className="text-sm!">
//                         Delivery
//                       </label>
//                     </div>
//                     <div className="flex! items-center! space-x-2!">
//                       <RadioGroupItem value="pickup" id="pickup" />
//                       <label htmlFor="pickup" className="text-sm!">
//                         Pickup
//                       </label>
//                     </div>
//                     <div className="flex! items-center! space-x-2!">
//                       <RadioGroupItem value="both" id="both" />
//                       <label htmlFor="both" className="text-sm!">
//                         Both
//                       </label>
//                     </div>
//                   </RadioGroup>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="minimumOrder"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Minimum Order for Delivery</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Please enter service price" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="deliveryFee"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Delivery Fee</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Please enter service price" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="deliveryDate"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Delivery Date</FormLabel>
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <FormControl>
//                       <Button
//                         variant="outline"
//                         className={cn(
//                           "w-full! pl-3! text-left! font-normal!",
//                           !field.value && "text-muted-foreground!"
//                         )}
//                       >
//                         {field.value ? (
//                           format(field.value, "PPP")
//                         ) : (
//                           <span>Pick a date</span>
//                         )}
//                         <CalendarIcon className="ml-auto! h-4! w-4! opacity-50!" />
//                       </Button>
//                     </FormControl>
//                   </PopoverTrigger>
//                   <PopoverContent className="w-auto! p-0!" align="start">
//                     <Calendar
//                       mode="single"
//                       selected={field.value}
//                       onSelect={field.onChange}
//                       disabled={(date) =>
//                         date < new Date() || date < new Date("1900-01-01")
//                       }
//                       initialFocus
//                     />
//                   </PopoverContent>
//                 </Popover>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="deliveryTime"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Delivery Time</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Please enter delivery time"
//                     {...field}
//                     type="time"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button type="submit" className="w-full! bg-primary">
//             {isLoading ? "Adding..." : "Add"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }



// "use client";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Upload } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import type React from "react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useAddAfooditemMutation } from "@/redux/features/Seller/SellerApi";
// import { toast } from "sonner";
// import { useGetAllCategorysQuery } from "@/redux/features/categorys/CategoryApi";

// // --- 1. MODIFIED ZOD SCHEMA ---
// const formSchema = z.object({
//   category: z.string().min(1, "Please select a category"),
//   title: z.string().min(1, "Please enter a title"),
//   ingredients: z.string().min(1, "Please enter ingredients"),
//   description: z.string().min(1, "Please enter a description"),
//   dietaryInfo: z.string().min(1, "Please select dietary info"),
//   price: z.string().min(1, "Please enter a price"),
//   quantityAvailability: z.string().min(1, "Please enter quantity"),
//   image: z.any().optional(),
//   containerSize: z.string().optional(),
//   containerWeight: z.string().optional(),
//   deliveryOption: z.enum(["delivery", "pickup", "both"]),
//   minimumOrder: z.string().min(1, "Please enter minimum order"),
//   deliveryFee: z.string().min(1, "Please enter delivery fee"),
//   // Replaced `deliveryTime` with start and end times
//   deliveryStartTime: z.string().min(1, "Start time is required"),
//   deliveryEndTime: z.string().min(1, "End time is required"),
// });

// export default function Page() {
//   const [addAfooditem, { isLoading }] = useAddAfooditemMutation();
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const { data: allCategorys } = useGetAllCategorysQuery({});

//   const categories =
//     allCategorys?.data?.data?.map((category: any) => ({
//       id: category.id,
//       name: category.name,
//     })) || [];

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     // --- 2. MODIFIED DEFAULT VALUES ---
//     defaultValues: {
//       category: "",
//       title: "",
//       ingredients: "",
//       description: "",
//       dietaryInfo: "",
//       price: "",
//       quantityAvailability: "",
//       containerSize: "",
//       containerWeight: "",
//       deliveryOption: "delivery",
//       minimumOrder: "",
//       deliveryFee: "",
//       // Added new default values
//       deliveryStartTime: "",
//       deliveryEndTime: "",
//     },
//   });

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedImage(file);
//       form.setValue("image", file);
//     }
//   };

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     // --- 3. ADDED TIME FORMATTING LOGIC ---
//     const formatTime = (time24: string) => {
//       if (!time24) return "";
//       const [hours, minutes] = time24.split(":");
//       let h = parseInt(hours, 10);
//       const ampm = h >= 12 ? "PM" : "AM";
//       h %= 12;
//       h = h || 12; // The hour '0' should be '12'
//       const hStr = h < 10 ? `0${h}` : h;
//       return `${hStr}:${minutes} ${ampm}`;
//     };

//     const formattedStartTime = formatTime(values.deliveryStartTime);
//     const formattedEndTime = formatTime(values.deliveryEndTime);
//     const finalDeliveryTime = `${formattedStartTime} - ${formattedEndTime}`;

//     // --- 4. UPDATED SUBMISSION LOGIC ---
//     const formData = new FormData();
//     formData.append("category_id", values.category);
//     formData.append("title", values.title);
//     formData.append("ingredients", values.ingredients);
//     formData.append("description", values.description);
//     formData.append("dietary_info", values.dietaryInfo);
//     formData.append("price", values.price.toString());
//     formData.append("quantity", values.quantityAvailability.toString());
//     formData.append("container_size", values.containerSize?.toString() || "");
//     formData.append("container_weight", values.containerWeight?.toString() || "");
//     formData.append("delivery_option", values.deliveryOption);
//     formData.append("minimum_order", values.minimumOrder.toString());
//     formData.append("delivery_fee", values.deliveryFee.toString());
//     // Append the newly formatted time string
//     formData.append("delivery_time", finalDeliveryTime);

//     if (selectedImage) {
//       formData.append("images[]", selectedImage);
//     }

//     try {
//       const response = await addAfooditem(formData).unwrap();
//       if (response?.success) {
//         toast.success(response?.message || "Food item added successfully!");
//         form.reset();
//         setSelectedImage(null); // Clear the selected image state
//       } else {
//         toast.error(response?.message || "Operation failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error adding food item:", error);
//       toast.error("An unexpected error occurred.");
//     }
//   };

//   return (
//     <div className="w-full p-6!">
//       <div className="mb-6!">
//         <h1 className="text-2xl! font-bold!">Add your food item</h1>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6!">
//           {/* ... other form fields remain the same ... */}
//           <FormField
//             control={form.control}
//             name="category"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Select Category</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger className="w-full">
//                       <SelectValue placeholder="Select your product category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {categories.length > 0 ? (
//                       categories.map((category: { id: number; name: string }) => (
//                         <SelectItem
//                           key={category.id}
//                           value={String(category.id)}
//                         >
//                           {category.name}
//                         </SelectItem>
//                       ))
//                     ) : (
//                       <SelectItem value="loading" disabled>
//                         Loading categories...
//                       </SelectItem>
//                     )}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Please enter your full name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="ingredients"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Ingredients</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter ingredients of food" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter description of food" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="dietaryInfo"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Select Dietary Info</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select your dietary info" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="vegetarian">Vegetarian</SelectItem>
//                     <SelectItem value="vegan">Vegan</SelectItem>
//                     <SelectItem value="gluten-free">Gluten Free</SelectItem>
//                     <SelectItem value="dairy-free">Dairy Free</SelectItem>
//                     <SelectItem value="keto">Keto</SelectItem>
//                     <SelectItem value="halal">Halal</SelectItem>
//                     <SelectItem value="none">None</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="price"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Price</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Please enter service price"
//                     type="number"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="quantityAvailability"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Quantity Availability</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Please enter your quantity" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="image"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Image of the Food</FormLabel>
//                 <div className="border-2! border-dashed! border-gray-300! rounded-lg! p-8!">
//                   <div className="text-center!">
//                     <p className="text-sm! text-gray-600! mb-4!">
//                       Add Food Image
//                     </p>
//                     <div className="flex! justify-center!">
//                       <label htmlFor="image-upload" className="cursor-pointer!">
//                         <div className="flex! items-center! gap-2! bg-gray-100! hover:bg-gray-200! px-4! py-2! rounded-md! transition-colors!">
//                           <Upload className="w-4! h-4!" />
//                           <span className="text-sm!">Upload Image</span>
//                         </div>
//                         <input
//                           id="image-upload"
//                           type="file"
//                           accept="image/*"
//                           className="hidden!"
//                           onChange={handleImageChange}
//                         />
//                       </label>
//                     </div>
//                     {selectedImage && (
//                       <p className="text-sm! text-green-600! mt-2!">
//                         {selectedImage.name}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="containerSize"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   Container Size{" "}
//                   <span className="text-gray-500!">(optional)</span>
//                 </FormLabel>
//                 <FormControl>
//                   <Input placeholder="Please enter container size" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="containerWeight"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>
//                   Container Weight{" "}
//                   <span className="text-gray-500!">(optional)</span>
//                 </FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Please enter container weight"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="deliveryOption"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Delivery Option</FormLabel>
//                 <FormControl>
//                   <RadioGroup
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                     className="flex! gap-6!"
//                   >
//                     <div className="flex! items-center! space-x-2!">
//                       <RadioGroupItem value="delivery" id="delivery" />
//                       <label htmlFor="delivery" className="text-sm!">
//                         Delivery
//                       </label>
//                     </div>
//                     <div className="flex! items-center! space-x-2!">
//                       <RadioGroupItem value="pickup" id="pickup" />
//                       <label htmlFor="pickup" className="text-sm!">
//                         Pickup
//                       </label>
//                     </div>
//                     <div className="flex! items-center! space-x-2!">
//                       <RadioGroupItem value="both" id="both" />
//                       <label htmlFor="both" className="text-sm!">
//                         Both
//                       </label>
//                     </div>
//                   </RadioGroup>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="minimumOrder"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Minimum Order for Delivery</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Please enter service price" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="deliveryFee"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Delivery Fee</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Please enter service price" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* --- 5. REPLACED DELIVERY TIME FIELD --- */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <FormField
//               control={form.control}
//               name="deliveryStartTime"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Delivery Start Time</FormLabel>
//                   <FormControl>
//                     <Input type="time" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="deliveryEndTime"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Delivery End Time</FormLabel>
//                   <FormControl>
//                     <Input type="time" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <Button type="submit" className="w-full! bg-primary" disabled={isLoading}>
//             {isLoading ? "Adding..." : "Add Food Item"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }



"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddAfooditemMutation } from "@/redux/features/Seller/SellerApi";
import { toast } from "sonner";
import { useGetAllCategorysQuery } from "@/redux/features/categorys/CategoryApi";


// --- 1. MODIFIED ZOD SCHEMA ---
const formSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  title: z.string().min(1, "Please enter a title"),
  ingredients: z.string().min(1, "Please enter ingredients"),
  description: z.string().min(1, "Please enter a description"),
  dietaryInfo: z.string().min(1, "Please select dietary info"),
  price: z.string().min(1, "Please enter a price"),
  quantityAvailability: z.string().min(1, "Please enter quantity"),
  // Updated to accept an array of files
  image: z.array(z.any()).optional(),
  containerSize: z.string().optional(),
  containerWeight: z.string().optional(),
  deliveryOption: z.enum(["delivery", "pickup", "both"]),
  minimumOrder: z.string().min(1, "Please enter minimum order"),
  deliveryFee: z.string().min(1, "Please enter delivery fee"),
  deliveryStartTime: z.string().min(1, "Start time is required"),
  deliveryEndTime: z.string().min(1, "End time is required"),
});


export default function Page() {
  const [addAfooditem, { isLoading }] = useAddAfooditemMutation();
  // --- 2. MODIFIED STATE FOR IMAGES ---
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const { data: allCategorys } = useGetAllCategorysQuery({});


  const categories =
    allCategorys?.data?.data?.map((category: any) => ({
      id: category.id,
      name: category.name,
    })) || [];


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      ingredients: "",
      description: "",
      dietaryInfo: "",
      price: "",
      quantityAvailability: "",
      containerSize: "",
      containerWeight: "",
      deliveryOption: "delivery",
      minimumOrder: "",
      deliveryFee: "",
      deliveryStartTime: "",
      deliveryEndTime: "",
      // Initialize image as an empty array
      image: [],
    },
  });


  // --- 4. UPDATED IMAGE CHANGE HANDLER ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert FileList to an array
      const newImages = Array.from(files);
      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
      // Update the form value with the new array of files
      form.setValue("image", newImages);
    }
  };


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formatTime = (time24: string) => {
      if (!time24) return "";
      const [hours, minutes] = time24.split(":");
      let h = parseInt(hours, 10);
      const ampm = h >= 12 ? "PM" : "AM";
      h %= 12;
      h = h || 12; // The hour '0' should be '12'
      const hStr = h < 10 ? `0${h}` : h;
      return `${hStr}:${minutes} ${ampm}`;
    };


    const formattedStartTime = formatTime(values.deliveryStartTime);
    const formattedEndTime = formatTime(values.deliveryEndTime);
    const finalDeliveryTime = `${formattedStartTime} - ${formattedEndTime}`;


    const formData = new FormData();
    formData.append("category_id", values.category);
    formData.append("title", values.title);
    formData.append("ingredients", values.ingredients);
    formData.append("description", values.description);
    formData.append("dietary_info", values.dietaryInfo);
    formData.append("price", values.price.toString());
    formData.append("quantity", values.quantityAvailability.toString());
    formData.append("container_size", values.containerSize?.toString() || "");
    formData.append("container_weight", values.containerWeight?.toString() || "");
    formData.append("delivery_option", values.deliveryOption);
    formData.append("minimum_order", values.minimumOrder.toString());
    formData.append("delivery_fee", values.deliveryFee.toString());
    formData.append("delivery_time", finalDeliveryTime);


    // --- 5. ADJUSTED FORM DATA APPENDING ---
    selectedImages.forEach((image) => {
      formData.append("images[]", image);
    });


    try {
      const response = await addAfooditem(formData).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Food item added successfully!");
        form.reset();
        setSelectedImages([]); // Clear selected images
      } else {
        toast.error(response?.message || "Operation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      toast.error("An unexpected error occurred.");
    }
  };


  return (
    <div className="w-full p-6!">
      <div className="mb-6!">
        <h1 className="text-2xl! font-bold!">Add your food item</h1>
      </div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6!">
          {/* ... other form fields remain the same ... */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your product category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((category: { id: number; name: string }) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="loading" disabled>
                        Loading categories...
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ingredients of food" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description of food" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="dietaryInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Dietary Info</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your dietary info" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Gluten Free</SelectItem>
                    <SelectItem value="dairy-free">Dairy Free</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="halal">Halal</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter service price"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="quantityAvailability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity Availability</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter your quantity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image of the Food</FormLabel>
                <div className="border-2! border-dashed! border-gray-300! rounded-lg! p-8!">
                  <div className="text-center!">
                    <p className="text-sm! text-gray-600! mb-4!">
                      Add Food Images
                    </p>
                    <div className="flex! justify-center!">
                      <label htmlFor="image-upload" className="cursor-pointer!">
                        <div className="flex! items-center! gap-2! bg-gray-100! hover:bg-gray-200! px-4! py-2! rounded-md! transition-colors!">
                          <Upload className="w-4! h-4!" />
                          <span className="text-sm!">Upload Images</span>
                        </div>
                        {/* --- 3. ADDED MULTIPLE ATTRIBUTE --- */}
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden!"
                          onChange={handleImageChange}
                          multiple
                        />
                      </label>
                    </div>
                    {/* --- 6. DISPLAY SELECTED IMAGES --- */}
                    {selectedImages.length > 0 && (
                      <div className="mt-2!">
                        <p className="text-sm! text-gray-600! mb-1!">
                          Selected Images:
                        </p>
                        <ul>
                          {selectedImages.map((image) => (
                            <li key={image.name} className="text-sm! text-green-600!">
                              {image.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="containerSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Container Size{" "}
                  <span className="text-gray-500!">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Please enter container size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="containerWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Container Weight{" "}
                  <span className="text-gray-500!">(optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter container weight"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="deliveryOption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Option</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex! gap-6!"
                  >
                    <div className="flex! items-center! space-x-2!">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <label htmlFor="delivery" className="text-sm!">
                        Delivery
                      </label>
                    </div>
                    <div className="flex! items-center! space-x-2!">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <label htmlFor="pickup" className="text-sm!">
                        Pickup
                      </label>
                    </div>
                    <div className="flex! items-center! space-x-2!">
                      <RadioGroupItem value="both" id="both" />
                      <label htmlFor="both" className="text-sm!">
                        Both
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="minimumOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Order for Delivery</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter service price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="deliveryFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Fee</FormLabel>
                <FormControl>
                  <Input placeholder="Please enter service price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="deliveryStartTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Start Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryEndTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery End Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <Button type="submit" className="w-full! bg-primary" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Food Item"}
          </Button>
        </form>
      </Form>
    </div>
  );
}