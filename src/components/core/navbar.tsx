"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import CartSection from "./cart-section";

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

  useEffect(() => {
    setSignedIn(!!cookies.token);
  }, [cookies.token, pathname]); // re-check on path change or token change

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
              <Link href="/" className="font-bold text-2xl !mb-4">
                HomeFood
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
              {!signedIn && (
                <div className="flex flex-col gap-2 !mt-6">
                  <Button asChild onClick={() => setIsOpen(false)}>
                    <Link href="/register">Sign up</Link>
                  </Button>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    <Link href="/login">Log in</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Auth Buttons */}
        {signedIn ? (
          <>
            <CartSection />
            <Popover>
              <PopoverTrigger className="cursor-pointer" asChild>
                <Avatar>
                  <AvatarImage src="/image/icon.jpg" />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-background/10 backdrop-blur-xs space-y-2">
                <Button className="w-full" asChild>
                  <Link href={"/me"}>My Account</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href={"/change-pass"}>Change Password</Link>
                </Button>
                <Button
                  className="w-full !bg-transparent text-destructive! border !border-destructive"
                  variant="destructive"
                  onClick={() => {
                    removeCookie("token");
                  }}
                >
                  Logout
                </Button>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Button asChild>
              <Link href="/register">Sign up</Link>
            </Button>
            <Button variant="outline">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        )}

        {/* Mobile Avatar */}
        {signedIn && (
          <Avatar className="md:hidden">
            <AvatarImage src="/image/icon.jpg" />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
        )}
      </div>
    </nav>
  );
}
