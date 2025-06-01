import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPinIcon, SendIcon } from "lucide-react";
import Link from "next/link";
export default function ProfilePart({ type }: { type: "half" | "full" }) {
  return (
    <>
      <Avatar className="size-[140px] !mx-auto">
        <AvatarImage src={"https://avatar.iran.liara.run/public"} />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div className="w-full">
        <h3 className="text-xl font-bold text-center">Katrina Kane</h3>
        <p className="flex justify-center items-center gap-1 text-sm text-muted-foreground">
          <MapPinIcon className="size-4" /> Queensland, Australia
        </p>

        <p className="!mt-12">
          Hi, I&apos;m Kate — a passionate and energetic content creator with
          over 8 years of experience. I specialize in engaging, high-quality
          content across Nutrition, Wellness, Beauty, and Lifestyle. My goal is
          to inspire healthy living through authentic storytelling and creative
          visuals.
        </p>
        {type === "full" && (
          <>
            <div className="!mt-12 grid grid-cols-2 gap-4">
              <div className="w-full">
                <h4 className="text-xl font-bold !mb-4">Social Media</h4>
                <p className="text-sm">Instagram</p>
                <p className="text-sm">Facebook</p>
                <p className="text-sm">TikTok</p>
              </div>
              <div className="">
                <h4 className="text-xl font-bold !mb-4">Ceftification</h4>
                <p className="text-sm">Meta Certified</p>
              </div>
            </div>
            <div className="!mt-12">
              <h4 className="text-xl font-bold text-center">Expertise</h4>
              <p className="!mt-4">
                I&apos;m a nutritionist who helps people improve their health
                and well-being through personalized diet plans and nutrition
                advice. I guide individuals in managing diseases, achieving
                wellness goals, and making healthier lifestyle choices.
              </p>
            </div>
            <div className="!mt-12 flex flex-col justify-center items-center gap-4">
              <Button asChild>
                <Link href={"/creators/creator/chat"}>
                  Send Message <SendIcon />
                </Link>
              </Button>
              <Button asChild>
                <Link href={"/creators/creator/order"}>Order</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
