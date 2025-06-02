import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
export default function ReviewCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-lg">
            <Avatar>
              <AvatarImage src="https://avatar.iran.liara.run/public" />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <b className="font-semibold">Jason</b>
            <p className="font-medium">
              , StarBrics <span className="text-primary">- May 15, 2025</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-1">
            <StarIcon stroke="" fill="gold" />
            <StarIcon stroke="" fill="gold" />
            <StarIcon stroke="" fill="gold" />
            <StarIcon stroke="" fill="gold" />
            <StarIcon stroke="" fill="gold" />
            <div className="">5.0</div>
          </div>
        </CardTitle>
        <CardContent className="!mt-2 !px-0 !pb-6 border-b">
          <CardDescription>
            One of the best. I&apos;m satisfied with the quality of the food.
          </CardDescription>
        </CardContent>
        <CardFooter className="!px-0 !pt-4">
          <div className="w-full">
            <Dialog>
              <DialogTrigger asChild>
                <div className="w-full">
                  <Input className="w-full" placeholder="Write a reply....." />
                </div>
              </DialogTrigger>
              <DialogContent className="!min-w-[80dvw]">
                <DialogHeader>
                  <DialogTitle className="flex flex-row justify-between items-center !mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Avatar>
                        <AvatarImage src="https://avatar.iran.liara.run/public" />
                        <AvatarFallback>UI</AvatarFallback>
                      </Avatar>
                      <b className="font-semibold">Jason</b>
                      <p className="font-medium">
                        , StarBrics{" "}
                        <span className="text-primary">- May 15, 2025</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <StarIcon stroke="" fill="gold" />
                      <StarIcon stroke="" fill="gold" />
                      <StarIcon stroke="" fill="gold" />
                      <StarIcon stroke="" fill="gold" />
                      <StarIcon stroke="" fill="gold" />
                      <div className="">5.0</div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="!pb-6 border-b">
                  <CardDescription>
                    One of the best. I&apos;m satisfied with the quality of the
                    food.
                  </CardDescription>
                </div>
                <div className="flex flex-row justify-between gap-4">
                  <Input placeholder="Write a reply....." />
                  <DialogClose asChild>
                    <Button>Submit Review</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
