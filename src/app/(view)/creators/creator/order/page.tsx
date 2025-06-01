import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePart from "@/components/core/profile-part";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  return (
    <div className="!py-12 !px-4 md:!px-12 grid grid-cols-11 gap-6">
      <div className="col-span-3 self-start">
        <div className="border-2 rounded-lg !p-6 ">
          <ProfilePart type="half" />
        </div>
        <div className="!mt-12">
          <div className="flex flex-row items-center justify-between !mb-8">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <div className="flex items-center gap-2">
              <StarIcon fill="#FFD700" stroke="0" className="size-5" />
              <span className="font-bold">5.0</span>{" "}
              <span className="text-muted-foreground">(117)</span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="w-full">
                <CardHeader>
                  <CardTitle className="flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={"https://avatar.iran.liara.run/public"}
                        />
                        <AvatarFallback>JA</AvatarFallback>
                      </Avatar>
                      <h3>Jason, StarBrics</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Apr 10, 2025
                    </p>
                  </CardTitle>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        fill="#FFD700"
                        stroke="0"
                        className="size-5"
                      />
                    ))}
                    <span className="!ml-1 font-bold">5.0</span>
                  </div>
                  <CardDescription className="text-foreground">
                    One of the best. I&apos;m satisfied about the service.
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-8">
        <div className="">
          <div className="flex flex-row justify-center items-center ">
            <Tabs
              defaultValue="account"
              className="border-2 !p-1 rounded-lg w-full"
            >
              <TabsList className="w-full">
                <TabsTrigger
                  value="account"
                  className="!px-8 !py-4 text-xl data-[state=active]:!bg-secondary"
                >
                  Videos
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="!px-8 !py-4 text-xl data-[state=active]:!bg-secondary"
                >
                  Photos
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="w-full !mt-6 flex flex-col justify-start items-start gap-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center text-3xl">
                  <h2 className="font-bold">Package- 1 Photo</h2>
                  <h2 className="font-normal">$30.00</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="font-semibold">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 1 UGC Photo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 1 revision included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 3 days delivery
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-xl text-muted-foreground">Broadcasts</p>
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center text-3xl">
                  <h2 className="font-bold">Package- 2 Photo</h2>
                  <h2 className="font-normal">$50.00</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="font-semibold">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 2 UGC Photo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 2 revision included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 4 days delivery
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-xl text-muted-foreground">Broadcasts</p>
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center text-3xl">
                  <h2 className="font-bold">Package- 3 Photo</h2>
                  <h2 className="font-normal">$70.00</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="font-semibold">
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 3 UGC Photo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 2 revision included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon /> 4 days delivery
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <p className="text-xl text-muted-foreground">Broadcasts</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
