"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Menu, LogOut, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
} from "@/components/ui/alert-dialog";
import CartSection from "./cart-section";
import { useGetOwnprofileQuery } from "@/redux/features/AuthApi";
import { Skeleton } from "@/components/ui/skeleton";
import { imageUrl } from "@/redux/baseApi";

const navlinks = [
  { title: "How it works", to: "/how-it-works" },
  { title: "Seller", to: "/how-it-works-seller" },
  { title: "Listing", to: "/" },
  { title: "About Us", to: "/about" },
  { title: "Contact us", to: "/contact" },
];

// IMPORTANT: Replace this with your actual API's base URL for images


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const router = useRouter();

  // Conditionally fetch profile only if the token exists
  const {
    data: userInfo,
    isSuccess: isSignedIn, // 'isSuccess' is a reliable flag for being signed in
    isLoading: isProfileLoading,
  } = useGetOwnprofileQuery({}, { skip: !cookies.token });

  // Extract the nested user data
  const userProfile = userInfo?.data;

  // Helper function to get initials from a full name
  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = () => {
    // Remove the cookie. Specify path for robust removal.
    removeCookie("token", { path: "/" });
    // Reload the page to reset all states and clear user data
    window.location.href = "/login";
  };

  return (
    <nav className="h-16 w-full bg-background flex justify-between items-center !px-4 md:!px-8 border-b">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="font-bold text-2xl">
          HomeFood
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 justify-center">
        {navlinks.map((link, index) => (
          <Button
            key={index}
            className="font-semibold text-zinc-600"
            variant="ghost"
            asChild
          >
            <Link href={link.to}>{link.title}</Link>
          </Button>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex-shrink-0 flex items-center gap-2 md:gap-4">
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          {/* Sheet logic remains mostly the same */}
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="!p-6 w-full">
            {/* ... (mobile menu content is largely unchanged, but we can improve it) ... */}
          </SheetContent>
        </Sheet>

        {/* --- DYNAMIC AUTH SECTION --- */}

        {/* Show a loading skeleton while checking auth status */}
        {isProfileLoading && (
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-24 hidden md:block" />
          </div>
        )}

        {/* If signed in successfully, show avatar and cart */}
        {isSignedIn && userProfile && (
          <>
            <CartSection />
            <Popover>
              <PopoverTrigger className="cursor-pointer" asChild>
                <Avatar>
                  <AvatarImage
                    src={`${imageUrl + userProfile.profile}`}
                    alt={userProfile.full_name}
                  />
                  <AvatarFallback>{getInitials(userProfile.full_name)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-56 mr-4 space-y-2">
                <div className="p-2">
                  <p className="font-bold text-sm">{userProfile.full_name}</p>
                  <p className="text-xs text-muted-foreground">{userProfile.email}</p>
                </div>
                <hr />
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href={"/me"}> <User className="mr-2 h-4 w-4" /> My Account</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href={"/change-pass"}> <Lock className="mr-2 h-4 w-4" /> Change Password</Link>
                </Button>

                {/* Logout Button with Confirmation Dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be returned to the login page and will need to sign in again to access your account.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">
                        Confirm Logout
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

              </PopoverContent>
            </Popover>
          </>
        )}

        {/* If not loading and not signed in, show auth buttons */}
        {!isProfileLoading && !isSignedIn && (
          <div className="hidden md:flex items-center gap-4">
            <Button asChild>
              <Link href="/register">Sign up</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}