import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Listing from "./_home/listing";

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
        <Listing />
      </main>
    </>
  );
}
