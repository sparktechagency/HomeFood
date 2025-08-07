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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useGetAllCategorysQuery } from "@/redux/features/categorys/CategoryApi";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  useGetFoodDetaisByIdQuery,
  useUpdateFooditemMutation,
} from "@/redux/features/Seller/SellerApi";
import { imageUrl } from "@/redux/baseApi";

// Zod schema for form validation
const formSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  title: z.string().min(1, "Please enter a title"),
  ingredients: z.string().min(1, "Please enter ingredients"),
  description: z.string().min(1, "Please enter a description"),
  dietaryInfo: z.string().min(1, "Please select dietary info"),
  price: z.string().min(1, "Please enter a price"),
  quantityAvailability: z.string().min(1, "Please enter quantity"),
  image: z.any().optional(),
  containerSize: z.string().optional(),
  containerWeight: z.string().optional(),
  deliveryOption: z.enum(["delivery", "pickup", "both"]),
  minimumOrder: z.string().min(1, "Please enter minimum order"),
  deliveryFee: z.string().min(1, "Please enter delivery fee"),
  deliveryDate: z
    .date({
      required_error: "Please select a delivery date",
    })
    .optional(),
  deliveryTime: z.string(),
});

export default function Page() {
  // 1. Get the food item ID from the URL parameters
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  // 2. Setup RTK Query hooks for API interaction
  const { data: foodData, isLoading: isFetching } = useGetFoodDetaisByIdQuery(id);
  const [updateFooditem, { isLoading: isUpdating }] = useUpdateFooditemMutation();
  const { data: allCategorys } = useGetAllCategorysQuery({});

  // 3. State for handling new and existing images
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  console.log('existingImageUrl', existingImageUrl);

  const categories =
    allCategorys?.data?.data?.map((category: any) => ({
      id: category.id,
      name: category.name,
    })) || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Default values are set once data is fetched inside useEffect
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
      deliveryTime: "",
    },
  });

  // 4. useEffect to populate the form when the food data is loaded
  useEffect(() => {
    if (foodData?.data) {
      const data = foodData.data;
      form.reset({
        category: String(data.category_id),
        title: data.title,
        ingredients: data.ingredients,
        description: data.description,
        dietaryInfo: data.dietary_info,
        price: String(data.price),
        quantityAvailability: String(data.quantity),
        containerSize: data.container_size || "",
        containerWeight: data.container_weight || "",
        deliveryOption: data.delivery_option,
        minimumOrder: String(data.minimum_order),
        deliveryFee: String(data.delivery_fee),
        deliveryTime: data.delivery_time,
      });

      if (data.images && data.images.length > 0) {
        setExistingImageUrl(`${imageUrl}${data.images[0]}`);
      }
    }
  }, [foodData, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      form.setValue("image", file);
      // Clear the existing image preview to show that a new image is selected
      if (existingImageUrl) {
        setExistingImageUrl(null);
      }
    }
  };

  // 5. Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    // Append _method PUT for Laravel or other frameworks that need it
    formData.append("_method", "PUT");

    // Append all form data
    formData.append("category_id", values.category);
    formData.append("title", values.title);
    formData.append("ingredients", values.ingredients);
    formData.append("description", values.description);
    formData.append("dietary_info", values.dietaryInfo);
    formData.append("price", values.price);
    formData.append("quantity", values.quantityAvailability);
    formData.append("container_size", values.containerSize || "");
    formData.append("container_weight", values.containerWeight || "");
    formData.append("delivery_option", values.deliveryOption);
    formData.append("minimum_order", values.minimumOrder);
    formData.append("delivery_fee", values.deliveryFee);
    formData.append("delivery_time", values.deliveryTime);

    // Only append a new image if the user has selected one
    if (selectedImage) {
      formData.append("images[]", selectedImage);
    }

    try {
      const response = await updateFooditem({ id, formData }).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Food item updated successfully!");
        router.push("/seller/dashboard/food-items");
      } else {
        toast.error(response?.message || "Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("An unexpected error occurred during the update.");
    }
  };

  if (isFetching) {
    return <div className="p-6">Loading food data...</div>;
  }

  return (
    <div className="w-full p-6!">
      <div className="mb-6!">
        <h1 className="text-2xl! font-bold!">Edit your food item</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6!">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your product category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category: any) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
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
                  <Input placeholder="Enter title of the food" {...field} />
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your dietary info" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                    <SelectItem value="dairy-free">Dairy-Free</SelectItem>
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
                    type="number"
                    placeholder="Please enter food price"
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
                  <Input
                    type="number"
                    placeholder="Please enter available quantity"
                    {...field}
                  />
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
                {existingImageUrl && (
                  <div className="my-4">
                    <p className="text-sm font-medium mb-2">Current Image:</p>
                    <Image
                      src={existingImageUrl}
                      alt="Current food item"
                      width={150}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                <div className="border-2! border-dashed! border-gray-300! rounded-lg! p-8!">
                  <div className="text-center!">
                    <p className="text-sm! text-gray-600! mb-4!">
                      {selectedImage
                        ? "New image selected"
                        : "Upload new image to replace current one"}
                    </p>
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer!"
                    >
                      <div className="flex! items-center! gap-2! bg-gray-100! hover:bg-gray-200! px-4! py-2! rounded-md! transition-colors!">
                        <Upload className="w-4! h-4!" />
                        <span className="text-sm!">Upload Image</span>
                      </div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden!"
                        onChange={handleImageChange}
                      />
                    </label>
                    {selectedImage && (
                      <p className="text-sm! text-green-600! mt-2!">
                        {selectedImage.name}
                      </p>
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
                  Container Size <span className="text-gray-500!">(optional)</span>
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
                    value={field.value}
                    className="flex! gap-6!"
                  >
                    <div className="flex! items-center! space-x-2!">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <label htmlFor="delivery">Delivery</label>
                    </div>
                    <div className="flex! items-center! space-x-2!">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <label htmlFor="pickup">Pickup</label>
                    </div>
                    <div className="flex! items-center! space-x-2!">
                      <RadioGroupItem value="both" id="both" />
                      <label htmlFor="both">Both</label>
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
                  <Input
                    type="number"
                    placeholder="Please enter minimum order quantity"
                    {...field}
                  />
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
                  <Input
                    type="number"
                    placeholder="Please enter delivery fee"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full! pl-3! text-left! font-normal!",
                          !field.value && "text-muted-foreground!"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto! h-4! w-4! opacity-50!" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto! p-0!" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Time</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter delivery time"
                    {...field}
                    type="time"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full! bg-primary" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Food Item"}
          </Button>
        </form>
      </Form>
    </div>
  );
}