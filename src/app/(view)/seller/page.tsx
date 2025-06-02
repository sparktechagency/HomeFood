import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfilePart from "@/components/core/profile-part";
import ProductCard from "@/components/core/prod-card";

export default function Page() {
  return (
    <div className="!py-12 !px-4 md:!px-12 grid grid-cols-11 gap-6">
      <div className="col-span-3 border-2 rounded-lg !p-6 self-start">
        <ProfilePart />
      </div>

      <div className="col-span-8">
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
          <div className="w-full grid grid-cols-3 gap-6 !mt-12">
            {Array.from({ length: 11 }).map((_, i) => (
              <ProductCard key={i} fromProfile activable />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
