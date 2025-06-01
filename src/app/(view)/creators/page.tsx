"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { HeartIcon } from "lucide-react";
import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

export default function Page() {
  return (
    <div className="!py-12 px-4 md:!px-12">
      <h1 className="text-center text-6xl font-bold">
        Find Your Creator <br /> Seemlessly
      </h1>
      <div className="!pt-[100px] grid grid-cols-5">
        <div className="w-full !pr-4">
          <div className="!pt-6 sticky top-0">
            <h2 className="text-4xl font-bold !pb-6">Filter</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent className="flex flex-col justify-start items-start gap-2">
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    Yoga
                  </Button>
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    Bodybuilding
                  </Button>
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    Nutrition
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-2">
                <AccordionTrigger>Gender</AccordionTrigger>
                <AccordionContent className="flex flex-col justify-start items-start gap-2">
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    Male
                  </Button>
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    Female
                  </Button>
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    Other
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-3">
                <AccordionTrigger>Video Length</AccordionTrigger>
                <AccordionContent className="flex flex-col justify-start items-start gap-2">
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    30 sec
                  </Button>
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    45 sec
                  </Button>
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    1 min
                  </Button>
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    5 mins
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent className="flex flex-col justify-start items-start gap-2">
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    Queensland
                  </Button>
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    Sydney
                  </Button>
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    Perth
                  </Button>
                  <Button
                    className="text-foreground !no-underline"
                    variant="link"
                  >
                    Melbourne
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="col-span-4 grid grid-cols-4 gap-6 ">
          {Array.from({ length: 16 }).map((_, i) => (
            <Link href={"/creators/creator"} key={i}>
              <Card className="w-full aspect-[9/12] !p-2 hover:scale-95 hover:shadow-lg transition-all">
                <CardContent
                  className="w-full h-[90%] bg-secondary rounded-lg bg-center bg-cover bg-no-repeat relative !p-0 !m-0"
                  style={{
                    backgroundImage: "url('/image/hearder-card-1.jpg')",
                  }}
                >
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full absolute right-2 top-2"
                  >
                    <HeartIcon />
                  </Button>
                  <Badge
                    className="rounded-full text-xs absolute bottom-2 right-2"
                    variant="secondary"
                  >
                    Bodybuilder
                  </Badge>
                </CardContent>
                <CardFooter className="w-full !m-0 !pb-4">
                  <h4 className="text-center w-full text-2xl font-semibold !m-0 !p-0">
                    Elvis
                  </h4>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="!py-12 flex flex-row justify-end items-center w-full col-span-5">
          <Pagination className="w-min">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
