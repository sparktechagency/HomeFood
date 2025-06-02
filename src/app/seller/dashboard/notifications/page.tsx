import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function Page() {
  return (
    <div className="!pb-12 !pr-6 !space-y-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle className="text-sm font-bold">
              Your order #23432 is confirmed
            </CardTitle>
            <CardDescription>
              Quantity: 1, Queensland, Australia
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <CardAction>
              <Button className="text-sm" variant="ghost">
                View
              </Button>
              <Button className="text-sm" variant="secondary">
                Mark as Read
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
