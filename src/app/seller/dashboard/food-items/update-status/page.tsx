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
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  deliveryOption: z.enum(["delivery", "pickup", "both"]),
  deliveryStatus: z.enum(["active", "inactive", "done"]),
  price: z.string().min(1, "Please enter a price"),
  quantityAvailability: z.string().min(1, "Please enter quantity"),
  minimumOrder: z.string().min(1, "Please enter minimum order"),
  deliveryFee: z.string().min(1, "Please enter delivery fee"),
  deliveryDate: z.date({
    required_error: "Please select a delivery date",
  }),
  deliveryTime: z.string(),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryOption: "delivery",
      deliveryStatus: "active",
      price: "",
      quantityAvailability: "",
      minimumOrder: "",
      deliveryFee: "",
      deliveryTime: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-full p-6!">
      <div className="mb-6!">
        <h1 className="text-2xl! font-bold!">Update Item status</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6!">
          <FormField
            control={form.control}
            name="deliveryStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex! gap-6!"
                  >
                    <div className="flex! items-center! space-x-2!">
                      <RadioGroupItem value="active" id="active" />
                      <label htmlFor="active" className="text-sm!">
                        Active
                      </label>
                    </div>
                    <div className="flex! items-center! space-x-2!">
                      <RadioGroupItem value="inactive" id="inactive" />
                      <label htmlFor="inactive" className="text-sm!">
                        Inactive
                      </label>
                    </div>
                    <div className="flex! items-center! space-x-2!">
                      <RadioGroupItem value="done" id="done" />
                      <label htmlFor="done" className="text-sm!">
                        Done
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

          <Button type="submit" className="w-full! bg-primary">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
