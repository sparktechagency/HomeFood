
"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCreateReviewMutation, useGetFoodDetaisByIdQuery, useGetFoodReviewByIdQuery } from "@/redux/features/Seller/SellerApi";
import { imageUrl } from "@/redux/baseApi";
import { toast } from "sonner";

// Import UI components
import ProfilePart from "@/components/core/profile-part";
import ProductCard from "@/components/core/prod-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import Icons and Types
import { MapPinIcon, ChevronDown, Clock, Calendar, Package, Info, Star, ThumbsUp, Quote, Send } from "lucide-react";
import { FoodItem } from "@/lib/types/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useGetOwnprofileQuery } from "@/redux/features/AuthApi";

export default function FoodDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetFoodDetaisByIdQuery(id as string, { skip: !id });
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { data: review, isLoading: reviewLoading, refetch } = useGetFoodReviewByIdQuery(id as string, { skip: !id });
  const [CreateReview, { isLoading: isReviewLoading }] = useCreateReviewMutation();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const food = data?.data?.food;
  const similarFoods = data?.data?.similar_foods;
  console.log('food', food);
  const { data: user } = useGetOwnprofileQuery({});
  // Cart functionality
  const [cart, setCart] = useState<FoodItem[]>([]);

  // Load cart from localStorage on mount
  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save to localStorage whenever cart changes
  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const handleSubmit = async () => {
    if (!user?.data) {
      return toast.error("Please login to add review")
    }
    // Basic validation
    if (rating === 0 || text.trim() === "") {
      alert("Please provide a rating and a comment.");
      return;
    }
    const data = {
      rating,
      text,
    };
    try {
      const response = await CreateReview({ data, id }).unwrap();
      console.log('response', response);
      if (response?.success) {
        toast.success(response?.message || "Review added successfully")
        refetch()
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong")
    }


    // Reset form after submission
    setRating(0);
    setText("");
  };
  const handleAddToCart = () => {
    if (food) {
      const existingItem = cart.find(item => item.id === food.id);
      if (existingItem) {
        toast.info(`${food.title} is already in your cart`);
      } else {
        setCart([...cart, food]);
        toast.success(`${food.title} added to cart!`);
      }
    }
  };

  if (isLoading) return <PageSkeleton />;
  if (isError || !food) return <div className="text-center py-20">Failed to load details.</div>;

  const images = food.images || [];
  const primaryImage = mainImage || (images.length > 0 ? `${imageUrl}${images[0]}` : "/placeholder.jpg");

  // Available dates for ordering
  const availableDates = [
    { label: "Today", value: new Date().toLocaleDateString() },
    { label: "Tomorrow", value: new Date(Date.now() + 86400000).toLocaleDateString() },
    { label: "June 15", value: "June 15, 2023" }
  ];

  return (
    <div className="!py-12 mt-18 !px-4 md:!px-12 grid md:grid-cols-11 gap-8">
      {/* --- Seller Profile --- */}
      <div className="md:col-span-3 border-2 rounded-lg !p-6 self-start">
        <ProfilePart user={food.user} />
      </div>

      {/* --- Main Content --- */}
      <div className="md:col-span-8">
        <div className="w-full md:grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <Image
              src={primaryImage}
              height={600}
              width={800}
              alt={food.title}
              className="w-full h-auto aspect-[4/3] object-cover rounded-xl"
            />
            <div className="grid grid-cols-4 gap-4">
              {images.map((img: string, index: number) => (
                <button key={index} onClick={() => setMainImage(`${imageUrl}${img}`)}>
                  <Image
                    src={`${imageUrl}${img}`}
                    height={150}
                    width={200}
                    alt={`${food.title} thumbnail ${index + 1}`}
                    className="object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Food Details */}
          <div className="!space-y-4 !mt-12 md:!mt-0">
            <h1 className="text-3xl font-bold">{food.title}</h1>
            <p className="flex items-center text-muted-foreground">
              <MapPinIcon className="size-5 text-primary !mr-2" /> {food.user.address}
            </p>
            <div className="flex items-center gap-2">
              <h4 className="text-primary font-bold text-3xl">${food.price.toFixed(2)}</h4>
            </div>
            <h5><span className="font-semibold">Availability time :</span> {food.delivery_time}</h5>
            <h5><span className="font-semibold">Available Quantity:</span> {food.quantity} portions</h5>
            {/* <h5><span className="font-semibold">Packaging:</span> {food.container_size}</h5> */}
            <div className="flex gap-2 items-center">
              <span className="font-semibold">Dietary Aspects: </span>
              <Badge>{food.dietary_info}</Badge>
            </div>

            {/* Order and Delivery Dropdown */}


            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <Button
                size="lg"
                className="rounded-full"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button> */}
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full" asChild>
                  <Button className="rounded-full flex justify-between items-center font-semibold" size="lg">
                    <span>Order and Delivery</span> <ChevronDown className="size-5 " />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)] md:w-[400px] ">
                  <div className="p-4 space-y-4">

                    <div className="space-y-2">
                      <h2 className="font-semibold flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Available Dates
                      </h2>
                      <div className="flex gap-2">
                        {availableDates.map((date) => (
                          <Badge key={date.label} variant="outline">
                            {date.label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h2 className="font-semibold flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Pickup Time
                      </h2>
                      <p className="text-sm text-muted-foreground">{food.delivery_time || "11:00 AM - 9:00 PM"}</p>
                    </div>

                    <div className="space-y-2">
                      <h2 className="font-semibold flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Advance Order
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Recommended for orders &gt;4 portions
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h2 className="font-semibold flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Packaging
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {food.container_size || "Eco-friendly containers"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h2 className="font-semibold flex items-center gap-2">
                        Delivery Options
                      </h2>
                      <div className="flex items-center gap-2">
                        {food.delivery_option.includes('pickup') || food.delivery_option.includes('both') ? (
                          <Badge>Pickup</Badge>
                        ) : null}
                        {food.delivery_option.includes('delivery') || food.delivery_option.includes('both') ? (
                          <Badge variant="outline">Delivery</Badge>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="lg"
                className="rounded-full"

                asChild
              >
                <Link href={`/seller/product/order/${food.id}`}>Buy Now</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3 gap-2 max-w-3xl">
              <TabsTrigger
                className="border-2 rounded-4xl py-2 font-medium data-[state=active]:bg-[#3C8D60] data-[state=active]:text-white data-[state=active]:border-[#3C8D60] transition-all duration-200 h-[44px] "
                value="description"
              >
                Description
              </TabsTrigger>

              <TabsTrigger
                className="border-2 rounded-4xl py-2 font-medium data-[state=active]:bg-[#3C8D60] data-[state=active]:text-white data-[state=active]:border-[#3C8D60] transition-all duration-200 h-[44px] "
                value="ingredients"
              >
                Ingredients
              </TabsTrigger>

              <TabsTrigger
                className="border-2 rounded-4xl py-2 font-medium data-[state=active]:bg-[#3C8D60] data-[state=active]:text-white data-[state=active]:border-[#3C8D60] transition-all duration-200 h-[44px] "
                value="reviews"
              >
                Reviews ({food.review_count || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="py-4 text-muted-foreground">
              {food.description}
              <div className="flex gap-2 mt-4 items-center">
                <span className="font-semibold">Dietary Aspects: </span>
                <Badge>{food.dietary_info}</Badge>
              </div>
            </TabsContent>
            <TabsContent value="ingredients" className="py-4 text-muted-foreground">
              <div className="flex gap-2 mb-4 items-center">
                <span className="font-semibold">Dietary Aspects: </span>
                <Badge>{food.dietary_info}</Badge>
              </div>
              {food.ingredients}
            </TabsContent>
            <TabsContent value="reviews" className="py-4 text-muted-foreground">

              {/* handle create review form */}
              <Card className="w-full mb-8">
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {/* Star Rating Section */}
                  <div className="grid gap-2">
                    <Label htmlFor="rating">Your Rating</Label>
                    <div
                      className="flex items-center gap-2"
                      onMouseLeave={() => setHoverRating(0)} // Clear hover when mouse leaves
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-8 w-8 cursor-pointer transition-colors",
                            (hoverRating || rating) >= star
                              ? "fill-yellow-400 text-yellow-500"
                              : "fill-muted-foreground/20 text-muted-foreground"
                          )}
                          onMouseEnter={() => setHoverRating(star)} // Set hover rating
                          onClick={() => setRating(star)} // Set permanent rating
                        />
                      ))}
                    </div>
                  </div>

                  {/* Text Review Section */}
                  <div className="grid gap-2">
                    <Label htmlFor="review-text">Your Comment</Label>
                    <Textarea
                      id="review-text"
                      placeholder="Tell us what you thought..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={4}
                      disabled={isLoading}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleSubmit}
                    disabled={rating === 0 || text.trim() === "" || isLoading}
                    className="w-full gap-2"
                  >
                    {isReviewLoading ? "Submitting..." : "Submit Review"}
                    {!isLoading && <Send className="h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>


              {food.review_count > 0 ? (
                <div className="space-y-6">
                  {review?.data?.map((review: any) => {
                    // Generate a fallback for the avatar from the user's name
                    const avatarFallback = review.user.full_name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .substring(0, 2);

                    return (
                      <div key={review.id} className="border-b pb-4">
                        <Card className="w-full overflow-hidden">
                          {/* CARD HEADER: Contains user info and rating */}
                          <CardHeader className="flex flex-row items-start justify-between gap-4 bg-muted/50 p-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={`${imageUrl}${review.user.profile}`} />
                                <AvatarFallback>{avatarFallback}</AvatarFallback>
                              </Avatar>
                              <div className="grid gap-0.5">
                                <p className="font-semibold text-foreground">
                                  {review.user.full_name}
                                </p>
                                {/* Example of a 'Verified Purchase' badge */}
                                <Badge variant="secondary" className="w-fit">
                                  Verified Purchase
                                </Badge>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={cn(
                                    "h-5 w-5",
                                    review.rating >= star
                                      ? "fill-yellow-400 text-yellow-500"
                                      : "fill-muted-foreground/20 text-muted-foreground"
                                  )}
                                />
                              ))}
                            </div>
                          </CardHeader>

                          {/* CARD CONTENT: The main review text and any replies */}
                          <CardContent className="p-4 md:p-6 text-base">
                            <div className="relative">
                              <Quote className="absolute -top-2 -left-2 h-8 w-8 text-muted/50" />
                              <p className="z-10 text-foreground/80">{review.text}</p>
                            </div>


                          </CardContent>

                          {/* CARD FOOTER: Date and action buttons */}
                          <CardFooter className="flex items-center justify-between bg-muted/50 p-4">
                            <p className="text-xs text-muted-foreground">
                              Reviewed on{" "}
                              {new Date(review.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            {/* <Button variant="ghost" size="sm" className="gap-2">
                              <ThumbsUp className="h-4 w-4" />
                              Helpful
                            </Button> */}
                          </CardFooter>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">No reviews yet. Be the first to review!</div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Similar Foods Section */}
      <div className="md:col-span-11 !mt-12">
        <h2 className="text-xl md:text-3xl font-semibold !pb-4 border-b">Similar Food</h2>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 !mt-6">
          {similarFoods?.map((item: FoodItem) => <ProductCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
}

// Skeleton component for a better loading experience
const PageSkeleton = () => (
  <div className="!py-12 mt-18 !px-4 md:!px-12 grid md:grid-cols-11 gap-8">
    <div className="md:col-span-3"><Skeleton className="h-96 w-full rounded-lg" /></div>
    <div className="md:col-span-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div><Skeleton className="w-full aspect-[4/3] rounded-xl" /></div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-8 w-1/4 mt-4" />
          <Skeleton className="h-12 w-full mt-6 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);