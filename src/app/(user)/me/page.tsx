"use client";

import { useEffect } from "react";
import { useGetOwnprofileQuery } from "@/redux/features/AuthApi";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const { data: userInfo, isLoading } = useGetOwnprofileQuery({});
  const userProfile = userInfo?.data;
  console.log('userProfile', userProfile);

  useEffect(() => {
    if (!isLoading) {
      if (userProfile?.role === "BUYER") {
        router.push("/buyer/dashboard/pending");
      } else if (userProfile?.role === "SELLER") {
        router.push("/seller/dashboard/pending");
      } else if (userProfile?.role === "ADMIN") {
        router.push("/admin/dashboard");
      }
    }
  }, [userProfile, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Redirecting...</p>
    </div>
  );
}
