

"use client";


import { Grid3X3Icon, MapPinIcon } from "lucide-react";
import ProductCard from "@/components/core/prod-card";
import { Button } from "@/components/ui/button";
import { useGetAllHomeFoodItemsQuery } from "@/redux/features/Foodsitems/FoodApi";
import { FilterParams, FoodItem } from "@/lib/types/api";

import MapView from "@/components/MapView";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
interface ProdSectionProps {
  filters: FilterParams;
  onPageChange: (newPage: number) => void;
}

export default function ProdSection({ filters, onPageChange }: ProdSectionProps) {
  const { data, isLoading, refetch } = useGetAllHomeFoodItemsQuery(filters);
  const [showGrid, setShowGrid] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [activeMobileView, setActiveMobileView] = useState<'grid' | 'map'>('grid');

  const handleToggleGrid = () => {
    if (showGrid && !showMap) return;
    setShowGrid(!showGrid);
  };

  const handleToggleMap = () => {
    if (showMap && !showGrid) return;
    setShowMap(!showMap);
  };

  if (isLoading) {
    return (
      <section className="!mt-12">
        <div className="flex justify-between items-center pb-4">
          <Skeleton className="h-10 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!data || data.data.length === 0) {
    return <div className="text-center py-20 text-muted-foreground">No products found matching your criteria.</div>;
  }

  const ProductGrid = ({ gridClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" }) => (
    <div className={`grid ${gridClass} gap-6`}>
      {data?.data.map((food: FoodItem) => (
        <ProductCard
          key={food.id}
          item={food}
          refetch={refetch}
        />
      ))}
    </div>
  );

  return (
    <section className="!mt-12">
      <div className="flex flex-row justify-between items-center pb-4">
        <h2 className="!pb-6 lg:text-4xl md:text-2xl text-xl font-semibold text-primary">Listings ({data.total} found)</h2>

        {/* --- Mobile View Toggle --- */}
        <div className="md:hidden">
          <Button variant="ghost" className={`text-primary ${activeMobileView === 'grid' ? "bg-accent" : ""}`} onClick={() => setActiveMobileView('grid')}>
            <Grid3X3Icon />
          </Button>
          <Button variant="ghost" className={`text-primary ${activeMobileView === 'map' ? "bg-accent" : ""}`} onClick={() => setActiveMobileView('map')}>
            <MapPinIcon />
          </Button>
        </div>

        {/* --- Desktop View Toggle --- */}
        <div className="hidden md:block">
          <Button variant="ghost" className={`text-primary ${showGrid ? "bg-accent" : ""}`} onClick={handleToggleGrid}>
            <Grid3X3Icon />
          </Button>
          <Button variant="ghost" className={`text-primary ${showMap ? "bg-accent" : ""}`} onClick={handleToggleMap}>
            <MapPinIcon />
          </Button>
        </div>
      </div>

      {/* --- Mobile Content Area --- */}
      <div className="md:hidden">
        {activeMobileView === 'grid' ? <ProductGrid /> : <MapView />}
      </div>

      {/* --- Desktop Content Area --- */}
      <div className="hidden md:block my-4">
        {/* View: Grid + Map */}
        {showGrid && showMap && (
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
            <div className="md:col-span-5">
              {/* Uses the responsive default: 2 cols on md, 3 on lg */}
              <ProductGrid />
            </div>
            <div className="md:col-span-5 h-[80vh] sticky top-24">
              <MapView />
            </div>
          </div>
        )}

        {/* --- CHANGE 2: Full-width grid now has more breakpoints for better responsiveness --- */}
        {/* View: Grid Only */}
        {showGrid && !showMap && (
          <ProductGrid gridClass="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6" />
        )}

        {/* View: Map Only */}
        {showMap && !showGrid && <MapView />}
      </div>

      {/* --- Pagination Controls --- */}
      {data.last_page > 1 && (
        <div className="flex justify-start items-center gap-4 ">
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
      )}
    </section>
  );
}