"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";


export default function Page() {
  const navig = useRouter();
  return (
    <main className="py-12!">
      <section className="w-4/5 py-12! mx-auto! grid grid-cols-5 gap-6">
        <Card className="col-span-5 self-baseline!">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="!space-y-4">
            <div className="!space-y-3">
              <div className="flex justify-between">
                <span>Subtotal (1 item)</span>
                <span>${45}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold ">
                <span>Total</span>
                <span>$45</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                toast.success("Your order request was sent to Food mania");
                navig.push("/");
              }}
            >
              Confirm order
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
