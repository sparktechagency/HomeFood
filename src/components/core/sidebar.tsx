"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie"; // A popular library for handling browser cookies
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Import Alert Dialog components

// Assuming these components exist at the specified paths
import SideMenu from "./side-menu";
import AdminSideMenu from "./admin-side-menu";
import MyCustomLogo from "../ui/MyCustomLogo";

interface SidebarProps {
  by: "admin" | "creator";
}

/**
 * A sidebar component for navigation, which includes a functional logout button
 * with a confirmation dialog.
 * @param {SidebarProps} props - The component props.
 * @param {'admin' | 'creator'} props.by - Determines which menu to display.
 */
export default function Sidebar({ by }: SidebarProps) {
  const router = useRouter();

  /**
   * Handles the user logout process.
   */
  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("You have been logged out successfully.");
    router.replace("/login");
  };

  return (
    <div className="!p-6 h-full flex flex-col justify-between">
      <div className="">
        <MyCustomLogo />
        <div className="" suppressHydrationWarning>
          {by === "admin" ? <AdminSideMenu /> : <SideMenu />}
        </div>
      </div>
      <div className="w-full">
        {/* Wrap the Button with AlertDialog to trigger the confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {/* This is your original button design */}
            <Button className="w-full">
              Log Out <LogOutIcon />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will end your current session and you will be redirected to the login page.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* The logout function is now called from the "Continue" button */}
              <AlertDialogAction onClick={handleLogout}>
                Log Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
