import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginForm from "./login-form";

export default function Page() {
  return (
    <div className="!p-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Log in</CardTitle>
          <CardDescription className="text-lg font-semibold">
            Not registered?{" "}
            <Link href={"/register"} className="text-pretty text-primary">
              Register
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6">
          <div className="">
            <LoginForm />
          </div>
          <div className="w-full h-full">
            {/* <Image src="" height={} width={} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
