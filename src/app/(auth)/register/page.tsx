import { Card } from "@/components/ui/card";
import { BanknoteIcon, TagIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="md:h-[calc(100dvh-64px)] flex flex-col justify-center items-center !space-y-12 my-12! md:my-0!">
      <h1 className="text-4xl font-bold text-center">Register as</h1>
      <div className="w-4/5 grid md:grid-cols-2 gap-6">
        <Link
          href="/register/buyer"
          className="hover:scale-105 transition-transform"
        >
          <Card className="flex flex-col justify-center items-center gap-6 !py-[100px] cursor-pointer">
            <BanknoteIcon className="size-16" />
            <h2 className="text-center text-2xl font-bold">Buyer</h2>
          </Card>
        </Link>
        <Link
          href="/register/seller"
          className="hover:scale-105 transition-transform"
        >
          <Card className="flex flex-col justify-center items-center gap-6 !py-[100px] cursor-pointer">
            <TagIcon className="size-16" />
            <h2 className="text-center text-2xl font-bold">Seller</h2>
          </Card>
        </Link>
      </div>
    </div>
  );
}
