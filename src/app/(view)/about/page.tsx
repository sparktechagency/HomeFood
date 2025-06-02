import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <main className="!py-12">
      <h1 className="text-center font-bold text-4xl text-primary">About Us</h1>
      <Image
        src="/image/about.jpg"
        height={1000}
        width={1600}
        className="w-full !h-[60dvh] object-center object-cover !mt-24"
        alt="about_us_image"
      />
      <div className="w-4/5 !mx-auto !my-24">
        {`HomeBites was founded in 2023 with a simple idea: everyone deserves
        access to authentic, homemade food made with love. What began as a small
        local initiative has grown into a thriving community of food lovers and
        talented home chefs across the country. We're more than just a food
        delivery service - we're a movement that celebrates home cooking
        traditions, supports local cooks, and brings people together through
        delicious food.`}
      </div>
      <h1 className="text-center font-bold text-3xl text-primary">
        Quick Stats
      </h1>
      <div className="!mt-12 !px-4 md:!px-12 grid grid-cols-3 gap-6">
        {aboutCards.map((x, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-4xl font-medium">{x.title}</CardTitle>
              <p className="text-xl font-semibold text-primary">{x.subtitle}</p>
            </CardHeader>
            <CardContent>{x.description}</CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

const aboutCards = [
  {
    title: "5000+",
    subtitle: "Home Chefs",
    description: "Talented cooks sharing family recipes across 50+ cities",
  },
  {
    title: "250K+",
    subtitle: "Happy Customers",
    description: "People enjoying authentic homemade meals monthly",
  },
  {
    title: "4.9★",
    subtitle: "Average Rating",
    description: "Customer satisfaction score across all meals",
  },
  {
    title: "10M+",
    subtitle: "Meals Served",
    description: "Delicious home-cooked dishes delivered since launch",
  },
  {
    title: "95%",
    subtitle: "Repeat Orders",
    description: "Customers who order again within 30 days",
  },
  {
    title: "15 min",
    subtitle: "Avg. Prep Time",
    description: "For our most popular ready-to-eat meals",
  },
];
