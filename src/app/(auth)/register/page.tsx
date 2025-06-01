import { Card } from "@/components/ui/card";
import { HandshakeIcon, TagIcon } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-[calc(100dvh-64px)] flex flex-col justify-center items-center !space-y-12">
      <h1 className="text-4xl font-bold text-center">
        What brings you to Fitfluencex?
      </h1>
      <div className="w-4/5 grid grid-cols-2 gap-6">
        <Link
          href="/register/brand"
          className="hover:scale-105 transition-transform"
        >
          <Card className="flex flex-col justify-center items-center gap-6 !py-[100px] cursor-pointer">
            <HandshakeIcon className="size-16" />
            <h2 className="text-center text-2xl font-bold">
              Buying Services <br /> (Brand)
            </h2>
          </Card>
        </Link>
        <Link
          href="/register/creator"
          className="hover:scale-105 transition-transform"
        >
          <Card className="flex flex-col justify-center items-center gap-6 !py-[100px] cursor-pointer">
            <TagIcon className="size-16" />
            <h2 className="text-center text-2xl font-bold">
              Selling Services <br />
              (Content Creator)
            </h2>
          </Card>
        </Link>
      </div>
    </div>
  );
}
