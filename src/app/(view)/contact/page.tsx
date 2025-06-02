"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { Button } from "@/components/ui/button"; // Import Button
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string({ required_error: "Please input your name" }),
  email: z
    .string({ required_error: "Please input your email" })
    .email("Please enter a valid email address"), // Added email validation
  subject: z.string({ required_error: "Please input a contact subject" }),
  message: z.string({ required_error: "Please input your message" }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast("Your message was sent to the admin successfully!");
    form.reset();
  }

  return (
    <main className="!py-12 !px-4 md:!px-12">
      <h1 className="text-center font-bold text-4xl text-primary">
        Contact Us
      </h1>
      <p className="text-lg !my-12 text-center">
        Have questions, feedback, or special requests? We’d love to hear from
        you!
      </p>

      <div className="!mt-12">
        <h2 className="text-2xl font-semibold">✍️ Feedback Form</h2>
        <Card className="!mt-12">
          <CardContent className="!pt-6">
            {" "}
            {/* Added padding top to CardContent */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="!space-y-8"
              >
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Your name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Abc123..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Your email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject Field */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Inquiry about..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Your message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="block !mx-auto font-semibold w-1/3"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
