import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import Link from "next/link";
import { MapPinIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { User } from "@/lib/types/api";
import { imageUrl } from "@/redux/baseApi";


interface ProfilePartProps {
  user: User;
}


export default function ProfilePart({ user }: ProfilePartProps) {
  return (
    <>
      <Avatar className="size-[140px] !mx-auto">
        <AvatarImage src={`${imageUrl + user?.profile}`} alt={user?.full_name} />
        <AvatarFallback>{user?.full_name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="w-full !mt-2">
        <h3 className="text-2xl font-bold text-center">{user?.full_name}</h3>
        <div className="!space-y-2">
          <div className="flex flex-row justify-center items-center gap-1 text-muted-foreground">
            <MapPinIcon className="text-destructive size-4" />
            <span className="text-ellipsis line-clamp-1 text-sm">{user?.address}</span>
          </div>
        </div>
        <p className="!mt-12 text-center">
          Welcome to my kitchen! I'm excited to share my food with you.
        </p>
        <div className="!mt-12 flex flex-col justify-center items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>See Kitchen Picture</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Kitchen pricture</DialogTitle>
              </DialogHeader>
              <div className="">
                <Image
                  src={`${imageUrl + user.profile}`}
                  width={500}
                  height={500}
                  alt="icon"
                  className="w-full aspect-square"
                />
              </div>
            </DialogContent>
          </Dialog>
          <Button asChild>
            <Link href={"/seller/chat"}>
              Send Message <SendIcon />
            </Link>
          </Button>
          <Button asChild>
            <Link href={"/seller/food-request"}>Food Request</Link>
          </Button>
          <Button
            variant="secondary"
            className="bg-zinc-700 hover:bg-zinc-600 text-background"
          >
            Report
          </Button>
        </div>
      </div>
    </>
  );
}
