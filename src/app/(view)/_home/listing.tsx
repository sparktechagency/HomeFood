"use client";
import React, { useState } from "react";
import Categories from "./categories";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon, ChevronDown, FunnelIcon } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { sorts } from "./sorts";
import ProdSection from "./product-section";
import { Input } from "@/components/ui/input";

export default function Listing() {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState("");
  const [values, setValues] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>

      <section className="!mt-12">
        <div className="flex flex-row justify-end items-center sm:hidden">
          <Button
            variant="outline"
            className="border text-sm"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filters <FunnelIcon />
          </Button>
        </div>
        <div
          className={`
          !py-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 2xl:grid-cols-7 gap-2 
          ${showFilters ? "block" : "hidden"} sm:grid
        `}
        >
          {sorts.map((x, i) => (
            <div key={i} className="w-full">
              {x.kind ? (
                x.kind === "date" ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"secondary"}
                        className={cn(
                          "w-full justify-center text-center font-medium text-sm rounded-full",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date ? (
                          <>
                            <CalendarIcon className="!mr-2 h-4 w-4" />{" "}
                            {format(date, "PPP")}
                          </>
                        ) : (
                          <>
                            <span className="text-foreground">{x.title}</span>{" "}
                            <ChevronDown className="size-4 text-foreground" />
                          </>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto !p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                ) : x.kind === "dual-slider" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2 rounded-full flex flex-row justify-center items-center gap-2">
                      {x.title} <ChevronDown className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[400px] !pt-12 !pb-8">
                      <div className="!mt-6 !px-4">
                        <DualRangeSlider
                          label={(value) => <span>${value}</span>}
                          value={values}
                          onValueChange={setValues}
                          min={0}
                          max={100}
                          step={1}
                        />
                      </div>
                      <div className="flex flex-row justify-center items-center !mt-6 !px-4">
                        <div className="!space-x-2 !py-1 !px-2 rounded-lg">
                          <span>${values[0]}</span>
                          <span>-</span>
                          <span>${values[1]}</span>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : x.kind === "time" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2 rounded-full flex flex-row justify-center items-center gap-2">
                      {x.title} <ChevronDown className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[400px] !pt-12 !pb-8">
                      <div className="!mt-6 !px-4">
                        <h4 className="text-sm mb-4! font-medium">
                          Select Pickup time:
                        </h4>
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => {
                            setTime(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex flex-row justify-center items-center !mt-6 !px-4">
                        <div className="space-x-2 py-1 px-2 rounded-lg">
                          {time &&
                            (() => {
                              const [hours, minutes] = time
                                .split(":")
                                .map(Number);
                              const now = new Date();
                              const from = new Date(
                                now.getFullYear(),
                                now.getMonth(),
                                now.getDate(),
                                hours,
                                minutes
                              );
                              const to = new Date(from);
                              to.setHours(to.getHours() + 1);

                              const format = (date: Date) =>
                                date.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                });

                              return (
                                <>
                                  <span>From: {format(from)}</span>
                                </>
                              );
                            })()}
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2 rounded-full flex flex-row justify-center items-center gap-2">
                      {x.title} <ChevronDown className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[180px]">
                      {x.kind === "checkbox"
                        ? x.child?.map((item, i) => (
                          <DropdownMenuItem key={i}>
                            <Checkbox /> {item}
                          </DropdownMenuItem>
                        ))
                        : x.child?.map((item, i) => (
                          <DropdownMenuItem key={i}>{item}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              ) : (
                <Button
                  className="w-full rounded-full text-sm"
                  variant="secondary"
                >
                  {x.title}
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>
      <ProdSection />
    </>
  );
}
