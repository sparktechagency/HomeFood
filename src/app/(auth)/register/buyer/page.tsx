import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import RegisterForm from "./register-form";

export default function Page() {
  return (
    <div className="!p-12">
      <h1 className="text-center !py-12 text-4xl font-bold">
        Register as a Buyer
      </h1>
      <Card className="w-full md:w-1/2 lg:w-1/3 mx-auto!">
        <CardContent className="">
          <div className="">
            <RegisterForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
