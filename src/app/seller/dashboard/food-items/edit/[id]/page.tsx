
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
import { Trash2, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useGetAllCategorysQuery } from "@/redux/features/categorys/CategoryApi";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  useGetFoodDetaisByIdQuery,
  useUpdateFooditemMutation,
} from "@/redux/features/Seller/SellerApi";
import { imageUrl } from "@/redux/baseApi";

// --- 1. UPDATED ZOD SCHEMA FOR TIME AND IMAGES ---
const formSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  title: z.string().min(1, "Please enter a title"),
  ingredients: z.string().min(1, "Please enter ingredients"),
  description: z.string().min(1, "Please enter a description"),
  dietaryInfo: z.string().min(1, "Please select dietary info"),
  price: z.string().min(1, "Please enter a price"),
  quantityAvailability: z.string().min(1, "Please enter quantity"),
  image: z.array(z.any()).optional(), // For new uploads
  containerSize: z.string().optional(),
  containerWeight: z.string().optional(),
  deliveryOption: z.enum(["delivery", "pickup", "both"]),
  minimumOrder: z.string().min(1, "Please enter minimum order"),
  deliveryFee: z.string().min(1, "Please enter delivery fee"),
  // Separate fields for time inputs
  deliveryStartTime: z.string().min(1, "Start time is required"),
  deliveryEndTime: z.string().min(1, "End time is required"),
});

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data: foodResponse, isLoading: isFetching } = useGetFoodDetaisByIdQuery(id);
  const [updateFooditem, { isLoading: isUpdating }] = useUpdateFooditemMutation();
  const { data: allCategorys } = useGetAllCategorysQuery({});

  // --- 2. ADVANCED STATE FOR IMAGE MANAGEMENT ---
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

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
      image: [],
    },
  });

  // --- 3. HELPER FUNCTION TO PARSE 12-HOUR TIME TO 24-HOUR FORMAT ---
  const parse12HourTime = (timeStr: string): string => {
    if (!timeStr) return "";
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier.toUpperCase() === "PM") {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  // --- 4. USEEFFECT TO POPULATE FORM WITH EXISTING DATA ---
  useEffect(() => {
    if (foodResponse?.data?.food) {
      const foodData = foodResponse.data.food;

      // Parse delivery time
      const [startTime12, endTime12] = foodData.delivery_time.split(" - ");
      const startTime24 = parse12HourTime(startTime12);
      const endTime24 = parse12HourTime(endTime12);

      form.reset({
        category: String(foodData.category_id),
        title: foodData.title,
        ingredients: foodData.ingredients,
        description: foodData.description,
        dietaryInfo: foodData.dietary_info,
        price: String(foodData.price),
        quantityAvailability: String(foodData.quantity),
        containerSize: foodData.container_size || "",
        containerWeight: foodData.container_weight || "",
        deliveryOption: foodData.delivery_option,
        minimumOrder: String(foodData.minimum_order),
        deliveryFee: String(foodData.delivery_fee),
        deliveryStartTime: startTime24,
        deliveryEndTime: endTime24,
      });

      if (foodData.images) {
        setExistingImages(foodData.images);
      }
    }
  }, [foodResponse, form]);

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...filesArray]);
    }
  };

  const handleRemoveExistingImage = (imageUrlToRemove: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== imageUrlToRemove));
    setImagesToRemove((prev) => [...prev, imageUrlToRemove]);
  };

  const handleRemoveNewImage = (imageNameToRemove: string) => {
    setNewImages((prev) => prev.filter((img) => img.name !== imageNameToRemove));
  };

  // --- 5. UPDATED SUBMISSION HANDLER ---
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Format time back to 12-hour format for the API
    const formatTime = (time24: string) => {
      if (!time24) return "";
      const [hours, minutes] = time24.split(":");
      let h = parseInt(hours, 10);
      const ampm = h >= 12 ? "PM" : "AM";
      h %= 12;
      h = h || 12;
      return `${String(h).padStart(2, '0')}:${minutes} ${ampm}`;
    };

    const finalDeliveryTime = `${formatTime(values.deliveryStartTime)} - ${formatTime(values.deliveryEndTime)}`;

    const formData = new FormData();
    formData.append("_method", "PUT");
    // Append all text fields
    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'image' && key !== 'deliveryStartTime' && key !== 'deliveryEndTime' && value !== undefined) {
        const apiKeys: { [key: string]: string } = {
          category: 'category_id',
          quantityAvailability: 'quantity',
          dietaryInfo: 'dietary_info',
          containerSize: 'container_size',
          containerWeight: 'container_weight',
          deliveryOption: 'delivery_option',
          minimumOrder: 'minimum_order',
          deliveryFee: 'delivery_fee'
        };
        formData.append(apiKeys[key] || key, String(value));
      }
    });

    formData.append("delivery_time", finalDeliveryTime);

    // Append new images
    newImages.forEach((file) => {
      formData.append("images[]", file);
    });

    // Append images marked for removal
    if (imagesToRemove.length > 0) {
      imagesToRemove.forEach((imgUrl) => {
        formData.append("remove_images[]", imgUrl);
      });
    }

    try {
      const response = await updateFooditem({ id, formData }).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Food item updated successfully!");
        router.push("/seller/dashboard/food-items");
      } else {
        toast.error(response?.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("An unexpected error occurred.");
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
          {/* Other Form Fields (Category, Title, etc.) remain here... */}
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
          {/* --- 6. ADVANCED IMAGE UPLOAD UI --- */}
          <FormItem>
            <FormLabel>Food Images</FormLabel>
            {/* Display Existing Images */}
            <div className="my-2 flex flex-wrap gap-4">
              {existingImages.map((imgUrl) => (
                <div key={imgUrl} className="relative">
                  <Image
                    src={`${imageUrl + imgUrl}`}
                    alt="Existing food item"
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => handleRemoveExistingImage(imgUrl)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {/* Display New Images to be Uploaded */}
            <div className="my-2 flex flex-wrap gap-4">
              {newImages.map((file, index) => (
                <div key={index} className="relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                    onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)} // Clean up object URL
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => handleRemoveNewImage(file.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {/* Upload Area */}
            <div className="border-2! border-dashed! border-gray-300! rounded-lg! p-8!">
              <div className="text-center!">
                <label htmlFor="image-upload" className="cursor-pointer!">
                  <div className="flex! items-center! justify-center! gap-2! bg-gray-100! hover:bg-gray-200! px-4! py-2! rounded-md! transition-colors!">
                    <Upload className="w-4! h-4!" />
                    <span className="text-sm!">Add More Images</span>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden!"
                    multiple
                    onChange={handleNewImageChange}
                  />
                </label>
              </div>
            </div>
          </FormItem>

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

          {/* --- 7. UPDATED DELIVERY TIME FIELDS --- */}
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

          <Button type="submit" className="w-full! bg-primary" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Food Item"}
          </Button>
        </form>
      </Form>
    </div>
  );
}