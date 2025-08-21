"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  useGetOwnprofileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} from "@/redux/features/AuthApi";
import { toast } from "sonner"; // Recommended for user feedback
import { EditIcon, Loader2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { imageUrl } from "@/redux/baseApi";

// 1. Define the validation schema for the form.
const profileFormSchema = z.object({
  full_name: z.string().min(2, "Full name is required."),
  city: z.string().min(2, "City is required."),
  address: z.string().min(5, "A valid address is required."),
  postal_code: z.string().min(4, "A valid postal code is required."),
});



export default function Page() {
  // 2. Fetch user data and set up mutations from RTK Query.
  const { data: userData, isLoading: isProfileLoading } =
    useGetOwnprofileQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [updateProfileImage, { isLoading: isUpdatingImage }] =
    useUpdateProfileImageMutation();

  const profileData = userData?.data;

  // 3. Set up the form using react-hook-form.
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: "",
      city: "",
      address: "",
      postal_code: "",
    },
  });

  // 4. Populate form with fetched data once it's available.
  useEffect(() => {
    if (profileData) {
      form.reset({
        full_name: profileData.full_name || "",
        city: profileData.city || "",
        address: profileData.address || "",
        postal_code: profileData.postal_code || "",
      });
    }
  }, [profileData, form]);

  // 5. Handler for submitting the profile information form.
  const handleProfileUpdate = async (
    values: z.infer<typeof profileFormSchema>
  ) => {
    // Construct payload as per API requirements
    const payload = {
      ...values,
      _method: "PUT",
    };

    try {
      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully! 🎉");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    }
  };

  // 6. Handler for changing the profile image.
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Use FormData for file uploads
    const formData = new FormData();
    formData.append("profile", file);
    formData.append("_method", "PUT");

    try {
      await updateProfileImage(formData).unwrap();
      toast.success("Profile image updated successfully! 🖼️");
    } catch (error) {
      toast.error("Failed to update image. Please try again.");
      console.error("Image update error:", error);
    }
  };

  // Show a loading state while fetching initial data.
  if (isProfileLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  // Handle case where data fails to load.
  if (!profileData) {
    return (
      <div className="mt-20 text-center text-destructive">
        Error: Could not load user profile.
      </div>
    );
  }

  const profileImageUrl = profileData.profile.startsWith("http")
    ? profileData.profile
    : `${imageUrl + profileData.profile}`;
  console.log('profileImageUrl', profileImageUrl);

  return (
    <div className="!pb-12 !pr-6">
      {/* --- Profile Image Section --- */}
      <div className="flex flex-row justify-center items-center">
        <div className="relative">
          <Avatar className="size-[140px]">
            <AvatarImage src={profileImageUrl} alt={profileData.full_name} />
            <AvatarFallback>
              {profileData.full_name?.substring(0, 2).toUpperCase() || "AV"}
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="imageUpload"
            className="absolute bottom-0 right-0 z-30 cursor-pointer"
          >
            <Button
              className="h-10 w-10 rounded-full"
              variant="outline"
              size="icon"
              disabled={isUpdatingImage}
              asChild
            >
              <div className="flex items-center justify-center">
                {isUpdatingImage ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <EditIcon className="h-4 w-4" />
                )}
              </div>
            </Button>
          </label>
          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isUpdatingImage}
          />
        </div>
      </div>

      {/* --- Profile Information Form Section --- */}
      <div className="w-2/3 !mx-auto !mt-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleProfileUpdate)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mohammad Brady" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dhaka" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1230" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isUpdating}>
              {isUpdating && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isUpdating ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </div>

      {/* --- Account Actions Section --- */}
      <div className="!mt-12 w-2/3 !mx-auto rounded-lg border-2 !p-6">
        <Button className="w-full text-sm" variant="secondary" asChild>
          <Link href="settings/change-pass">Change Password</Link>
        </Button>
        <div className="!mt-6">
          <Dialog>
            <DialogTrigger asChild>
              {/* <Button
                className="w-full text-sm border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                variant="outline"
              >
                Deactivate Account
              </Button> */}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive">Deactivate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}