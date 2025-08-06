"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
import { imageUrl } from "@/redux/baseApi";
import { Skeleton } from "@/components/ui/skeleton";
import MyCustomLogo from "../ui/MyCustomLogo";



const navlinks = [
  { title: "How it works", to: "/how-it-works" },
  { title: "Seller", to: "/how-it-works-seller" },
  { title: "Listing", to: "/" },
  { title: "About Us", to: "/about" },
  { title: "Contact us", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(["token"]);
  const pathname = usePathname();
  const [signedIn, setSignedIn] = useState(false);

  // This is your original logic for setting the signed-in state, which we are keeping.
  useEffect(() => {
    setSignedIn(!!cookies.token);
  }, [cookies.token, pathname]);

  // Fetch profile data, but only if the cookie (and thus signedIn state) exists.
  const {
    data: userInfo,
    isLoading: isProfileLoading,
  } = useGetOwnprofileQuery({}, { skip: !signedIn });

  // Extract nested user data
  const userProfile = userInfo?.data;
  console.log('userProfile', userProfile);

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
    removeCookie("token", { path: "/" });
    window.location.href = "/login";
  };

  return (
    <nav className="h-16 w-full bg-background flex justify-between items-center !px-4 md:!px-8 border-b fixed top-0 z-50 ">
      <MyCustomLogo />


      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 justify-center">
        {navlinks.map((link, index) => (
          <Button
            key={index}
            className="font-semibold text-zinc-600"
            variant="ghost"
            asChild
          >
            <Link className="text-lg" href={link.to}>{link.title}</Link>
          </Button>
        ))}
      </div>

      {/* Right: Actions */}
      <div className="flex-shrink-0 flex items-center gap-2 md:gap-4">
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="!p-6 w-full">
            <SheetHeader className="hidden">
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 !mt-8">
              <Link href="/" className="text-3xl font-extrabold tracking-tight flex items-center space-x-1">
                <span className="text-gray-900">Home</span>
                <span className="text-[#4F986F]">Food</span>
                <span className="text-xl font-semibold text-green-400">🍽️</span> {/* Optional icon */}
              </Link>
              {navlinks.map((link, index) => (
                <Button
                  key={index}
                  className="font-semibold text-zinc-600 justify-start"
                  variant="ghost"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={link.to}>{link.title}</Link>
                </Button>
              ))}

              {/* Logged-in links for Mobile Menu */}
              {signedIn && (
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Button variant="ghost" className="font-semibold text-zinc-600 justify-start" asChild onClick={() => setIsOpen(false)}>
                    <Link href={"/me"}><User className="mr-2 h-4 w-4" /> My Account</Link>
                  </Button>
                  <Button variant="ghost" className="font-semibold text-zinc-600 justify-start" asChild onClick={() => setIsOpen(false)}>
                    <Link href={"/change-pass"}><Lock className="mr-2 h-4 w-4" /> Change Password</Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" className="font-semibold text-destructive justify-start hover:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                        <AlertDialogDescription >Are you sure you want to log out? This action cannot be undone.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">Confirm Logout</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}

              {/* Logged-out buttons for Mobile Menu */}
              {!signedIn && (
                <div className="flex flex-col gap-2 !mt-6">
                  <Button asChild onClick={() => setIsOpen(false)}>
                    <Link href="/register">Sign up</Link>
                  </Button>
                  <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/login">Log in</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Auth Section */}
        {isProfileLoading && <Skeleton className="h-10 w-10 rounded-full" />}
        {!isProfileLoading && signedIn ? (
          <>
            <CartSection />
            <Popover>
              <PopoverTrigger className="cursor-pointer" asChild>
                <Avatar>
                  <AvatarImage src={userProfile ? `${imageUrl}${userProfile.profile}` : ""} alt={userProfile?.full_name} />
                  <AvatarFallback>{getInitials(userProfile?.full_name)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-background/10 backdrop-blur-xs space-y-2">
                <Button className="w-full" asChild>
                  <Link href={"/me"}>My Account</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href={"/change-pass"}>Change Password</Link>
                </Button>
                {/* Logout Button with Confirmation */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full !bg-transparent text-destructive! border !border-destructive"
                      variant="destructive"
                    >
                      Logout
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                      <AlertDialogDescription >Are you sure you want to log out? This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">Confirm Logout</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          !isProfileLoading && (
            <div className="hidden md:flex items-center gap-4">
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          )
        )}

        {/* Mobile Avatar (if needed, otherwise can be removed if profile info is in the sheet) */}
        {signedIn && !isProfileLoading && (
          <div className="md:hidden"> {/* This div prevents layout shift on desktop */}
            {/* The mobile avatar is now handled inside the popover/sheet logic */}
          </div>
        )}
      </div>
    </nav>
  );
}