import Image from "next/image";
import React from "react";

export default function Categories() {
  return (
    <div className="w-full grid grid-cols-12 gap-2">
      {menuCategories.map((x, i) => (
        <div
          key={i}
          className="w-full !p-2 border hover:bg-secondary/50 rounded-lg flex flex-col justify-center items-center gap-2 text-sm font-semibold"
        >
          <Image
            src={"/icon/food-ico.png"}
            height={64}
            width={64}
            alt="ico"
            className="size-12"
          />
          <span>{x}</span>
        </div>
      ))}
    </div>
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
];
