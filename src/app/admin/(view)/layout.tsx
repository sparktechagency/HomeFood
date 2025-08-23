// Add this at the very top of the file to mark it as a Client Component
'use client';

import Sidebar from "@/components/core/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserAvater from "@/components/ui/UserAvater";
import { useGetOwnprofileQuery } from "@/redux/features/AuthApi";
import { BellIcon, LoaderCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Note: Metadata is typically exported from Server Components. 
// You might need to move this to a parent layout.tsx if this file is 'use client'.
// However, for this example, we'll leave it but acknowledge the potential issue.


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // --- All logic, including hooks, must be here, before the return statement ---

  // 1. Call the hook and get data, isLoading, and isError states
  const { data: user, isLoading, isError } = useGetOwnprofileQuery({});
  const router = useRouter();
  // 2. Handle the loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin h-12 w-12" />
      </div>
    );
  }



  // 4. Perform the authorization check
  const userRole = user?.data?.role;
  if (userRole !== "ADMIN") {
    return router.push('/login')
  }

  // 5. If all checks pass, return the main layout
  return (
    <main className="grid grid-cols-11">
      <div className="col-span-2">
        <div className="h-dvh w-full sticky top-0 left-0">
          <Sidebar by="admin" />
        </div>
      </div>
      <div className="col-span-9 flex flex-col justify-start items-start">
        <div className="h-[64px] w-full flex flex-row justify-between items-center !pr-6">
          <div className=""></div>
          <div className="flex items-center gap-2">
            <UserAvater />
            <Button size={"icon"} variant="ghost" asChild>
              <Link href="/creator/notifications">
                <BellIcon />
              </Link>
            </Button>
          </div>
        </div>
        <div className="w-full flex-1">{children}</div>
      </div>
    </main>
  );
}