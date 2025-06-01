"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import Plan from "../_plan/plan";

export default function Page() {
  const plan = useSearchParams().get("plan");

  if (plan === null || plan === "" || (plan !== "free" && plan !== "pro")) {
    return <Plan type="brand" />;
  }

  return <div>{plan}</div>;
}
