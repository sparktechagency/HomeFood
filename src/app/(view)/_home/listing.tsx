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
import {
  CalendarIcon,
  ChevronDown,
  Grid3X3Icon,
  MapPinIcon,
} from "lucide-react";

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
import ProductCard from "@/components/core/prod-card";

export default function Listing() {
  const [date, setDate] = React.useState<Date>();
  const [values, setValues] = useState([0, 1000]);
  const [showGrid, setShowGrid] = useState(true); // Renamed for clarity
  const [showMap, setShowMap] = useState(true); // Renamed for clarity

  const handleToggleGrid = () => {
    // If showGrid is currently true and showMap is currently false (meaning grid is the only one visible),
    // then prevent turning off the grid.
    if (showGrid && !showMap) {
      // Optionally, you could show a toast message or visually indicate this.
      return; // Do nothing
    }
    setShowGrid(!showGrid);
  };

  const handleToggleMap = () => {
    // If showMap is currently true and showGrid is currently false (meaning map is the only one visible),
    // then prevent turning off the map.
    if (showMap && !showGrid) {
      // Optionally, you could show a toast message or visually indicate this.
      return; // Do nothing
    }
    setShowMap(!showMap);
  };

  return (
    <>
      <section className="!mt-12">
        <Categories />
      </section>
      <section className="!mt-12">
        <div className="!py-6 grid grid-cols-10 gap-2 ">
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
                        <div className="!space-x-2 !py-1 !px-2 rounded-lg ">
                          <span>${values[0]}</span>
                          <span>-</span>
                          <span>${values[1]}</span>
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

      <section className="!mt-12">
        <div className="flex flex-row justify-between items-center">
          <h2 className="!pb-6 text-4xl font-semibold text-primary">
            Listings
          </h2>
          <div className="">
            <Button
              variant="ghost"
              className={`text-primary ${showGrid ? "bg-accent" : ""}`}
              onClick={handleToggleGrid}
            >
              <Grid3X3Icon />
            </Button>
            <Button
              variant="ghost"
              className={`text-primary ${showMap ? "bg-accent" : ""}`}
              onClick={handleToggleMap}
            >
              <MapPinIcon />
            </Button>
          </div>
        </div>

        <div
          className={`grid ${
            showGrid && showMap
              ? "grid-cols-10 gap-10"
              : showGrid
              ? "grid-cols-5 gap-12"
              : showMap
              ? "grid-cols-1"
              : ""
          }`}
        >
          {showGrid && (
            <div
              className={`${
                showMap
                  ? "col-span-4 grid grid-cols-2"
                  : "col-span-full grid grid-cols-5"
              } gap-12 self-start`}
            >
              {/* Render all product cards when the grid is active */}
              {Array.from({ length: showGrid && showMap ? 5 : 24 }).map(
                (_, i) => (
                  <ProductCard key={i} />
                )
              )}
            </div>
          )}
          {showMap && (
            <div className={`${showGrid ? "col-span-6" : "col-span-full"}`}>
              <iframe
                width="1200"
                height="650"
                loading="lazy"
                className="border-0 w-full h-[80dvh] rounded-lg"
                src="https://www.google.com/maps/embed/v1/search?q=Murfreesboro&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
              ></iframe>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const sorts = [
  {
    title: "Date",
    child: null,
    kind: "date",
  },
  {
    title: "Meal",
    child: [
      "Breakfast",
      "Brunch",
      "Lunch",
      "Snacks",
      "Dinner",
      "Dessert",
      "Drinks",
    ],
    kind: "list",
  },
  {
    title: "Special Features",
    child: [
      "Vegetarian",
      "Vegan",
      "Bio",
      "Lactose-free",
      "Halal",
      "Gluten-free",
      "Alcohol-free",
      "Nut-free",
      "Sugar-free",
      "Low-carb / Keto",
      "High Protein",
      "Organic",
      "Low-fat",
      "Dairy-free",
      "Egg-free",
      "Soy-free",
      "No added preservatives",
      "Calorie-conscious",
    ],
    kind: "checkbox",
  },

  {
    title: "Pickup Time",
    child: [
      "7.00-8.00",
      "8.00-9.00",
      "9.00-10.00",
      "10.00-11.00",
      "11.00-12.00",
      "12.00-01.00",
    ],
    kind: "checkbox",
  },
  { title: "Price", child: [0, 1000], kind: "dual-slider" },
  {
    title: "Location",
    child: ["Munich", "Berlin", "Dormund", "Hamburg", "Leipzig", "Heidelberg"],
    kind: "list",
  },
  {
    title: "Rating",
    child: [
      "1 star and higher",
      "2 star and higher",
      "3 star and higher",
      "4 star and higher",
    ],
    kind: "checkbox",
  },
  {
    title: "Listing by Seller",
    child: [
      "Fatema's Kitchen",
      "HomeTaste By Nisa",
      "Biryani Bros",
      "Vegan Delight",
      "Shumi's Food",
      "Hungry Panda",
      "Subway Saga",
    ],
    kind: "list",
  },
  {
    title: "Listing by Buyer",
    child: [
      "Randy Orton",
      "John Cena",
      "Brock Lesner",
      "Ryback",
      "R-Truth",
      "Dom Dom",
      "Triple H",
    ],
    kind: "list",
  },
  {
    title: "Sort By",
    child: [
      "Top Picks",
      "Price (lowest first)",
      "Price (highest first)",
      "Best Rated & Affordable",
      "Rating (high to low)",
      "Rating (low to high)",
      "Most Ordered",
      "New arrivals",
      "Recently added",
    ],
    kind: "list",
  },
];
