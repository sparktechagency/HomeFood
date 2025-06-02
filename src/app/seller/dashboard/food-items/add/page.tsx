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
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
  deliveryDate: z.date({
    required_error: "Please select a delivery date",
  }),
});

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      form.setValue("image", file);
    }
  };

  return (
    <div className="w-full p-6!">
      <div className="mb-6!">
        <h1 className="text-2xl! font-bold!">Add your food items</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6!">
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
                    <SelectItem value="appetizers">Appetizers</SelectItem>
                    <SelectItem value="main-course">Main Course</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                    <SelectItem value="snacks">Snacks</SelectItem>
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image of the Food</FormLabel>
                <div className="border-2! border-dashed! border-gray-300! rounded-lg! p-8!">
                  <div className="text-center!">
                    <p className="text-sm! text-gray-600! mb-4!">
                      Add Food Image
                    </p>
                    <div className="flex! justify-center!">
                      <label htmlFor="image-upload" className="cursor-pointer!">
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
                    </div>
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
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full! bg-primary">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
