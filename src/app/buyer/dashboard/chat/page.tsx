import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Page() {
  return (
    <div className="h-[90dvh]">
      <div className="w-full h-full grid grid-cols-7 gap-6">
        <div className="h-full col-span-2 border rounded-lg">
          <div className="!p-4">
            <Input placeholder="Search" />
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              className="flex flex-row justify-start items-center gap-6 !px-6 !py-3 border-b"
              key={i}
            >
              <Avatar className="!size-12">
                <AvatarImage src="https://avatar.iran.liara.run/public" />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <div className="">
                <h4 className="text-base font-bold">Json</h4>
                <p className="text-sm text-primary font-bold">Sent a message</p>
              </div>
            </div>
          ))}
        </div>
        <div className="h-full col-span-5 border rounded-lg flex flex-col justify-between items-start">
          <div className="flex flex-row justify-start items-center gap-3 !px-4 !py-3 border-b w-full">
            <Avatar className="!size-12">
              <AvatarImage src="https://avatar.iran.liara.run/public" />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <h4 className="text-base font-bold">Katie</h4>
              <div
                className="w-full text-sm text-green-500 font-bold flex flex-row items-center gap-2"
                suppressHydrationWarning
              >
                <div className="size-3 rounded-full  bg-green-500" /> online
              </div>
            </div>
          </div>
          <div className=""></div>
          <div className="flex flex-row justify-between w-full !p-6 gap-6">
            <Input />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
