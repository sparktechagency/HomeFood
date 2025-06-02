"use client";
import { TrendingUp, Users2Icon } from "lucide-react";
import React from "react";
import { ChartPart } from "./chart-part";
export default function Page() {
  return (
    <>
      <div className="!pb-6 ">
        <h3 className="text-lg font-semibold">Overview</h3>
        <p className="text-sm text-muted-foreground font-medium">
          Activities summary at a glance{" "}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 !pr-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            className="aspect-video border rounded-lg flex flex-col justify-around items-start !p-6"
            key={i}
          >
            <div className="bg-secondary !p-2 rounded-xl">
              <Users2Icon fill="#064145" stroke="#064145" />
            </div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-4xl">37k</h2>
              <TrendingUp color="#00aa00" />
            </div>
            <h3 className="text-xl font-semibold">Total buyer</h3>
            <p className="font-medium text-muted-foreground">
              0.5k increase than last 7 days
            </p>
          </div>
        ))}
      </div>
      <div className="!mt-6 !pr-6">
        <ChartPart />
      </div>
    </>
  );
}
