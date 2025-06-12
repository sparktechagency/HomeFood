import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

export default function Categories() {
  const itemsPerSlide = 17; // Define how many categories you want per slide
  const totalCategories = menuCategories.length;
  const numberOfSlides = Math.ceil(totalCategories / itemsPerSlide);

  const generateSlides = () => {
    const slides = [];
    for (let i = 0; i < numberOfSlides; i++) {
      const startIndex = i * itemsPerSlide;
      const endIndex = startIndex + itemsPerSlide;
      const categoriesForSlide = menuCategories.slice(startIndex, endIndex);

      slides.push(
        <CarouselItem key={i} className="px-4!">
          <div className="w-full grid grid-cols-4 md:grid-cols-8 2xl:grid-cols-17 gap-2">
            {categoriesForSlide.map((category, index) => (
              <div
                key={index}
                className="w-full select-none !p-2 hover:bg-secondary/50 rounded-lg flex flex-col justify-center items-center gap-2 text-sm font-semibold h-32" // Added h-32 for fixed height
              >
                <Image
                  src={"/icon/food-ico.png"}
                  height={64}
                  width={64}
                  alt={`${category} icon`}
                  className="size-12"
                />
                <span className="text-center line-clamp-2 text-ellipsis">
                  {category}
                </span>{" "}
                {/* Added text-center for text alignment */}
              </div>
            ))}
          </div>
        </CarouselItem>
      );
    }
    return slides;
  };

  return (
    <Carousel className="!mx-4">
      <CarouselContent>{generateSlides()}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

const menuCategories = [
  "Breakfast",
  "Brunch",
  "Smoothies",
  "Snacks",
  "Sandwich",
  "Salads",
  "Desserts",
  "Pizza",
  "Burger",
  "BBQ / Grill",
  "Chicken",
  "Bowl",
  "Soups & Stews",
  "Tapas / Meze",
  "Oven Dishes",
  "Side Dishes",
  "Noodles / Pasta",
  "German",
  "General European",
  "Italian",
  "Greek",
  "Scandinavian",
  "Balkan (e.g. Bulgarian, Serbian)",
  "Polish / Eastern European",
  "Russian / Georgian",
  "American",
  "Canadian",
  "South American (e.g. Mexican, Brazilian)",
  "Central American",
  "African",
  "Caribbean",
  "Mediterranean",
  "Asian",
  "Indian",
  "Korean",
  "Japanese",
  "Vietnamese",
  "Chinese",
  "Thai",
  "Filipino",
  "Indonesian / Malaysian",
  "Afghan / Central Asian",
  "Mongolian",
  "Iranian",
  "Middle Eastern (Arabic, Lebanese, Persian, Israeli)",
  "Australian / New Zealand",
  "Peruvian",
  "Tibetan / Bhutanese",
  "Czech / Hungarian",
];
