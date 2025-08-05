'use client';
import { useGetOwnprofileQuery } from "@/redux/features/AuthApi";
import { redirect } from "next/navigation";

export default async function Page() {
  const {
    data: userInfo,
    isLoading: isProfileLoading,
  } = useGetOwnprofileQuery({});


  // Extract nested user data
  const userProfile = userInfo?.data;


  console.log('userProfile', userProfile);



  if (userProfile?.role === "SELLER") {
    redirect("/seller/dashboard");
  } else {
    redirect("/buyer/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Redirecting...</p>
    </div>
  );
}
