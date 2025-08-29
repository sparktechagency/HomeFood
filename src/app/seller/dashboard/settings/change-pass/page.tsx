"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useChangePasswordMutation, useCreateNewPassMutation, useGetOwnprofileQuery } from "@/redux/features/AuthApi";
import { toast } from "sonner";

export default function PasswordChangeForm() {
  const { data: user } = useGetOwnprofileQuery({})
  console.log('user', user);
  const email = user?.data?.email
  const [passwords, setPasswords] = useState({
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const [changePassword, { isLoading: isCreateNewPassLoading }] = useChangePasswordMutation()
  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};


    if (!passwords.new) {
      newErrors.new = "New password is required";
    } else if (passwords.new.length < 8) {
      newErrors.new = "Password must be at least 8 characters";
    }

    if (!passwords.confirm) {
      newErrors.confirm = "Please confirm your password";
    } else if (passwords.new !== passwords.confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await changePassword({ new_password: passwords?.new, new_password_confirmation: passwords.confirm, email }).unwrap()
      console.log('response', response);

      if (response?.success) {
        toast.success(response?.message || "Password changed successfully")
        setPasswords({ new: "", confirm: "" });
        // router.push('/settings')
      }
    } catch (error: any) {
      console.log('error', error);
      toast.error(error?.data?.message || "Something went wrong")
    }


  };

  const handleInputChange = (field: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 !py-12 !px-4 sm:!px-6 lg:!px-8">
      <div className="w-2/3 !mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="!mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center !mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Change Your Password
            </CardTitle>
            <p className="text-sm text-gray-600 !mt-2">
              Enter your current password and choose a new one
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="!space-y-6">

              <div className="!space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) => handleInputChange("new", e.target.value)}
                    placeholder="Enter new password"
                    className={errors.new ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full !px-3 !py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    {showPasswords.new ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="sr-only">
                      {showPasswords.new ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {errors.new && (
                  <p className="text-sm text-red-600">{errors.new}</p>
                )}
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>

              {/* Confirm Password */}
              <div className="!space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) =>
                      handleInputChange("confirm", e.target.value)
                    }
                    placeholder="Confirm new password"
                    className={errors.confirm ? "border-red-500" : ""}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full !px-3 !py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="sr-only">
                      {showPasswords.confirm
                        ? "Hide password"
                        : "Show password"}
                    </span>
                  </Button>
                </div>
                {errors.confirm && (
                  <p className="text-sm text-red-600">{errors.confirm}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col !space-y-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Changing Password..." : "Change Password"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/seller/dashboard/settings")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
