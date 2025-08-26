


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
//     child: [5, 4, 3, 2, 1],
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

// interface ListingFiltersProps {
//   filters: FilterParams;
//   onFilterChange: (newValues: Partial<FilterParams>) => void;
// }

// export default function ListingFilters({ filters, onFilterChange }: ListingFiltersProps) {
//   const [showFilters, setShowFilters] = useState(false);

//   const handleCheckboxChange = (value: string) => {
//     const currentValues = filters.dietary_info || [];
//     const newValues = currentValues.includes(value)
//       ? currentValues.filter((v) => v !== value)
//       : [...currentValues, value];
//     onFilterChange({ dietary_info: newValues });
//   };

//   // --- MODIFIED HANDLER ---
//   // This function now toggles between 1 (selected) and undefined (not selected).
//   const handleBooleanToggle = (filterKey: 'listing_by_seller' | 'listing_by_buyer') => {
//     const currentValue = filters[filterKey];
//     const newValue = currentValue === 1 ? undefined : 1;
//     onFilterChange({ [filterKey]: newValue });
//   };

//   return (
//     <section className="!mt-12">
//       <div className="flex flex-col gap-4">
//         <div className="flex flex-row justify-end items-center gap-4 sm:justify-between">
//           {/* You can add your Search input back here if you need it */}
//           <div /> {/* Empty div to push the button to the right on mobile */}
//           <Button
//             variant="outline"
//             className="border text-sm sm:hidden"
//             onClick={() => setShowFilters((prev) => !prev)}
//           >
//             Filters <FunnelIcon className="ml-2 size-4" />
//           </Button>
//         </div>
//       </div>

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
//   case "checkbox":
//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2">
//           {x.title} <ChevronDown className="size-4" />
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="max-h-80 overflow-y-auto">
//           {x.child?.map((item: any) => (
//             <DropdownMenuItem key={item} onSelect={(e) => e.preventDefault()}>
//               <Checkbox
//                 id={item}
//                 checked={filters.dietary_info?.includes(item)}
//                 onCheckedChange={() => handleCheckboxChange(item)}
//               />
//               <label htmlFor={item} className="pl-2 cursor-pointer">{item}</label>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     );
//   case "list":
//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2">
//           {x.title} <ChevronDown className="size-4" />
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="left-0  absolute z-[9999] w-[180px] p-4">
//           {x.child?.map((item) => (
//             <DropdownMenuItem
//               key={item}
//               onSelect={() => onFilterChange({
//                 [x.filterKey]: x.filterKey === 'sort_by' ? sortByMap[item] : Number(item),
//               })}
//             >
//               {x.filterKey === 'rating' ? `${item} star and hire` : item}
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     );
//   case "boolean_toggle":
//     return (
//       <Button
//         className="w-full rounded-full text-sm"
//         variant={filters[x.filterKey as 'listing_by_seller' | 'listing_by_buyer'] === 1 ? "default" : "secondary"}
//         onClick={() => handleBooleanToggle(x.filterKey as 'listing_by_seller' | 'listing_by_buyer')}
//       >
//         {x.title}
//       </Button>
//     );
//   default:
//     return null;
// }
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
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FunnelIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/dual-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterParams } from "@/lib/types/api";

// --- STEP 1: Helper function to format 24-hour time to 12-hour AM/PM format ---
const formatTimeToAMPM = (time24: string): string => {
  if (!time24) return "";
  const [hours, minutes] = time24.split(":");
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12; // Convert hour to 12-hour format (0 becomes 12)
  return `${h}:${minutes} ${ampm}`;
};

const sortByMap: { [key: string]: string } = {
  "Price (lowest first)": "price_asc",
  "Price (highest first)": "price_desc",
  "Rating (high to low)": "rating_desc",
  "Rating (low to high)": "rating_asc",
  "Best Rated & Affordable": "best_rated_affordable",
  "New Arrivals": "new_arrivals",
  "Recently Added": "recently_added",
};

// --- STEP 2: Update the sorts configuration to include the time picker ---
export const sorts = [
  {
    title: "Dietary Info",
    kind: "checkbox",
    filterKey: "dietary_info",
    child: [
      "Vegetarian", "Vegan", "Bio", "Lactose-free", "Halal", "Gluten-free",
      "Alcohol-free", "Nut-free", "Sugar-free", "Low-carb / Keto",
      "High Protein", "Organic", "Low-fat", "Dairy-free", "Egg-free",
      "Soy-free", "No added preservatives", "Calorie-conscious",
    ],
  },
  {
    title: "Price Range",
    kind: "dual-slider",
    filterKey: "price",
    child: [0, 1000],
  },
  {
    title: "Pickup Time",
    kind: "time_range_picker", // Custom kind for our time picker
    filterKey: "delivery_time",
  },
  {
    title: "Minimum Rating",
    child: [5, 4, 3, 2, 1],
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
  // Local state for the time picker inputs
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Handler for the time picker's "Apply" button
  const handleApplyTimeRange = () => {
    if (startTime && endTime) {
      const formattedStart = formatTimeToAMPM(startTime);
      const formattedEnd = formatTimeToAMPM(endTime);
      const timeRangeString = formattedStart + " - " + formattedEnd;
      console.log('timeRangeString', typeof timeRangeString);

      onFilterChange({ delivery_time: timeRangeString });

    }
  };

  // Handler for the time picker's "Clear" button
  const handleClearTimeRange = () => {
    setStartTime("");
    setEndTime("");
    onFilterChange({ delivery_time: undefined });
  };

  // Handlers for your other filter types
  const handleCheckboxChange = (value: string) => {
    const currentValues = filters.dietary_info || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange({ dietary_info: newValues });
  };

  const handleBooleanToggle = (filterKey: 'listing_by_seller' | 'listing_by_buyer') => {
    const currentValue = filters[filterKey];
    onFilterChange({ [filterKey]: currentValue === 1 ? undefined : 1 });
  };

  const handleListChange = (filterKey: keyof FilterParams, item: string | number | null) => {
    if (item === null) {
      onFilterChange({ [filterKey]: undefined });
      return;
    }
    let valueToSet: string | number;
    if (filterKey === 'sort_by') {
      valueToSet = sortByMap[item as string];
    } else {
      valueToSet = item;
    }
    onFilterChange({ [filterKey]: valueToSet });
  };

  return (
    <section className="!mt-12">
      <div className="flex flex-row justify-end items-center mb-4">
        <Button
          variant="outline"
          className="border text-sm sm:hidden"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          Filters <FunnelIcon className="ml-2 size-4" />
        </Button>
      </div>

      <div className={`!py-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 ${showFilters ? "block" : "hidden"} sm:grid`}>
        {sorts.map((x, i) => (
          <div key={i} className="w-full">
            {(() => {
              switch (x.kind) {
                // --- STEP 3: Full UI implementation for all filter types ---
                case "time_range_picker":
                  return (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2 truncate">
                        {filters.delivery_time || x.title}
                        <ChevronDown className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-4 w-64 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="start-time">Start Time</Label>
                          <Input
                            id="start-time"
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-time">End Time</Label>
                          <Input
                            id="end-time"
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2 mt-4">
                          {
                            startTime && endTime ? (
                              <Button
                                size="sm"
                                className="w-full"
                                onClick={handleApplyTimeRange}
                              >
                                Apply
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                className="w-full"
                                onClick={handleClearTimeRange}
                              >
                                Clear
                              </Button>
                            )
                          }


                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );

                case "dual-slider":
                  return (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2">
                        {filters.min_price != null ? `$${filters.min_price} - $${filters.max_price}` : x.title}
                        <ChevronDown className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[300px] p-4">
                        <DualRangeSlider
                          value={[filters.min_price ?? 0, filters.max_price ?? 1000]}
                          onValueChange={(value) => onFilterChange({ min_price: value[0], max_price: value[1] })}
                          min={0} max={1000} step={10}
                        />
                        <div className="text-center mt-2">${filters.min_price ?? 0} - ${filters.max_price ?? 1000}</div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );

                case "checkbox":
                  return (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2">
                        {x.title}{filters.dietary_info && filters.dietary_info.length > 0 ? ` (${filters.dietary_info.length})` : ""}
                        <ChevronDown className="size-4" />
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
                  const filterKey = x.filterKey as keyof FilterParams;
                  const selectedValue = filters[filterKey];
                  const displayValue = filterKey === 'sort_by'
                    ? Object.keys(sortByMap).find(key => sortByMap[key] === selectedValue)
                    : selectedValue;
                  return (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-secondary w-full text-sm !py-2.5 px-4 rounded-full flex flex-row justify-center items-center gap-2 truncate">
                        {displayValue || x.title}
                        <ChevronDown className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="max-h-80 overflow-y-auto">
                        <DropdownMenuItem onSelect={() => handleListChange(filterKey, null)}>
                          Any
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {x.child?.map((item) => (
                          <DropdownMenuItem
                            key={item}
                            onSelect={() => handleListChange(filterKey, item)}
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