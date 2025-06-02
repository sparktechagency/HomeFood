"use client";
import {
  ChatsIcon,
  CustomOrdersIcon,
  OrdersIcon,
  ServicesIcon,
  SettingIcon,
} from "./localIcons";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils"; // Assuming you use a cn util

export default function SideMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState("dashboard");

  useEffect(() => {
    const pathParts = pathname.split("/");
    const extractedKey = pathParts[pathParts.length - 1] || "dashboard";
    setCurrent(extractedKey);
  }, [pathname]);

  const handleClick = (key: string) => {
    if (key === "/home") {
      router.push(key);
      return;
    }
    setCurrent(key);
    router.push(`/seller/dashboard/${key}`);
  };

  const items = [
    {
      label: "Pending Orders",
      key: "pending",
      icon: <CustomOrdersIcon className="size-6" />,
    },
    {
      label: "Food-items",
      key: "food-items",
      icon: <ServicesIcon className="size-6" />,
    },
    {
      label: "Request Items",
      key: "requests",
      icon: <CustomOrdersIcon className="size-6" />,
    },
    {
      label: "Order History",
      key: "orders",
      icon: <OrdersIcon className="size-6" />,
    },

    { label: "Chat", key: "chat", icon: <ChatsIcon className="size-6" /> },
    {
      label: "Settings",
      key: "settings",
      icon: <SettingIcon className="size-6" />,
    },
  ];

  return (
    <div className="flex flex-col gap-2 !mt-12">
      {items.map((x, i) => (
        <div key={i} className="">
          <Button
            onClick={() => handleClick(x.key)}
            variant={current === x.key ? "default" : "ghost"}
            size="lg"
            className={cn("w-full justify-start gap-2", {
              "bg-muted !text-foreground font-bold": current === x.key,
            })}
          >
            {x.icon} {x.label}
          </Button>
        </div>
      ))}
    </div>
  );
}
