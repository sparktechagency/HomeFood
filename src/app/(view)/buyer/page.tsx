import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfilePart from "@/components/core/profile-part";
import ProductCard from "@/components/core/prod-card";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="!py-12 !px-4 md:!px-12 grid md:grid-cols-11 md:gap-6">
      <div className="md:col-span-3 border-2 rounded-lg !p-6 md:self-start">
        <ProfilePart />
      </div>

      <div className="!mt-24 md:!m-0 md:col-span-8">
        <div className="">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-3xl font-semibold">All Listing</h2>
            <div className="">
              <Tabs defaultValue="all">
                <TabsList className="">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
                <TabsContent value="all"></TabsContent>
                <TabsContent value="active"></TabsContent>
                <TabsContent value="inactive"></TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6 !mt-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <ProductCard key={i} fromProfile requested />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12! w-full md:col-span-11">
        <div className="flex flex-row justify-center items-center gap-6 mb-12!">
          <div className="flex-1">
            <Separator />
          </div>
          <h2 className="text-3xl font-semibold text-primary">
            Chef Testimonials
          </h2>
          <div className="flex-1">
            <Separator />
          </div>
        </div>
        <div className="space-y-6!">
          <Card>
            <CardContent>
              <CardDescription>
                &quot;Nitengel is always punctual and friendly! One of my
                favorite customers to cook for.&quot;
              </CardDescription>
            </CardContent>
            <CardHeader>
              <CardTitle>- Chef Maria, Toronto</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardContent>
              <CardDescription>
                &quot;Nitengel is always punctual and friendly! One of my
                favorite customers to cook for.&quot;
              </CardDescription>
            </CardContent>
            <CardHeader>
              <CardTitle>- Chef Maria, Toronto</CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="mt-12! grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard value="90%" label="Request Acceptance" />
          <StatCard value="5%" label="Cancellation Rate" />
          <StatCard value="15" label="Total Order" />
          <StatCard value="8" label="Favorite Chefs" />
        </div>
      </div>
    </div>
  );
}

export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <Card>
      <CardContent className="space-y-6!">
        <h4 className="text-3xl font-semibold text-primary text-center">
          {value}
        </h4>
        <h4 className="text-center">{label}</h4>
      </CardContent>
    </Card>
  );
}
