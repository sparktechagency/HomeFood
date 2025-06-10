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
    <div className="!p-12 flex justify-center items-center">
      <Card className="w-full lg:w-1/2 mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Log in
          </CardTitle>
          <CardDescription className="text-base font-semibold text-center">
            Not registered?{" "}
            <Link href={"/register"} className="text-pretty text-primary">
              Register
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="">
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
