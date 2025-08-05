"use client";
import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import {
  useTakeEmailForForgetpassMutation,
  useVerifyemailMutation,
} from "@/redux/features/AuthApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
// Corrected schema: field is 'otp', and it must be 6 characters.
const OTPSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

// Added clear prop types instead of 'any'
interface OtpFormProps {
  isRegisterpage: any;
  otpemail: any;
}

export default function OtpForm({ isRegisterpage, otpemail }: OtpFormProps) {
  const [verifyEmail, { isLoading: isVerifying }] = useVerifyemailMutation();
  // Assume you have a `resendOtp` endpoint in your API slice
  const [takeEmailForForgetpass, { isLoading: isResending }] = useTakeEmailForForgetpassMutation();

  const [cooldown, setCooldown] = useState(0);
  const router = useRouter();

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Effect to manage the cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Handler for the main form submission (verifying the OTP)
  async function onSubmit(values: z.infer<typeof OTPSchema>) {
    try {
      // Use .unwrap() for clean success/error handling
      const payload = await verifyEmail({
        otp: values.otp,
        email: otpemail, // Send the user's email along with the OTP
      }).unwrap();

      console.log('response', payload);

      if (payload?.success) {
        Cookies.set('token', payload?.data?.token)
        toast.success(payload?.message)
      }


      // toast.success(payload?.message || "Your email has been verified!");

      if (isRegisterpage === 'true' && payload?.data?.token) {

        router.push('/');
      } else {
        router.push(`/reset-pass?email=${otpemail}`);
      }
    } catch (error: any) {
      console.error('Verification failed', error);
      toast.error(error?.data?.message || "Invalid OTP or server error.");
    }
  }

  // Handler for the "Resend OTP" button
  const handleResendOtp = async () => {
    try {
      const payload = await takeEmailForForgetpass({ email: otpemail }).unwrap();
      console.log('response', payload);

      toast.success(payload?.message || "A new OTP has been sent to your email.");
      setCooldown(60); // Start 60-second cooldown
    } catch (error: any) {
      console.error('Resend OTP failed', error);
      toast.error(error?.data?.message || "Failed to resend OTP. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center text-center">


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-8 mt-6 w-full max-w-sm">
          <FormField
            control={form.control}
            name="otp" // <-- Corrected form field name
            render={({ field }) => (
              <FormItem className="flex flex-col gap-4 justify-center items-center">
                <FormLabel className="text-lg font-bold">Enter OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    {/* You can map this to be more DRY */}
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot key={index} index={index} className="border-muted-foreground/40 rounded-md" />
                    ))}
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isVerifying}>
            {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Code
          </Button>
        </form>
      </Form>

      <div className="mt-4">
        <Button
          variant="link"
          onClick={handleResendOtp}
          disabled={isResending || cooldown > 0}
        >
          {isResending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : cooldown > 0 ? (
            `Resend OTP in ${cooldown}s`
          ) : (
            "Didn't receive code? Resend OTP"
          )}
        </Button>
      </div>
    </div>
  );
}