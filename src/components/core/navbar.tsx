import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navlinks = [
  { title: "How it works", to: "/how-it-works" },
  { title: "Listing", to: "/" },
  { title: "About Us", to: "/about" },
  { title: "Contact us", to: "/contact" },
];

export default function Navbar() {
  const signedIn = false;
  return (
    <nav className="h-[64px] w-full bg-background flex items-center !px-4 md:!px-8">
      {/* Left: Logo (fixed size) */}
      <div className="flex-shrink-0">
        <Link href="/" className="font-bold text-2xl">
          HomeFood
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
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

      {/* Right: User actions (fixed size) */}
      <div className="flex-shrink-0 flex items-center gap-4">
        {signedIn ? (
          <Avatar>
            <AvatarImage src="/image/icon.jpg" />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
        ) : (
          <>
            <Button asChild>
              <Link href={"/register"}>Sign up</Link>
            </Button>
            <Button variant="outline">
              <Link href={"/login"}>Log in</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
