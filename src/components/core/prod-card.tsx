"use client";
import React, { useEffect, useState } from "react";
// ... other imports
import { Skeleton } from "../ui/skeleton";
import { Card, CardAction, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { MapPin, StarIcon, UtensilsCrossed } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { imageUrl } from "@/redux/baseApi";
import { useActiveOrDeactiveItemMutation, useDeleteFoodItemMutation } from "@/redux/features/Seller/SellerApi";
import { toast } from "sonner";

// Define the type for a single food item based on your API response
type FoodItem = {
  id: number;
  title: string;
  price: number;
  rating: number;
  request_food_status: number;
  description: string;
  ingredients: string;
  delivery_option: 'both' | 'pickup' | 'delivery';
  delivery_time: string;
  status: number; // 1 for active
  images: string | null;
  user: {
    full_name: string;
    address?: string; // optional
    city?: string;
    profile?: string;
    role?: string;
    id?: any;
  };
  category: {
    name: string;
  };
};

// Define props for the ProductCard component
interface ProductCardProps {
  item: FoodItem;
  fromProfile?: boolean;
  activable?: boolean;
  control?: boolean;
  activer?: boolean;
  requested?: boolean;
  isbuyer?: boolean
  refetch?: () => void;
}

export default function ProductCard({
  item,
  fromProfile,
  activable,
  control,
  activer,
  requested,
  isbuyer,
  refetch
}: ProductCardProps) {
  // ... (your existing state and handlers like `active`, `handleActive`, `isMounted`)
  const [isMounted, setIsMounted] = useState(false);
  const [deleteFoodItem, { isLoading }] = useDeleteFoodItemMutation();
  const [activeOrDeactiveItem, { isLoading: activerLoading }] = useActiveOrDeactiveItemMutation();
  const [activeLoadingId, setActiveLoadingId] = useState(null);
  console.log('item', item);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <ProductCardSkeleton />;
  }


  const userProfileUrl = imageUrl + item.user.profile



  const userRole = item.user.role
  const isActive = item.status === 1;

  const handleDelete = async (id: any) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const response = await deleteFoodItem(id).unwrap();
      console.log("Deleted successfully:", response);
      toast.success(response?.message || "Item deleted successfully");
    } catch (error: any) {
      console.error("Error deleting item:", error);
      toast.error(error?.data?.message || "Failed to delete item");
    }

    console.log("Deleted item ID:", id);
  };



  const handeToggle = async (id: any) => {
    // 1. First, ask the user for confirmation.
    const confirmAction = window.confirm(`Are you sure you want to ${isActive ? "Deactivate" : "Activate"} this item?`);

    // 2. If the user cancels, do nothing.
    if (!confirmAction) {
      return;
    }

    // 3. If they confirm, NOW set the loading state for this specific item.
    setActiveLoadingId(id);

    try {
      // Your API call logic remains the same.
      const response = await activeOrDeactiveItem({ foodId: id, statusId: isActive ? 0 : 1 }).unwrap();
      console.log("toggle", response);
      toast.success(response?.message || `Item ${isActive ? "Deactivated" : "Activated"} successfully`);

      // Refetch the data to show the updated status.
      if (refetch) {
        refetch();
      }

    } catch (error: any) {
      // Your error handling remains the same.
      console.error("Error toggling item status:", error);
      toast.error(error?.data?.message || `Failed to ${isActive ? "Deactivate" : "Activate"} item`);
    } finally {
      // 4. IMPORTANT: This block will ALWAYS run after the try/catch is complete.
      // Reset the loading state so the button returns to normal.
      setActiveLoadingId(null);
    }
  };

  return (
    <Card className="!pt-0 overflow-hidden flex flex-col h-full w-full max-w-sm sm:max-w-md md:max-w-full !mx-auto">
      <Link href={`${userRole === 'SELLER' ? '/seller' : '/buyer'}/product/${item.id}`} className="block h-full">
        <CardHeader className="!p-0 relative !gap-0">
          <div className="relative w-full aspect-video overflow-hidden">
            {Array.isArray(item.images) ? (
              // যদি array হয়
              item.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={imageUrl + img}
                  alt={item.title}
                  fill
                  className="object-cover w-full h-full"
                />
              ))
            ) : (
              // যদি string হয়
              <Image
                src={imageUrl + item.images}
                alt={item.title}
                fill
                className="object-cover w-full h-full"
              />
            )}

          </div>
          <div className="hidden md:block absolute top-0 left-0 text-background text-[10px] !p-2 bg-[#FF6A0050] rounded-br-lg z-10">
            {item.delivery_time}
          </div>
          <div className="absolute top-0 right-0 flex !space-x-1 !p-1 z-10">
            {(item.delivery_option === 'both' || item.delivery_option === 'pickup') && (
              <Badge className="text-[10px] !px-2 !py-1">Pickup</Badge>
            )}
            {(item.delivery_option === 'both' || item.delivery_option === 'delivery') && (
              <Badge variant="outline" className="text-xs !px-2 !py-1 text-background">
                Delivery
              </Badge>
            )}
          </div>
          {(activable || activer) && (
            isActive ? (
              <div className="absolute bottom-0 right-0 bg-green-600 !px-4 text-background text-sm !p-1 rounded-tl-lg z-10">
                Active
              </div>
            ) : (
              <div className="absolute bottom-0 right-0 bg-zinc-300 !px-4 text-foreground !p-1 rounded-tl-lg text-sm z-10">
                Disabled
              </div>
            )
          )}
        </CardHeader>
      </Link>

      <CardContent className="!space-y-2 flex-grow !p-6 !py-0">
        <div className="flex items-start !gap-3">
          <UtensilsCrossed className="text-destructive size-5 flex-shrink-0 !mt-0.5" />
          <span className="text-sm leading-relaxed text-muted-foreground line-clamp-1" title={item.ingredients}>
            {item.title} - {item.category.name}
          </span>
        </div>

        <div className="flex items-start !gap-3">
          <MapPin className="text-destructive size-5 flex-shrink-0 !mt-0.5" />
          <span className="text-sm leading-relaxed text-muted-foreground line-clamp-1" title={`${item.user.address}, ${item.user.city}`}>
            {item.user.address}
          </span>
        </div>
        <h4 className="text-base text-primary">${item.price.toFixed(2)}</h4>

        {
          item?.request_food_status === 1 && (
            <div className="bg-[#3C8D60] !p-2 rounded-lg w-fit">
              <p className="text-sm  text-white">Requested</p>
            </div>
          )
        }

        <div className="!pt-2 !border-t border-border/50">
          <Link
            href={
              userRole === "SELLER"
                ? `/seller/${item?.user?.id}`
                : `/buyer/${item?.user?.id}`
            }
            className="flex items-center justify-between group hover:bg-muted/50 !p-3 !-m-3 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center !gap-3 min-w-0 flex-1">
              <Avatar className="size-8 flex-shrink-0 ring-2 ring-background shadow-sm">
                <AvatarImage src={userProfileUrl} />
                <AvatarFallback className="bg-muted text-muted-foreground font-medium">
                  {item.user.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-semibold group-hover:text-green-600 transition-colors duration-200 truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground truncate !mt-0.5">
                  by {item.user.full_name}
                </p>
              </div>
            </div>
            <div className="flex items-center !gap-1.5 text-sm font-medium flex-shrink-0 !ml-4">
              <span className="text-foreground">{item.rating}</span>
              <StarIcon className="size-4 fill-amber-400 text-amber-400" />
            </div>
          </Link>
        </div>
      </CardContent>

      {!fromProfile && control && (
        <CardFooter className="!p-4 pt-0">
          <CardAction className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
            <Button variant="outline" asChild className="w-full">
              <Link href={`${isbuyer ? '/buyer' : '/seller'}/dashboard/food-items/edit/${item.id}`}>Edit</Link>
            </Button>
            <Button onClick={() => handleDelete(item?.id)} variant="destructive" className="w-full">
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
            <Button
              onClick={() => handeToggle(item?.id)}
              className="w-full"
              disabled={activeLoadingId === item?.id} // disable while loading
              variant={!isActive ? "default" : "secondary"}
            >
              {activeLoadingId === item?.id
                ? "Loading..."
                : isActive
                  ? "Deactivate"
                  : "Activate"}
            </Button>

          </CardAction>
        </CardFooter>
      )}

      {/* ... (Rest of your component logic for activable, requested, dialogs etc.) */}
    </Card>
  );
}

// Skeleton component for loading state
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[225px] w-full rounded-xl" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-6 w-1/4 mt-2" />
      </div>
    </div>
  )
}