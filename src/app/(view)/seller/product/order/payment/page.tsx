import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";
import StripeCard from "./stripe-card";

export default function Page() {
  return (
    <main className="py-12!">
      <section className="w-4/5 py-12! mx-auto! grid grid-cols-5 gap-6">
        <Card className="col-span-3 px-4!">
          <h1 className="text-2xl text-center font-semibold">
            Finalize your delivery and payment
          </h1>
          <Label className="font-semibold">Select Delivery Time</Label>
          <Input type="time" />
          <div className="mt-12!">
            <StripeCard />
          </div>
        </Card>
        <Card className="col-span-2 self-baseline!">
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
        </Card>
      </section>
    </main>
  );
}
