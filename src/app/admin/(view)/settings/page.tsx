"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import React from "react";
import ProfUpdateForm from "./prof-update-form";
import { Input } from "@/components/ui/input";

import Link from "next/link";
export default function Page() {
  return (
    <div className="!pb-12 !pr-6">

      <div className="">
        <ProfUpdateForm />
      </div>

    </div>
  );
}
