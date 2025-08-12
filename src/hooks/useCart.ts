// src/hooks/useLocalCart.ts
"use client";

import { FoodItem } from "@/lib/types/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";

type CartItem = FoodItem & {
  quantity: number;
};

export default function useLocalCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from local storage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addItem = (item: FoodItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);

      if (existingItem) {
        toast.info(`${item.title} quantity increased in cart.`);
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      toast.success(`${item.title} added to cart!`);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const incrementItem = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => {
      const removedItem = prev.find((item) => item.id === id);
      if (removedItem) {
        toast.success(`${removedItem.title} removed from cart.`);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared successfully.");
  };

  const getItemQuantity = (id: number) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    cart,
    isLoading,
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    getItemQuantity,
    getTotalItems,
    getTotalPrice,
  };
}
