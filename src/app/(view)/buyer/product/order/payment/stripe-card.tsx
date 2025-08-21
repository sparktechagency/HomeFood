"use client";
import React from "react";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function StripeCard() {
  const stripePromise = loadStripe("pk_test_qblFNYngBkEdjEZ16jxxoWSM");
  return (
    <Elements
      stripe={stripePromise}
      options={{ mode: "payment", amount: 50, currency: "usd" }}
    >
      <PaymentElement />
      <Button className="w-full mt-12!" asChild>
        <Link href="/">Confirm Payment</Link>
      </Button>
    </Elements>
  );
}
