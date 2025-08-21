// src/components/product-section.tsx

"use client";
import React, { useState } from "react";
import { Grid3X3Icon, MapPinIcon } from "lucide-react";
import ProductCard from "@/components/core/prod-card";
import { Button } from "@/components/ui/button";
import { useGetAllHomeFoodItemsQuery } from "@/redux/features/Foodsitems/FoodApi";
import { FilterParams, FoodItem } from "@/lib/types/api";


// Define the props for this component
interface ProdSectionProps {
  filters: FilterParams;
  onPageChange: (newPage: number) => void;
}

export default function ProdSection({ filters, onPageChange }: ProdSectionProps) {
  // Pass the entire filters object to the hook. RTK Query will refetch automatically when it changes.
  const { data, isLoading, isError, refetch } = useGetAllHomeFoodItemsQuery(filters);

  console.log('data', data);

  const [showGrid, setShowGrid] = useState(true);
  const [showMap, setShowMap] = useState(true);

  // Your existing toggle logic for grid/map view
  const handleToggleGrid = () => {
    if (showGrid && !showMap) return;
    setShowGrid(!showGrid);
  };

  const handleToggleMap = () => {
    if (showMap && !showGrid) return;
    setShowMap(!showMap);
  };

  // Render loading state
  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  // Render error state
  if (isError) {
    return <div className="text-center py-10 text-red-500">Failed to load products. Please try again.</div>;
  }

  // Render empty state
  if (!data || data.data.length === 0) {
    return <div className="text-center py-10">No products found matching your criteria.</div>;
  }
  console.log('data', data);


  // return <p>lskjf</p>

  return (
    <section className="!mt-12">
      <div className="flex flex-row justify-between items-center">
        <h2 className="!pb-6 text-4xl font-semibold text-primary">Listings ({data.total} found)</h2>
        <div>
          <Button variant="ghost" className={`text-primary ${showGrid ? "bg-accent" : ""}`} onClick={handleToggleGrid}>
            <Grid3X3Icon />
          </Button>
          <Button variant="ghost" className={`text-primary ${showMap ? "bg-accent" : ""}`} onClick={handleToggleMap}>
            <MapPinIcon />
          </Button>
        </div>
      </div>

      <div className={`grid ${showGrid && showMap ? "lg:grid-cols-10 md:gap-2 lg:gap-10" : showGrid ? "col-span-full" : showMap ? "grid-cols-1" : ""}`}>
        {showGrid && (
          <div className={`${showMap ? "col-span-full md:col-span-6 2xl:col-span-4 grid grid-cols-1 sm:grid-cols-2" : "col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"} gap-6 lg:gap-12 self-start`}>
            {/* Map over the actual API data */}
            {data?.data.map((food: FoodItem) => {
              // Safely parse image URL
              let imageUrl = "/default-image.png"; // A fallback image
              try {
                const images = JSON.parse(food.images);
                if (Array.isArray(images) && images.length > 0) {
                  // Make sure to prepend your base URL if the path is relative
                  imageUrl = `http://103.186.20.110:8123/${images[0]}`;
                }
              } catch (e) {
                console.error("Failed to parse images JSON:", food.images);
              }

              return (
                <ProductCard

                  key={food.id}
                  item={{
                    id: food.id,
                    title: food.title,
                    price: food.price,
                    description: food.description,
                    ingredients: food.ingredients,
                    delivery_option: food.delivery_option,
                    delivery_time: food.delivery_time,
                    rating: food.rating,
                    status: food.status,
                    images: food.images,
                    user: { full_name: food.user.full_name, address: food?.user?.address, city: food.user.city, profile: food.user.profile, role: food.user.role, id: food.user.id },
                    category: food.category,
                  }}


                  refetch={refetch}
                // fromProfile={false}
                // control={false}
                />
              )
            })}
          </div>
        )}

        {showMap && (
          <div className={`${showGrid ? "col-span-6 md:col-span-4 2xl:col-span-6" : "col-span-full"}`}>
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <Button
          onClick={() => onPageChange(data.current_page - 1)}
          disabled={data.current_page <= 1}
        >
          Previous
        </Button>
        <span>Page {data.current_page} of {data.last_page}</span>
        <Button
          onClick={() => onPageChange(data.current_page + 1)}
          disabled={data.current_page >= data.last_page}
        >
          Next
        </Button>
      </div>

    </section>
  );
}