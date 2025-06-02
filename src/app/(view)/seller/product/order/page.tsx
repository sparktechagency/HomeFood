"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  BikeIcon,
  HandPlatterIcon,
  MapPin,
  MinusIcon,
  PlusIcon,
  StoreIcon,
  Clock,
  ShoppingCart,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "@/components/core/prod-card";

export default function Page() {
  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery"
  );

  const itemPrice = 45;
  const originalPrice = 50;
  const deliveryFee = quantity * itemPrice >= 60 ? 0 : 5;
  const subtotal = quantity * itemPrice;
  const total = subtotal + deliveryFee;

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="!py-8 !px-4 w-4/5 !mx-auto">
      {/* Header */}
      <div className="!mb-8 text-center">
        <h1 className="text-3xl font-bold !mb-2">Checkout</h1>
        <p className="text-muted-foreground">
          Review your order and complete your purchase
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Product Details - Left Side */}
        <div className="lg:col-span-2 !space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="size-5" />
                Your Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Image
                    height={400}
                    width={400}
                    src="/image/prod.jpg"
                    alt="Very Yummy Burger"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <Badge className="absolute !top-2 !right-2 bg-primary/50 text-sm font-semibold">
                    10% OFF
                  </Badge>
                </div>

                <div className="!space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold !mb-2">
                      VERY YUMMY BURGIR
                    </h2>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-4" />
                      Olympiapark, Munich (2.3km away)
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground !mt-1">
                      <Clock className="size-4" />
                      Ready in 10-15 mins
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary">
                      ${itemPrice}
                    </span>
                    <span className="line-through text-xl text-muted-foreground">
                      ${originalPrice}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="!space-y-3">
                    <label className="text-sm font-medium">Quantity</label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                      >
                        <MinusIcon className="size-4" />
                      </Button>
                      <span className="text-xl font-semibold !px-4">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={incrementQuantity}
                      >
                        <PlusIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                  {deliveryFee > 0 && deliveryMethod === "delivery" && (
                    <div className="!mt-4 !p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-blue-700">
                        <div className="size-2 bg-blue-500 rounded-full" />
                        Add{" "}
                        <span className="font-semibold">
                          ${60 - subtotal}
                        </span>{" "}
                        more to get{" "}
                        <span className="font-semibold">free delivery!</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Options */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  variant={
                    deliveryMethod === "delivery" ? "default" : "outline"
                  }
                  className="h-auto !p-4 flex-col gap-2"
                  onClick={() => setDeliveryMethod("delivery")}
                >
                  <div className="flex items-center gap-2">
                    <BikeIcon className="size-5" />
                    <span className="font-semibold">Delivery</span>
                  </div>
                  <div className="text-center w-full">
                    <p className="text-sm opacity-80">Standard (10-15 mins)</p>
                  </div>
                </Button>

                <Button
                  variant={deliveryMethod === "pickup" ? "default" : "outline"}
                  className="h-auto !p-4 flex-col gap-2"
                  onClick={() => setDeliveryMethod("pickup")}
                >
                  <div className="flex items-center gap-2">
                    <HandPlatterIcon className="size-5" />
                    <span className="font-semibold">Pickup</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm opacity-80">Ready in 8-12 mins</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Order Summary - Right Side */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="!space-y-4">
              <div className="!space-y-3">
                <div className="flex justify-between">
                  <span>
                    Subtotal ({quantity} item{quantity > 1 ? "s" : ""})
                  </span>
                  <span>${subtotal}</span>
                </div>

                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span
                      className={
                        deliveryFee === 0 ? "text-green-600 font-medium" : ""
                      }
                    >
                      {deliveryFee === 0 ? "Free" : `$${deliveryFee}`}
                    </span>
                  </div>
                )}
                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${deliveryMethod === "pickup" ? subtotal : total}</span>
                </div>
              </div>

              {deliveryFee === 0 && deliveryMethod === "delivery" && (
                <div className="flex items-center gap-2 !p-2 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="size-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    Free delivery applied!
                  </span>
                </div>
              )}

              <Button className="w-full !mt-6" size="lg" asChild>
                <Link href="/">
                  <CreditCard className="size-4 !mr-2" />
                  Proceed to Payment
                </Link>
              </Button>

              <div className="text-center !mt-4">
                <p className="text-xs text-muted-foreground">
                  By placing this order, you agree to our Terms of Service
                </p>
              </div>
              {/* Restaurant Info */}
              <Card className="!mt-6">
                <CardContent className="">
                  <div className="flex items-center gap-3">
                    <StoreIcon className="size-5 text-primary" />
                    <span className="text-sm">Order more from</span>
                    <Link
                      href="/seller"
                      className="font-semibold text-primary underline hover:text-primary/70 transition-colors"
                    >
                      Food Mania
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="col-span-11 !mt-12">
        <h2 className="text-3xl font-semibold !pb-4 border-b">Similar Food</h2>
        <div className="w-full grid grid-cols-3 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
