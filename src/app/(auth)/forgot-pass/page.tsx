import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import ForgotForm from "./forgot-form";

export default function Page() {
  return (
    <div className="!p-12">
      <h1 className="text-center !pt-12 text-4xl font-bold">Forget Password</h1>
      <p className="text-center text-muted-foreground !pt-4 !pb-12">
        Enter valid information to update a new password
      </p>
      <Card>
        <CardContent className="grid grid-cols-2 gap-6 !py-12">
          <div className="">
            <ForgotForm />
          </div>
          <div className="w-full h-full">
            {/* <Image src="" height={} width={} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
