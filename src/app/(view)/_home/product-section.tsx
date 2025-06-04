"use client";
import React, { useState } from "react";
import { Grid3X3Icon, MapPinIcon } from "lucide-react";
import ProductCard from "@/components/core/prod-card";
import { Button } from "@/components/ui/button";
export default function ProdSection() {
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
    <section className="!mt-12">
      <div className="flex flex-row justify-between items-center">
        <h2 className="!pb-6 text-4xl font-semibold text-primary">Listings</h2>
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
            ? "lg:grid-cols-10 md:gap-2 lg:gap-10"
            : showGrid
            ? "grid-cols-5 gap-4 md:gap-12"
            : showMap
            ? "grid-cols-1"
            : ""
        }`}
      >
        {showGrid && (
          <div
            className={`${
              showMap
                ? "col-span-full md:col-span-6 2xl:col-span-4 grid grid-cols-1 sm:grid-cols-2"
                : "col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            } gap-6 lg:gap-12 self-start`}
          >
            {Array.from({ length: showGrid && showMap ? 5 : 24 }).map(
              (_, i) => (
                <ProductCard key={i} />
              )
            )}
          </div>
        )}

        {showMap && (
          <div
            className={`${
              showGrid
                ? "col-span-6 md:col-span-4 2xl:col-span-6"
                : "col-span-full"
            }`}
          >
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
  );
}
