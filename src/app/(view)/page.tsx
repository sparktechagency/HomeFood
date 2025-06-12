"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Listing from "./_home/listing";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <main className="!py-12 !px-4 md:!px-12">
      <section className="w-full sm:w-3/4 lg:w-1/2 !p-2 grid grid-cols-1 md:grid-cols-2 gap-6 border !mx-auto rounded-xl">
        {/* Destination Input */}
        <div className="w-full flex flex-col !p-4 justify-center items-start gap-2 bg-secondary rounded-lg">
          <Label className="font-semibold text-zinc-600">Where</Label>
          <Input placeholder="Search Destination" />
        </div>

        {/* Date Picker */}
        <div className="w-full flex flex-col !p-4 justify-center items-start gap-2 rounded-lg">
          <Label className="font-semibold text-zinc-600">Check in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left text-sm font-normal border-2 border-muted ${
                  !date ? "text-muted-foreground" : ""
                }`}
              >
                {date ? format(date, "PPP") : "Search Date"}
                {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </section>

      {/* Listing Component */}
      <Listing />
    </main>
  );
}
