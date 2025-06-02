import ProductCard from "@/components/core/prod-card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <>
      {" "}
      <div className="grid grid-cols-4 gap-6 !pb-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCard key={i} control />
        ))}
      </div>
      <Button className="fixed bottom-4 right-4" asChild>
        <Link href={"/seller/dashboard/food-items/add"}>
          <PlusIcon /> Add Service
        </Link>
      </Button>
    </>
  );
}
