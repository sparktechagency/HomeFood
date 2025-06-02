import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <main className="!py-12 !space-y-6">
      <h1 className="text-center font-bold text-4xl text-primary">Jobs</h1>

      <div className="w-4/5 !mx-auto !space-y-6 grid grid-cols-2 gap-6 items-stretch">
        {jobs.map((x, i) => (
          <Card key={i} className="h-full">
            {" "}
            {/* Add h-full to the Card */}
            <CardContent className="flex flex-col gap-4 items-center h-full p-6">
              {" "}
              {/* Ensure CardContent is h-full and use default padding */}
              <Image
                src={`/icon/${x.icon}`}
                height={64}
                width={64}
                className="size-18"
                alt="job-img"
              />
              <h4 className="text-xl font-bold text-center">{x.title}</h4>{" "}
              {/* Add text-center to title */}
              <p className="text-center flex-grow flex items-center justify-center">
                {x.description}
              </p>{" "}
              {/* Make paragraph take remaining space and center its content */}
            </CardContent>
            <CardFooter className="flex flex-row justify-center items-center">
              <Button asChild>
                <Link href={"/jobs/job"}>
                  Read more <ArrowRight />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}

const jobs = [
  {
    title: "Operational Roles",
    description:
      "Ever wondered what goes on behind the scenes to get your food from kitchen to doorstep? Meet the heroes making it happen.",
    icon: "job-a.svg",
  },
  {
    title: "Technical & Support Roles",
    description:
      "Who keeps the website running smoothly and customers happy? Discover the digital minds behind your favorite food experience.",
    icon: "job-b.svg",
  },
  {
    title: "Marketing & Business Roles",
    description:
      "How does a homemade food brand stand out online? Meet the creative minds turning meals into a movement.",
    icon: "job-c.svg",
  },
  {
    title: "Finance & Legal Roles",
    description:
      "Who keeps the numbers in check and the rules in play? Discover the guardians of trust behind every transaction.",
    icon: "job-d.svg",
  },
];
