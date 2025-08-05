"use client";

import HeroSearch from "@/components/ui/HeroSearch";
import Categories from "./_home/categories";
import Listing from "./_home/listing";




export default function Home() {
  return (
    <main className="!py-12 mt-18 !px-4 md:!px-12">
      {/* Render the new, self-contained search component */}
      <HeroSearch />

      {/* Categories and Listing components remain */}
      <section className="!mt-12">
        <Categories />
      </section>

      <Listing />
    </main>
  );
}