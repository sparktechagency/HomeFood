import Sidebar from "@/components/core/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserAvater from "@/components/ui/UserAvater";
import { BellIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "HomeFood Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="grid grid-cols-11">
        <div className="col-span-2 ">
          <div className="h-dvh w-full sticky top-0 left-0">
            <Sidebar by="admin" />
          </div>
        </div>
        <div className="col-span-9 flex flex-col justify-start items-start">
          <div className="h-[64px] w-full flex flex-row justify-between items-center !pr-6">
            {/* <h3 className="text-2xl font-bold">Hello, Rick</h3> */}
            <div className=""></div>
            <div className="flex items-center gap-2">
              <UserAvater />
              <Button size={"icon"} variant="ghost" asChild>
                <Link href="/creator/notifications">
                  <BellIcon fill="" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="w-full flex-1">{children}</div>
        </div>
      </main>
    </>
  );
}
