
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { FilterParams } from "@/lib/types/api";

const libraries: ("places")[] = ["places"];

interface HeroSearchProps {
    filters: FilterParams;
    onFilterChange: (newValues: Partial<FilterParams>) => void;
}

export default function HeroSearch({ filters, onFilterChange }: HeroSearchProps) {
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_Maps_API_KEY as string,
        libraries,
    });

    const onLoad = (ac: google.maps.places.Autocomplete) => setAutocomplete(ac);

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            const address = place.formatted_address || "";
            if (address) {
                // Update search filter when place is selected
                onFilterChange({ search: address });
            }
        }
    };

    const handleSearch = () => {
        // This function can trigger the actual search/navigation
        // The filters are already up-to-date in the parent component
        console.log("Searching with filters:", filters);
    };

    if (loadError) return <div>Error loading maps.</div>;
    if (!isLoaded) return <Skeleton className="h-20 w-full" />;

    return (
        <section className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-4 
                           md:p-2 md:grid md:grid-cols-5 md:gap-2 md:border md:rounded-full md:shadow-md">
            {/* Destination */}
            <div className="w-full flex flex-col p-4 rounded-lg md:p-2 md:pl-6 md:col-span-2 border md:border-none">
                <Label className="font-semibold text-sm">Where</Label>
                <Autocomplete
                    onLoad={onLoad}
                    onPlaceChanged={onPlaceChanged}
                    fields={["formatted_address", "geometry.location"]}
                >
                    <Input
                        placeholder="Search Destination"
                        defaultValue={filters.search} // Use defaultValue to show parent state
                        onChange={(e) => onFilterChange({ search: e.target.value })}
                        className="border-none shadow-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </Autocomplete>
            </div>

            {/* Date Picker */}
            <div className="w-full flex flex-col p-4 rounded-lg md:p-2 md:pl-6 md:border-l md:col-span-2 border md:border-none">
                <Label className="font-semibold text-sm">Check in</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className={`w-full justify-start text-left font-normal p-0 h-auto hover:bg-transparent ${!filters.date ? "text-muted-foreground" : ""}`}>
                            {/* FIXED: Parse the string date before formatting for display */}
                            {filters.date ? format(new Date(filters.date), "PPP") : <span>Add dates</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            // Parse string to Date object to show selection
                            selected={filters.date ? new Date(filters.date) : undefined}
                            // FIXED: Format the date to "yyyy-MM-dd" on select
                            onSelect={(newDate) => {
                                if (newDate) {
                                    const formattedDate = format(newDate, "yyyy-MM-dd");
                                    onFilterChange({ date: formattedDate });
                                } else {
                                    onFilterChange({ date: undefined });
                                }
                            }}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Search Button */}
            <div className="flex items-center justify-center md:p-2">
                <Button onClick={handleSearch} className="w-full h-14 rounded-lg text-lg md:w-12 md:h-12 md:rounded-full">
                    <Search className="h-5 w-5 md:mr-0" />
                    <span className="md:sr-only ml-2 md:ml-0">Search</span>
                </Button>
            </div>
        </section>
    );
}