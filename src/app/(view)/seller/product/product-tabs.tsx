"use client";

import ReviewCard from "@/components/core/review-card";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";

export default function ProductTabs() {
  const [active, setActive] = useState("description");
  return (
    <>
      <div className="col-span-2 grid grid-cols-5 gap-6">
        <Button
          onClick={() => {
            setActive("description");
          }}
          className="w-full rounded-full flex flex-row justify-center items-center font-semibold"
          size="lg"
          variant={active === "description" ? "default" : "outline"}
        >
          Description
        </Button>
        <Button
          onClick={() => {
            setActive("ingredients");
          }}
          className="w-full rounded-full flex flex-row justify-center items-center font-semibold"
          size="lg"
          variant={active === "ingredients" ? "default" : "outline"}
        >
          Ingredients
        </Button>
        <Button
          onClick={() => {
            setActive("reviews");
          }}
          className="w-full rounded-full flex flex-row justify-center items-center font-semibold"
          size="lg"
          variant={active === "reviews" ? "default" : "outline"}
        >
          Reviews (10)
        </Button>
      </div>
      {active === "description" ? (
        <p className="col-span-2 !mt-6">{description}</p>
      ) : active === "ingredients" ? (
        <p className="col-span-2 !mt-6">{ingredients}</p>
      ) : active === "reviews" ? (
        <div className="col-span-2 !mt-6">
          <h3 className="!pb-2 border-b-2 text-2xl font-semibold">Reviews</h3>
          <div className="w-full !space-y-6 !pt-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <ReviewCard key={i} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

const description = `A legendary dish from the royal kitchens of Hyderabad, this biryani is a
        perfect blend of fragrant basmati rice, marinated meat (usually chicken
        or mutton), and aromatic spices like saffron, cardamom, cloves, and
        cinnamon. Cooked using the traditional dum method (slow-cooked in a
        sealed pot), the flavors are deeply infused, making every bite rich,
        flavorful, and layered with taste. Served with cooling raita or spicy
        mirchi ka salan, Hyderabadi Biryani is not just food—it';s an
        experience of Mughal heritage and South Indian flair.`;

const ingredients = `Basmati rice, chicken or mutton, yogurt, fried onions, ginger-garlic paste, red chili powder, turmeric, garam masala, coriander powder, lemon juice, salt, mint leaves, coriander leaves, green cardamom, cloves, bay leaves, cinnamon, star anise, black cardamom, mace, nutmeg, saffron, rose water, kewra water, ghee or oil.`;
