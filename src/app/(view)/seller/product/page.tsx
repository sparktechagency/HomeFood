import React from "react";

import ProfilePart from "@/components/core/profile-part";
import Image from "next/image";
import { ChevronDown, MapPinIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="!py-12 !px-4 md:!px-12 grid grid-cols-11 gap-6">
      <div className="col-span-3 border-2 rounded-lg !p-6 self-start">
        <ProfilePart />
      </div>

      <div className="col-span-8">
        <div className="">
          <div className="flex flex-row justify-between items-center"></div>
          <div className="w-full grid grid-cols-2 gap-6">
            <div className="grid grid-cols-4 gap-4">
              <Image
                src="/image/prod.jpg"
                height={600}
                width={800}
                alt="product-image"
                className="w-full aspect-[16/6] object-cover rounded-xl col-span-4"
              />
              <Image
                src="/image/prod.jpg"
                height={600}
                width={800}
                alt="product-image"
                className="object-cover rounded-xl"
              />
              <Image
                src="/image/prod.jpg"
                height={600}
                width={800}
                alt="product-image"
                className="object-cover rounded-xl"
              />
              <Image
                src="/image/prod.jpg"
                height={600}
                width={800}
                alt="product-image"
                className="object-cover rounded-xl"
              />
              <Image
                src="/image/prod.jpg"
                height={600}
                width={800}
                className="object-cover rounded-xl"
                alt="product-image"
              />
              <Image
                src="/image/prod.jpg"
                height={600}
                width={800}
                alt="product-image"
                className="col-span-2 w-full aspect-[16/6] object-cover rounded-xl"
              />
              <Image
                src="/image/prod.jpg"
                height={600}
                width={800}
                alt="product-image"
                className="col-span-2 w-full aspect-[16/6] object-cover rounded-xl"
              />
            </div>
            <div className="!space-y-6">
              <h1 className="text-3xl font-bold">VERY SPECIAL BURGIR</h1>
              <p className="flex items-center">
                <MapPinIcon className="size-5 text-primary !mr-2" />{" "}
                Olympiapark, Munich (2.3km from you)
              </p>

              <div className="flex items-center gap-2">
                <h4 className="text-primary font-bold text-3xl">$45/-</h4>{" "}
                <h4 className="line-through text-muted-foreground text-2xl font-semibold">
                  $50{" "}
                </h4>
              </div>
              <h5 className="">
                <span className="text-primary font-semibold">
                  Availability:
                </span>{" "}
                Now available
              </h5>
              <h5>
                <span className="font-semibold">Available Quantity:</span> 11
                portions
              </h5>
              <h5>
                <span className="font-semibold">Advance Order:</span>{" "}
                Recommended for {">"}4 portions
              </h5>
              <h5>
                <span className="font-semibold">Packaging:</span> Eco-friendly
                packaging
              </h5>
              <div className="grid grid-cols-2 gap-6">
                <DropdownMenu>
                  <DropdownMenuTrigger className="col-span-2" asChild>
                    <Button
                      className="w-full rounded-full flex flex-row justify-between items-center font-semibold"
                      size="lg"
                    >
                      <span>Order and Delivery</span>{" "}
                      <ChevronDown className="size-5 " />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[30dvw]">
                    lol
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  className="w-full rounded-full flex flex-row justify-center items-center font-semibold"
                  size="lg"
                >
                  Buy Food
                </Button>
                <Button
                  className="w-full rounded-full flex flex-row justify-center items-center font-semibold"
                  size="lg"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-5 gap-6">
              <Button
                className="w-full rounded-full flex flex-row justify-center items-center font-semibold"
                size="lg"
              >
                Description
              </Button>
              <Button
                className="w-full rounded-full flex flex-row justify-center items-center font-semibold"
                size="lg"
                variant="outline"
              >
                Ingredients
              </Button>
              <Button
                className="w-full rounded-full flex flex-row justify-center items-center font-semibold"
                size="lg"
                variant="outline"
              >
                Reviews
              </Button>
            </div>
            <p className="col-span-2">
              A legendary dish from the royal kitchens of Hyderabad, this
              biryani is a perfect blend of fragrant basmati rice, marinated
              meat (usually chicken or mutton), and aromatic spices like
              saffron, cardamom, cloves, and cinnamon. Cooked using the
              traditional dum method (slow-cooked in a sealed pot), the flavors
              are deeply infused, making every bite rich, flavorful, and layered
              with taste. Served with cooling raita or spicy mirchi ka salan,
              Hyderabadi Biryani is not just food—it’s an experience of Mughal
              heritage and South Indian flair.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
