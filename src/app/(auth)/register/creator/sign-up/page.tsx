"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";
import RegisterForm from "./register-form";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const plan = useSearchParams().get("plan");
  const navig = useRouter();
  useEffect(() => {
    if (plan === null || plan === "") {
      navig.push("/register/creator");
    }
  }, [plan]);

  return (
    <div className="!p-12">
      <h1 className="text-center !py-12 text-4xl font-bold">
        Register as Content Creator
      </h1>
      <Card>
        <CardContent className="grid grid-cols-2 gap-6">
          <div className="">
            <RegisterForm />
          </div>
          <div className="w-full h-full">
            {/* <Image src="" height={} width={} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
