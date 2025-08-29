


"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
import { useState, useMemo } from "react";
import ProductCard from "@/components/core/prod-card";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";

import { imageUrl } from "@/redux/baseApi";
import { FoodItem } from "@/lib/types/api";
import { toast } from "sonner";
import { useGetFoodDetaisByIdQuery } from "@/redux/features/Seller/SellerApi";
import { useOrderFoodMutation } from "@/redux/features/Foodsitems/FoodApi";
import { useGetOwnprofileQuery } from "@/redux/features/AuthApi";
import OrderSuccessModal from "@/components/ui/OrderSuccessModal";
type OrderData = {
  order_id: number;
  total_price: number;
  payment_status: string;
  delivery_status: string;
  delivery_address: string;
};
// --- Main Component ---
export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, isError } = useGetFoodDetaisByIdQuery(id as string, {
    skip: !id,
  });

  const userId = data?.data?.food?.user_id;
  const [orderFood, { isLoading: isOrdering }] = useOrderFoodMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const food = data?.data?.food;
  const similarFoods = data?.data?.similar_foods;
  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "pickup"
  );

  const { subtotal, calculatedDeliveryFee, total } = useMemo(() => {
    const itemPrice = food?.price || 0;
    const subtotal = quantity * itemPrice;
    const deliveryFee = food?.delivery_fee || 0;
    const minOrder = food?.minimum_order || Infinity;

    const calculatedDeliveryFee =
      deliveryMethod === "delivery"
        ? subtotal >= minOrder
          ? 0
          : deliveryFee
        : 0;

    const total = subtotal + calculatedDeliveryFee;
    return { subtotal, calculatedDeliveryFee, total };
  }, [quantity, deliveryMethod, food]);

  const incrementQuantity = () =>
    setQuantity((prev) => Math.min(food?.quantity || prev, prev + 1));
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));


  const handleProceedToPayment = async () => {
    if (!id) {
      toast.error("Food item not found.");
      return;
    }
    if (!deliveryMethod) {
      return toast.error("Please select a delivery method.");
    }
    const body: {
      food_id: string[];
      quantity: number[];
      order_status: "delivery" | "pickup";
      delivery_address?: string; // Optional property
    } = {
      food_id: [id as string],
      quantity: [quantity],
      order_status: deliveryMethod,
    };


    if (deliveryMethod === "delivery") {
      body.delivery_address = "Dhaka, Bangladesh";
    }

    try {
      const res = await orderFood({ body, id: userId }).unwrap();
      console.log('res', res);

      setOrderData(res.data);
      setIsModalOpen(true);
      toast.success(res.message || "Order placed successfully");
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order failed:", err);
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (isError || !food) {
    return <div className="text-center p-8">Failed to load food details.</div>;
  }

  const userRole = food?.user?.role;

  return (
    <div className="!py-8 !px-4 md:w-4/5 !mx-auto">
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
                    src={
                      food.images?.[0]
                        ? `${imageUrl + food.images?.[0]}`
                        : "/image/placeholder.jpg"
                    }
                    alt={food.title}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </div>

                <div className="!space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold !mb-2">{food.title}</h2>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-4" />
                      {food.user?.address}
                    </p>
                    <p className="flex items-center gap-2 text-muted-foreground !mt-1">
                      <Clock className="size-4" />
                      Available: {food.delivery_time}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-primary">
                      ${food.price}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="!space-y-3">
                    <label className="text-sm font-medium">Quantity</label>
                    <div className="flex justify-end sm:justify-start items-center gap-3">
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
                        disabled={quantity >= food.quantity}
                      >
                        <PlusIcon className="size-4" />
                      </Button>
                    </div>
                    {quantity >= food.quantity && (
                      <p className="text-sm text-red-500">
                        Maximum quantity reached
                      </p>
                    )}
                  </div>
                  {calculatedDeliveryFee > 0 &&
                    deliveryMethod === "delivery" && (
                      <div className="!mt-4 !p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-700">
                          <div className="size-2 bg-blue-500 rounded-full" />
                          Add{" "}
                          <span className="font-semibold">
                            ${(food.minimum_order - subtotal).toFixed(2)}
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

          <Card>
            <CardHeader>
              <CardTitle>Delivery Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </CardContent>
          </Card>

          {/* Delivery Options */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {(food.delivery_option === "both" ||
                  food.delivery_option === "pickup") && (
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
                        <p className="text-sm opacity-80">Available today</p>
                      </div>
                    </Button>
                  )}
                {(food.delivery_option === "both" ||
                  food.delivery_option === "delivery") && (
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
                        <p className="text-sm opacity-80">
                          Estimated arrival time varies
                        </p>
                      </div>
                    </Button>
                  )}
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
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span
                      className={
                        calculatedDeliveryFee === 0
                          ? "text-green-600 font-medium"
                          : ""
                      }
                    >
                      {calculatedDeliveryFee === 0
                        ? "Free"
                        : `$${calculatedDeliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                )}
                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {calculatedDeliveryFee === 0 && deliveryMethod === "delivery" && (
                <div className="flex items-center gap-2 !p-2 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="size-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    Free delivery applied!
                  </span>
                </div>
              )}

              {/* --- 6. Updated Button to trigger the handler --- */}
              <Button
                className="w-full !mt-6"
                size="lg"
                onClick={handleProceedToPayment}
                disabled={isOrdering}
              >
                {isOrdering ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="size-4 !mr-2" />
                    Proceed to Payment
                  </>
                )}
              </Button>

              <div className="text-center !mt-4">
                <p className="text-xs text-muted-foreground">
                  By placing this order, you agree to our Terms of Service
                </p>
              </div>

              {/* Seller Info */}
              <Card className="!mt-6">
                <CardContent className="!pt-4">
                  <div className="flex items-center gap-3">
                    <StoreIcon className="size-5 text-primary" />
                    <span className="text-sm">Order more from</span>
                    <Link
                      href={`${userRole === "SELLER" ? "/seller" : "/buyer"
                        }/${food.user.id}`}
                      className="font-semibold text-primary underline hover:text-primary/70 transition-colors"
                    >
                      {food.user.full_name}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
      <OrderSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={orderData}
      />
      {similarFoods && similarFoods.length > 0 && (
        <div className="col-span-11 !mt-12">
          <h2 className="text-3xl font-semibold !pb-4 border-b">
            Similar Food
          </h2>
          <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 !mt-6">
            {similarFoods.map((item: FoodItem) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}