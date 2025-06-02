import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { StarIcon } from "lucide-react";
import AddCat from "./add-cat";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="!py-12 !pr-6">
      <h1 className="text-4xl font-bold">Categories</h1>
      <div className="!my-12 !space-y-6">
        <Categorizer name="Yoga" />
        <Categorizer name="Bodybuilding" />
        <Categorizer name="Nutrition" />
      </div>
      <AddCat />
    </div>
  );
}

function Categorizer({ name }: { name: string }) {
  return (
    <>
      <h3 className="text-2xl !mb-6 font-bold">{name}</h3>
      <div className="grid grid-cols-3 gap-6 border-b !pb-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Dialog key={i}>
            <DialogTrigger asChild>
              <Card className="!p-4 hover:bg-secondary/60 transition-colors cursor-pointer">
                <CardHeader
                  className="aspect-video bg-cover bg-center bg-no-repeat rounded-lg"
                  style={{
                    backgroundImage: "url('/image/hearder-card-1.jpg')",
                  }}
                ></CardHeader>
                <CardContent className="!p-0">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-start items-center gap-4">
                      <Avatar className="size-12">
                        <AvatarImage src="https://avatar.iran.liara.run/public" />
                        <AvatarFallback>UI</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-between items-start">
                        <p className="text-base font-bold">Sara</p>
                        <p className="text-xs text-muted-foreground">
                          Victoria
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end items-center gap-2">
                      <StarIcon fill="#FFD700" stroke="0" />{" "}
                      <span className="text-semibold">4.9</span>
                    </div>
                  </div>
                  <CardDescription className="text-xs !mt-2">
                    Lorem ipsum dolor sit amet consectetur. Dictum cras facilisi
                    nunc facilisis. Eleifend vel sed donec felis libero. In
                    imperdiet pellentesque at urna velit in massa potenti. Id
                    eleifend nulla odio dignissim malesuada est egestas congue
                    arcu.
                  </CardDescription>
                </CardContent>
                <CardFooter className="w-full">
                  <h3 className="text-center w-full text-lg font-bold">
                    $25.00
                  </h3>
                </CardFooter>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit category</DialogTitle>
              </DialogHeader>
              <div className="">
                <form className="w-full">
                  <Input placeholder="Category name" />
                  <div className="w-full !mt-6">
                    <Button className="block !mx-auto text-sm">
                      Update Category
                    </Button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
}
