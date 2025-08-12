// src/app/cart/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Minus, Plus, X, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "@/redux/baseApi";

// Defines the structure for each item in the cart
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  images: string[];
  user: {
    address: string;
  };
  selected: boolean;
}

// Defines the structure for the shipping address
interface ShippingAddress {
  name: string;
  address: string;
  phone: string;
}

export default function CartPage() {
  // --- STATE MANAGEMENT ---
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [tempAddress, setTempAddress] = useState<ShippingAddress>({ name: "", address: "", phone: "" });
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);


  // --- LOCAL STORAGE INTEGRATION ---

  // 1. Load cart and address from localStorage when the component first loads
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart).map((item: any) => ({
        ...item,
        selected: item.selected ?? false, // Ensure selected property exists
      }));
      setCartItems(parsedCart);
    }

    const savedAddress = localStorage.getItem("shippingAddress");
    if (savedAddress) {
      const parsedAddress = JSON.parse(savedAddress);
      setShippingAddress(parsedAddress);
      setTempAddress(parsedAddress);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // 2. Save cart and address to localStorage whenever they change
  useEffect(() => {
    // Avoid saving the initial empty array before hydration
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    // Update the "Select All" checkbox based on item selection
    setSelectAll(cartItems.length > 0 && cartItems.every((item) => item.selected));
  }, [cartItems]);

  useEffect(() => {
    if (shippingAddress) {
      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    }
  }, [shippingAddress]);


  // --- HANDLER FUNCTIONS ---

  const handleSelectAll = (checked: boolean) => {
    setCartItems((prev) => prev.map((item) => ({ ...item, selected: checked })));
  };

  const handleItemSelect = (id: number, checked: boolean) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: checked } : item))
    );
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Quantity cannot be less than 1
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddressSave = () => {
    setShippingAddress(tempAddress);
    setIsAddressSheetOpen(false); // Close the sheet after saving
  }

  const handleConfirmOrder = () => {
    const orderDetails = {
      selectedItems,
      shippingAddress,
      subtotal,
      serviceFee,
      total
    };
    console.log("Order Confirmed:", orderDetails);
    // Here you would typically send this data to your backend API
  }

  // --- CALCULATIONS ---
  const selectedItems = cartItems.filter((item) => item.selected);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const serviceFee = 35;
  const total = subtotal > 0 ? subtotal + serviceFee : 0;
  const totalItems = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Shopping Cart</h1>
        </div>

        {/* Main Cart Section */}
        <div className="bg-white rounded-lg p-4">
          {/* Select All Header */}
          <div className="flex items-center gap-3 mb-4">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
              className="data-[state=checked]:bg-green-600"
            />
            <label htmlFor="select-all" className="font-medium text-sm">
              Select All ({cartItems.length} Items)
            </label>
          </div>

          {/* Cart Items List */}
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4 w-full">
                    <Checkbox
                      checked={item.selected}
                      onCheckedChange={(checked) =>
                        handleItemSelect(item.id, checked as boolean)
                      }
                      className="data-[state=checked]:bg-green-600"
                    />

                    <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.images?.[0]
                            ? `${imageUrl}${item.images[0]}`
                            : "/placeholder.svg"
                        }
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-base">{item.title}</h3>
                      <p className="text-xs text-gray-500">
                        {item.user.address}
                      </p>
                      <div className="font-semibold text-green-600 text-sm mt-1">
                        ${item.price * item.quantity}/-
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full justify-end">
                    <div className="flex items-center gap-1 bg-green-50 rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-8 w-8 p-0 hover:bg-green-100"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-12 h-8 text-center border-0 bg-transparent p-0 focus-visible:ring-0"
                        min="1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-8 w-8 p-0 hover:bg-green-100"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">Your cart is empty.</p>
              <Button
                asChild
                className="mt-4 bg-green-600 hover:bg-green-700"
              >
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-white rounded-lg p-4 h-fit">
          <Sheet open={isAddressSheetOpen} onOpenChange={setIsAddressSheetOpen}>
            <SheetTrigger asChild>
              <div className="mb-4 cursor-pointer">
                <h3 className="font-medium mb-2 text-base">Location</h3>
                <div className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm break-words">
                    {shippingAddress ? `${shippingAddress.name}, ${shippingAddress.address}` : "Add Shipping Address"}
                  </span>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shipping Address</SheetTitle>
                <SheetDescription>
                  Enter your details below. This information will be saved for future orders.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">Name</label>
                  <Input id="name" value={tempAddress.name} onChange={(e) => setTempAddress({ ...tempAddress, name: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="address" className="text-right">Address</label>
                  <Input id="address" value={tempAddress.address} onChange={(e) => setTempAddress({ ...tempAddress, address: e.target.value })} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="phone" className="text-right">Phone</label>
                  <Input id="phone" value={tempAddress.phone} onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })} className="col-span-3" />
                </div>
              </div>
              <Button onClick={handleAddressSave} className="w-full bg-green-600 hover:bg-green-700">Save Address</Button>
            </SheetContent>
          </Sheet>

          <div className="space-y-2">
            <h3 className="font-semibold text-base">Order Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>${subtotal.toFixed(2)}/-</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span className="text-green-600">
                  ${subtotal > 0 ? serviceFee.toFixed(2) : (0).toFixed(2)}/-
                </span>
              </div>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}/-</span>
              </div>
            </div>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mt-4"
              disabled={total === 0 || !shippingAddress}
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
