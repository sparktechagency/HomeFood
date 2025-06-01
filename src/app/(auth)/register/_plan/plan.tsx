"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Plan({ type }: { type: string }) {
  const navig = useRouter();
  function donePlan(x: string) {
    if (x) {
      navig.push(`/register/${type}/sign-up?plan=${x}`);
    } else {
      toast("Something went wrong..");
    }
  }
  return (
    <div className="h-[calc(100dvh-64px)] flex flex-col justify-center items-center !space-y-12">
      <div className="w-4/5 grid grid-cols-2 gap-6">
        <Card className="flex flex-col justify-center items-center gap-6 !py-[100px]">
          <CardContent className="text-center w-full !space-y-6">
            <h2 className="text-3xl">Free</h2>
            <h3 className="text-3xl font-semibold">$0/month</h3>
            <Button
              size="lg"
              className="w-1/2"
              variant="outline"
              onClick={() => {
                donePlan("free");
              }}
            >
              Sign Up for Free
            </Button>
            <div className="flex flex-col justify-center items-center !pt-6">
              <ul className="list-disc w-auto list-inside !space-y-3 font-semibold text-start">
                <li>Create & list services</li>
                <li>Basic profile</li>
                <li>Limited portfolio (5 items)</li>
                <li>Limited search visibility</li>
                <li>Basic messaging</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-center items-center gap-6 !py-[100px]">
          <CardContent className="text-center w-full !space-y-6">
            <h2 className="text-3xl">Pro</h2>
            <h3 className="text-3xl font-semibold">$19/month</h3>
            <Button
              size="lg"
              className="w-1/2"
              onClick={() => {
                donePlan("pro");
              }}
            >
              Sign Up as Pro
            </Button>
            <div className="flex flex-col justify-center items-center !pt-6">
              <ul className="list-disc w-auto list-inside !space-y-3 font-semibold text-start">
                <li>Priority search placement</li>
                <li>Profile badge</li>
                <li>Unlimited portfolio </li>
                <li>Better brand visibility</li>
                <li>Advanced analytics</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
