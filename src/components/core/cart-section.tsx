import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";

export default function CartSection() {
  return (
    <Sheet>
      <SheetTrigger asChild>

        <ShoppingCartIcon className="mr-2 cursor-pointer" size={20} />

      </SheetTrigger>
      <SheetContent className="min-h-[50dvh]" side="bottom">
        <SheetHeader className="border-b">
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        <div className=""></div>
      </SheetContent>
    </Sheet>
  );
}
