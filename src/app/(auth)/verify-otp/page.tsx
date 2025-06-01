import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import OtpForm from "./forgot-form";

export default function Page() {
  return (
    <div className="!p-12">
      <h1 className="text-center !pt-12 text-4xl font-bold">Forget Password</h1>
      <p className="text-center text-muted-foreground !pt-4 !pb-12">
        Enter valid information to update a new password
      </p>
      <Card className="w-1/2 !mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verification code
          </CardTitle>
          <CardDescription className="text-center">
            We sent a reset link to contact@dscode.com enter 6 digit code that
            is mentioned in the email
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="">
            <OtpForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
