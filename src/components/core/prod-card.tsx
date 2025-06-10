"use client";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { MapPin, StarIcon, UtensilsCrossed } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function ProductCard({
  fromProfile,
  activable,
  control,
}: {
  fromProfile?: boolean;
  activable?: boolean;
  control?: boolean;
}) {
  const [active, setActive] = useState(true);

  function handleActive() {
    setActive(!active);
  }

  return (
    <Card className="!pt-0 overflow-hidden flex flex-col h-full w-full max-w-sm sm:max-w-md md:max-w-full !mx-auto">
      <Link href="/seller/product" className="block h-full">
        <CardHeader className="!p-0 relative !gap-0">
          <div className="relative w-full aspect-video sm:aspect-square md:aspect-video lg:aspect-square xl:aspect-video overflow-hidden">
            <Image
              src="/image/prod.jpg"
              alt="product"
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <div className="hidden md:block absolute top-0 left-0 text-background text-[10px] !p-2 bg-[#FF6A0050] rounded-br-lg z-10">
            Tomorrow 12:00 am - 8:00 am
          </div>
          <div className="absolute top-0 right-0 flex !space-x-1 md:!space-x-1 !p-1 z-10">
            <Badge className="text-[10px] !px-2 !py-1">Pickup</Badge>
            <Badge
              variant="outline"
              className="text-xs !px-2 !py-1 text-background"
            >
              Delivery
            </Badge>
          </div>
          {activable &&
            (active ? (
              <div className="absolute bottom-0 right-0 bg-green-600 !px-4 text-background text-sm !p-1 rounded-tl-lg z-10">
                Active
              </div>
            ) : (
              <div className="absolute bottom-0 right-0 bg-zinc-300 !px-4 text-foreground !p-1 rounded-tl-lg text-sm z-10">
                Disabled
              </div>
            ))}
        </CardHeader>
      </Link>

      <CardContent className="!space-y-2 flex-grow !p-6 !py-0">
        {/* Food Type */}
        <div className="flex items-start !gap-3">
          <UtensilsCrossed className="text-destructive size-5 flex-shrink-0 !mt-0.5 " />
          <span className="text-sm leading-relaxed text-muted-foreground line-clamp-1">
            Hyderabadi Biryani, Lucknowi Biryani, Authentic Indian Cuisine,
            North Indian Delicacies
          </span>
        </div>

        {/* Location */}
        <div className="flex items-start !gap-3">
          <MapPin className="text-destructive size-5 flex-shrink-0 !mt-0.5" />
          <span className="text-sm leading-relaxed text-muted-foreground line-clamp-1">
            Olympiapark, Munich, EMEA 90763, Germany, Bavaria
          </span>
        </div>
        <h4 className="text-base text-primary">$49.00</h4>
        {/* Restaurant Info */}
        <div className="!pt-2 !border-t border-border/50">
          <Link
            href="/seller"
            className="flex items-center justify-between group hover:bg-muted/50 !p-3 !-m-3 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center !gap-3 min-w-0 flex-1">
              <Avatar className="size-6 md:size-8 flex-shrink-0 ring-2 ring-background shadow-sm">
                <AvatarImage src="https://avatar.iran.liara.run/public" />
                <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                  UI
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold group-hover:text-green-600 transition-colors duration-200 truncate">
                  Food Mania Restaurant Name
                </h4>
                <p className="text-xs text-muted-foreground truncate !mt-0.5">
                  Sasha John Doe
                </p>
              </div>
            </div>
            <div className="flex items-center !gap-1.5 text-sm font-medium flex-shrink-0 !ml-4">
              <span className="text-foreground">4.8</span>
              <StarIcon className="size-4 fill-amber-400 text-amber-400" />
            </div>
          </Link>
        </div>
      </CardContent>

      {!fromProfile && control && (
        <CardFooter className="!p-4 pt-0">
          <CardAction className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
            <Button variant="outline" asChild className="w-full">
              <Link href="/seller/dashboard/food-items/add">Edit</Link>
            </Button>
            <Button variant="destructive" className="w-full">
              Delete
            </Button>
            <Button className="w-full">Active</Button>
          </CardAction>
        </CardFooter>
      )}

      {activable && (
        <div className="flex justify-center items-center !p-4 pt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Request to Activate</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Activation Request?</DialogTitle>
                <DialogDescription>
                  You&apos;re about to send a request to the seller to{" "}
                  <strong>activate this food item</strong>. Once sent, the
                  seller will be notified.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleActive}>Confirm</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Card>
  );
}
