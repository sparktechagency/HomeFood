import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Categories from "./_home/categories";

export default function Home() {
  return (
    <>
      <main className="!py-12 !px-4 md:!px-12">
        <section className="w-1/2 !p-2 grid grid-cols-2 gap-6 border !mx-auto rounded-xl">
          <div className="w-full flex flex-col !p-4 justify-center items-start gap-2 bg-secondary rounded-lg">
            <Label className="font-semibold text-zinc-600">Where</Label>
            <Input placeholder="Search Destination" />
          </div>
          <div className="w-full flex flex-col !p-4 justify-center items-start gap-2 rounded-lg">
            <Label className="font-semibold text-zinc-600">Check in</Label>
            <Input placeholder="Search Date" />
          </div>
        </section>
        <section className="!mt-12">
          <Categories />
        </section>
        <section className="!mt-12">
          <div className="w-4/5 !mx-auto !py-6 grid grid-cols-6 gap-6 ">
            {sorts.map((x, i) => (
              <div
                key={i}
                className="w-full bg-secondary !py-2 overflow-hidden rounded-full flex flex-col justify-center items-center"
              >
                <span>{x}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="!mt-12">
          <div className="grid grid-cols-10">
            <div className="col-span-4 bg-yellow-300 aspect-square"></div>
            <div className="col-span-6 bg-lime-300 aspect-square"></div>
          </div>
        </section>
      </main>
    </>
  );
}

const sorts = [
  "Special Features",
  "Pickup Time",
  "Price",
  "Rating",
  "Listing by Seller",
  "Listing by Buyer",
];
