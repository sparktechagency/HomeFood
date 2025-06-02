"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { BikeIcon, MapPin, StarIcon, UtensilsCrossed } from "lucide-react";
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
}: {
  fromProfile?: boolean;
  activable?: boolean;
}) {
  const [active, setActive] = useState(true);

  function handleActive() {
    setActive(!active);
  }

  return (
    <Link href="/seller/product">
      <Card className="!pt-0 overflow-hidden">
        <CardHeader className="!p-0 relative !gap-0">
          <div className="h-full w-full">
            <Image
              src="/image/prod.jpg"
              className="object-cover h-full w-full"
              height={600}
              width={800}
              alt="product"
            />
          </div>
          <div className="absolute top-0 left-0 text-background text-xs !p-2 bg-[#FF6A0050] rounded-br-lg">
            Tomorrow 12:00 am - 8:00 am
          </div>
          <div className="absolute top-0 right-0 !space-x-2 !p-1">
            <Badge className="text-xs !px-2 !py-1">Pickup</Badge>
            <Badge
              variant="outline"
              className="text-xs !px-2 !py-1 text-background"
            >
              Delivery
            </Badge>
          </div>
          {activable &&
            (active ? (
              <div className="absolute bottom-0 right-0 bg-green-600 !px-4 text-background text-sm !p-1 rounded-tl-lg">
                Active
              </div>
            ) : (
              <div className="absolute bottom-0 right-0 bg-zinc-300 !px-4 text-foreground !p-1 rounded-tl-lg text-sm">
                Disabled
              </div>
            ))}
        </CardHeader>
        <CardContent className="!space-y-2">
          <div className=" flex flex-row justify-start items-center gap-2">
            <UtensilsCrossed className="text-destructive size-5" />{" "}
            <span className="text-ellipsis line-clamp-1 text-sm">
              Hyderabadi Biryani, Lucknowi Biryani
            </span>
          </div>
          <div className=" flex flex-row justify-start items-center gap-2">
            <MapPin className="text-destructive size-5" />{" "}
            <span className="text-ellipsis line-clamp-1 text-sm">
              Olympiapark, Munich, EMEA 90763
            </span>
          </div>
          <div className=" flex flex-row justify-start items-center gap-2">
            <BikeIcon className="text-destructive size-5" />{" "}
            <span className="text-ellipsis line-clamp-1 text-sm font-semibold italic text-green-600 flex flex-row justify-start items-center gap-1">
              Free delivery{" "}
              <div className="size-1.5 bg-green-600 rounded-full" />
              Min. order $60/-
            </span>
          </div>
        </CardContent>
        {!fromProfile ? (
          <CardFooter className="">
            <Link
              href="/seller"
              className="w-full flex flex-row justify-between items-center group"
            >
              <div className="flex flex-row justify-start items-center gap-2">
                <Avatar className="size-10">
                  <AvatarImage src="https://avatar.iran.liara.run/public" />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
                <div className="h-full">
                  <h4 className="font-bold group-hover:text-green-600 transition-colors">
                    Food Mania
                  </h4>
                  <p className="text-xs text-muted-foreground">Sasha</p>
                </div>
              </div>
              <div className="flex gap-1 text-sm items-center">
                4.8
                <StarIcon className="size-4 fill-amber-400 text-amber-400" />
              </div>
            </Link>
          </CardFooter>
        ) : (
          ""
        )}
        {activable && (
          <div className="flex flex-row justify-center items-center">
            <Dialog>
              <DialogTrigger>
                <Button>Request to Activate</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Activation Request?</DialogTitle>
                  <DialogDescription>
                    You&apos;re about to send a request to the seller to
                    **activate this food item**. Once sent, the seller will be
                    notified.
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
    </Link>
  );
}
