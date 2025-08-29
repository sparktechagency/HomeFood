'use client';

import Sidebar from "@/components/core/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import NotificationButton from "@/components/ui/NotificationButton";
import UserAvater from "@/components/ui/UserAvater";
import { useGetOwnprofileQuery } from "@/redux/features/AuthApi";
import { BellIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { data: user, isLoading } = useGetOwnprofileQuery({});
  const router = useRouter();
  if (isLoading) return <div>Loading...</div>;


  if (user?.data?.role !== "BUYER") {
    return router.back();
  }

  return (
    <>
      <main className="grid grid-cols-11">
        <div className="col-span-2 ">
          <div className="h-dvh w-full sticky top-0 left-0">
            <Sidebar by="creator" />
          </div>
        </div>
        <div className="col-span-9 flex flex-col justify-start items-start">
          <div className="h-[64px] w-full flex flex-row justify-between items-center !pr-6">
            {/* <h3 className="text-2xl font-bold">Hello, Rick</h3> */}
            <div className=""></div>
            <NotificationButton />
          </div>
          <div className="w-full flex-1">{children}</div>
        </div>
      </main>
    </>
  );
}
