

"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllCategorysQuery } from "@/redux/features/categorys/CategoryApi";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { imageUrl } from "@/redux/baseApi";


interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
}

export default function Categories() {
  const { data: categoriesData, isLoading, isError } = useGetAllCategorysQuery({
    page: 1,
    perPage: 50,
  });

  const categories: Category[] = categoriesData?.data?.data || [];

  return (
    <section className="py-8 md:py-12 lg:px-12 md:px-8 px-2 bg-white dark:bg-gray-950">
      <div className="">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          Browse Categories
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {/* Handle Loading State */}
            {isLoading &&
              Array.from({ length: 8 }).map((_, i) => (
                <CarouselItem key={`skeleton-${i}`} className="pl-2 md:pl-4 basis-1/4 md:basis-1/8">
                  <div className="flex flex-col items-center gap-2">
                    <Skeleton className="h-20 w-20 rounded-lg" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </CarouselItem>
              ))}

            {isError && (
              <div className="w-full text-center text-red-500">Failed to load categories.</div>
            )}

            {!isLoading && !isError && categories.length > 0 &&
              categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-2 md:pl-4 basis-1/4 sm:basis-1/6 md:basis-1/8"
                >
                  <div
                    // href={`/listing?category=${category.slug}`}
                    className="group cursor-pointer flex flex-col items-center gap-2 text-center p-1"
                  >
                    <div className="relative h-20 w-20 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                      {category.image ? (
                        <Image
                          src={`${imageUrl + category.image}`}
                          alt={category.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 25vw, 12.5vw"
                        />
                      ) : (
                        <div className="text-gray-400 text-3xl font-bold">
                          {category.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium line-clamp-2 text-ellipsis text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>

        {!isLoading && !isError && categories.length === 0 && (
          <div className="text-center text-muted-foreground mt-8">No categories found.</div>
        )}
      </div>
    </section>
  );
}