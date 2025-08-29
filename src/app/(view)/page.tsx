


"use client";

import React, { useState } from "react";

import { FilterParams } from "@/lib/types/api";
import HeroSearch from "@/components/ui/HeroSearch";
import Listing from "./_home/listing";
import ProdSection from "./_home/product-section";
import Categories from "./_home/categories";

export default function SearchPage() {
  // The single source of truth for all filters
  const [filters, setFilters] = useState<FilterParams>({
    page: 1,
    per_page: 10,
    search: "",
    min_price: 0,
    max_price: 1000000,
    dietary_info: [],
    rating: undefined,
    listing_by_seller: 0,
    listing_by_buyer: 0,
    sort_by: undefined,
    pickup_time: "",
  });

  // A single function to update any part of the filter state
  const handleFilterChange = (newValues: Partial<FilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newValues, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <main className="!py-12 mt-18 !px-4 md:!px-12">
      {/* 1. Hero Search Section */}
      <section className="my-8">
        <HeroSearch
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </section>
      <section className="!mt-12">
        <Categories />
      </section>
      {/* 2. Listing Filters and Results Section */}
      <Listing
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <ProdSection
        filters={filters}
        onPageChange={handlePageChange}
      />
    </main>
  );
}