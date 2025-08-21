
// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown, FunnelIcon } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { DualRangeSlider } from "@/components/ui/dual-slider";
// import { Input } from "@/components/ui/input";
// import { FilterParams } from "@/lib/types/api";

// // (Keep your sortByMap and sorts configuration array here)
// const sortByMap: { [key: string]: string } = {
//   "Price (lowest first)": "price_asc",
//   "Price (highest first)": "price_desc",
//   "Rating (high to low)": "rating_desc",
//   "Rating (low to high)": "rating_asc",
//   "Best Rated & Affordable": "best_rated_affordable",
//   "New Arrivals": "new_arrivals",
//   "Recently Added": "recently_added",
// };

// export const sorts = [
//   {
//     title: "Dietary Info",
//     child: [
//       "Vegetarian", "Vegan", "Bio", "Lactose-free", "Halal", "Gluten-free",
//       "Alcohol-free", "Nut-free", "Sugar-free", "Low-carb / Keto",
//       "High Protein", "Organic", "Low-fat", "Dairy-free", "Egg-free",
//       "Soy-free", "No added preservatives", "Calorie-conscious",
//     ],
//     kind: "checkbox",
//     filterKey: "dietary_info",
//   },
//   {
//     title: "Price Range",
//     child: [0, 1000],
//     kind: "dual-slider",
//     filterKey: "price",
//   },
//   {
//     title: "Minimum Rating",
//     child: ["5", "4", "3", "2", "1"],
//     kind: "list",
//     filterKey: "rating",
//   },
//   {
//     title: "Listing by Seller",
//     kind: "boolean_toggle",
//     filterKey: "listing_by_seller",
//   },
//   {
//     title: "Listing by Buyer",
//     kind: "boolean_toggle",
//     filterKey: "listing_by_buyer",
//   },
//   {
//     title: "Sort By",
//     child: Object.keys(sortByMap),
//     kind: "list",
//     filterKey: "sort_by",
//   },
// ];

// // Define the props this component receives from its parent
// interface ListingFiltersProps {
//   filters: FilterParams;
//   onFilterChange: (newValues: Partial<FilterParams>) => void;
// }

// export default function ListingFilters({ filters, onFilterChange }: ListingFiltersProps) {
//   // This state is for UI only (showing/hiding filters on mobile) and is fine to keep here.
//   const [showFilters, setShowFilters] = useState(false);

//   // --- Handlers now correctly use the onFilterChange prop from the parent ---

//   const handleCheckboxChange = (value: string) => {
//     const currentValues = filters.dietary_info || [];
//     const newValues = currentValues.includes(value)
//       ? currentValues.filter((v) => v !== value)
//       : [...currentValues, value];
//     onFilterChange({ dietary_info: newValues });
//   };

//   const handleBooleanToggle = (filterKey: 'listing_by_seller' | 'listing_by_buyer') => {
//     onFilterChange({ [filterKey]: !filters[filterKey] });
//   };

//   return (
//     <section className="!mt-12">
//       <div className="flex flex-col gap-4">
//         <div className="flex flex-row justify-between items-center gap-4">
//           {/* <Input
//             placeholder="Search food by keyword..."
//             value={filters.search}
//             onChange={(e) => onFilterChange({ search: e.target.value })}
//             className="max-w-xs"
//           /> */}
//           <Button
//             variant="outline"
//             className="border text-sm sm:hidden"
//             onClick={() => setShowFilters((prev) => !prev)}
//           >
//             Filters <FunnelIcon className="ml-2 size-4" />
//           </Button>
//         </div>
//       </div>

//       {/* Dynamic Filter UI */}
//       <div
//         className={`!py-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 ${showFilters ? "block" : "hidden"} sm:grid`}
//       >
//         {sorts.map((x, i) => (
//           <div key={i} className="w-full">
//             {(() => {
//               switch (x.kind) {
//                 case "dual-slider":
//                   return (
//                     <DropdownMenu>
//                       <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2">
//                         {x.title} <ChevronDown className="size-4" />
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="w-[300px] p-4">
//                         <DualRangeSlider
//                           value={[filters.min_price ?? 0, filters.max_price ?? 1000]}
//                           onValueChange={(value) => onFilterChange({ min_price: value[0], max_price: value[1] })}
//                           min={0} max={1000} step={10}
//                         />
//                         <div className="text-center mt-2">${filters.min_price} - ${filters.max_price}</div>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   );

//                 case "checkbox":
//                   return (
//                     <DropdownMenu>
//                       <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2">
//                         {x.title} <ChevronDown className="size-4" />
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="max-h-80 overflow-y-auto">
//                         {x.child?.map((item: any) => (
//                           <DropdownMenuItem key={item} onSelect={(e) => e.preventDefault()}>
//                             <Checkbox
//                               id={item}
//                               checked={filters.dietary_info?.includes(item)}
//                               onCheckedChange={() => handleCheckboxChange(item)}
//                             />
//                             <label htmlFor={item} className="pl-2 cursor-pointer">{item}</label>
//                           </DropdownMenuItem>
//                         ))}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   );

//                 case "list":
//                   return (
//                     <DropdownMenu>
//                       <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2">
//                         {x.title} <ChevronDown className="size-4" />
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent>
//                         {x.child?.map((item) => (
//                           <DropdownMenuItem
//                             key={item}
//                             onSelect={() => onFilterChange({
//                               [x.filterKey]: x.filterKey === 'sort_by' ? sortByMap[item] : Number(item),
//                             })}
//                           >
//                             {x.filterKey === 'rating' ? `${item} ★ & up` : item}
//                           </DropdownMenuItem>
//                         ))}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   );

//                 case "boolean_toggle":
//                   return (
//                     <Button
//                       className="w-full rounded-full text-sm"
//                       variant={filters[x.filterKey as 'listing_by_seller' | 'listing_by_buyer'] ? "default" : "secondary"}
//                       onClick={() => handleBooleanToggle(x.filterKey as 'listing_by_seller' | 'listing_by_buyer')}
//                     >
//                       {x.title}
//                     </Button>
//                   );

//                 default:
//                   return null;
//               }
//             })()}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FunnelIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { FilterParams } from "@/lib/types/api";

// (Keep your sortByMap and sorts configuration array here)
const sortByMap: { [key: string]: string } = {
  "Price (lowest first)": "price_asc",
  "Price (highest first)": "price_desc",
  "Rating (high to low)": "rating_desc",
  "Rating (low to high)": "rating_asc",
  "Best Rated & Affordable": "best_rated_affordable",
  "New Arrivals": "new_arrivals",
  "Recently Added": "recently_added",
};

export const sorts = [
  {
    title: "Dietary Info",
    child: [
      "Vegetarian", "Vegan", "Bio", "Lactose-free", "Halal", "Gluten-free",
      "Alcohol-free", "Nut-free", "Sugar-free", "Low-carb / Keto",
      "High Protein", "Organic", "Low-fat", "Dairy-free", "Egg-free",
      "Soy-free", "No added preservatives", "Calorie-conscious",
    ],
    kind: "checkbox",
    filterKey: "dietary_info",
  },
  {
    title: "Price Range",
    child: [0, 1000],
    kind: "dual-slider",
    filterKey: "price",
  },
  {
    title: "Minimum Rating",
    child: ["5", "4", "3", "2", "1"],
    kind: "list",
    filterKey: "rating",
  },
  {
    title: "Listing by Seller",
    kind: "boolean_toggle",
    filterKey: "listing_by_seller",
  },
  {
    title: "Listing by Buyer",
    kind: "boolean_toggle",
    filterKey: "listing_by_buyer",
  },
  {
    title: "Sort By",
    child: Object.keys(sortByMap),
    kind: "list",
    filterKey: "sort_by",
  },
];

interface ListingFiltersProps {
  filters: FilterParams;
  onFilterChange: (newValues: Partial<FilterParams>) => void;
}

export default function ListingFilters({ filters, onFilterChange }: ListingFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleCheckboxChange = (value: string) => {
    const currentValues = filters.dietary_info || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange({ dietary_info: newValues });
  };

  // --- MODIFIED HANDLER ---
  // This function now toggles between 1 (selected) and undefined (not selected).
  const handleBooleanToggle = (filterKey: 'listing_by_seller' | 'listing_by_buyer') => {
    const currentValue = filters[filterKey];
    const newValue = currentValue === 1 ? undefined : 1;
    onFilterChange({ [filterKey]: newValue });
  };

  return (
    <section className="!mt-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-end items-center gap-4 sm:justify-between">
          {/* You can add your Search input back here if you need it */}
          <div /> {/* Empty div to push the button to the right on mobile */}
          <Button
            variant="outline"
            className="border text-sm sm:hidden"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filters <FunnelIcon className="ml-2 size-4" />
          </Button>
        </div>
      </div>

      <div
        className={`!py-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 ${showFilters ? "block" : "hidden"} sm:grid`}
      >
        {sorts.map((x, i) => (
          <div key={i} className="w-full">
            {(() => {
              switch (x.kind) {
                case "dual-slider":
                  return (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2">
                        {x.title} <ChevronDown className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[300px] p-4">
                        <DualRangeSlider
                          value={[filters.min_price ?? 0, filters.max_price ?? 1000]}
                          onValueChange={(value) => onFilterChange({ min_price: value[0], max_price: value[1] })}
                          min={0} max={1000} step={10}
                        />
                        <div className="text-center mt-2">${filters.min_price} - ${filters.max_price}</div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                case "checkbox":
                  return (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2">
                        {x.title} <ChevronDown className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="max-h-80 overflow-y-auto">
                        {x.child?.map((item: any) => (
                          <DropdownMenuItem key={item} onSelect={(e) => e.preventDefault()}>
                            <Checkbox
                              id={item}
                              checked={filters.dietary_info?.includes(item)}
                              onCheckedChange={() => handleCheckboxChange(item)}
                            />
                            <label htmlFor={item} className="pl-2 cursor-pointer">{item}</label>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                case "list":
                  return (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2">
                        {x.title} <ChevronDown className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {x.child?.map((item) => (
                          <DropdownMenuItem
                            key={item}
                            onSelect={() => onFilterChange({
                              [x.filterKey]: x.filterKey === 'sort_by' ? sortByMap[item] : Number(item),
                            })}
                          >
                            {x.filterKey === 'rating' ? `${item} ★ & up` : item}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                case "boolean_toggle":
                  return (
                    <Button
                      className="w-full rounded-full text-sm"
                      variant={filters[x.filterKey as 'listing_by_seller' | 'listing_by_buyer'] === 1 ? "default" : "secondary"}
                      onClick={() => handleBooleanToggle(x.filterKey as 'listing_by_seller' | 'listing_by_buyer')}
                    >
                      {x.title}
                    </Button>
                  );
                default:
                  return null;
              }
            })()}
          </div>
        ))}
      </div>
    </section>
  );
}