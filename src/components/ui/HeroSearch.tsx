// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { Button } from "@/components/ui/button";
// import { Search } from "lucide-react";
// import { useLoadScript, Autocomplete } from "@react-google-maps/api";
// import { Skeleton } from "@/components/ui/skeleton";
// import { toast } from "sonner";

// // Define the structure for our location state
// interface Location {
//     address: string;
//     lat: number | null;
//     lng: number | null;
// }

// // Define the libraries to load from Google Maps
// const libraries: ("places")[] = ["places"];

// export default function HeroSearch() {
//     const [date, setDate] = useState<Date | undefined>(undefined);
//     const [location, setLocation] = useState<Location>({
//         address: "",
//         lat: null,
//         lng: null,
//     });

//     const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

//     const { isLoaded, loadError } = useLoadScript({
//         googleMapsApiKey: process.env.NEXT_PUBLIC_Maps_API_KEY as string,
//         libraries,
//     });

//     const onLoad = (ac: google.maps.places.Autocomplete) => {
//         setAutocomplete(ac);
//     };

//     const onPlaceChanged = () => {
//         if (autocomplete !== null) {
//             const place = autocomplete.getPlace();
//             const address = place.formatted_address || "";
//             const lat = place.geometry?.location?.lat();
//             const lng = place.geometry?.location?.lng();

//             if (address && lat && lng) {
//                 setLocation({ address, lat, lng });
//             } else {
//                 toast.error("Please select a valid address from the dropdown list.");
//             }
//         }
//     };

//     const handleSearch = () => {
//         if (!location.address) {
//             toast.error("Please select a destination.");
//             return;
//         }
//         if (!date) {
//             toast.error("Please select a check-in date.");
//             return;
//         }

//         console.log("Searching with the following values:");
//         console.log({
//             destination: location.address,
//             latitude: location.lat,
//             longitude: location.lng,
//             checkInDate: date ? format(date, "yyyy-MM-dd") : null,
//         });
//     };

//     if (loadError) {
//         return <div className="text-center text-red-500 py-10">Error loading maps. Please check your API key.</div>;
//     }

//     // Responsive Skeleton
//     if (!isLoaded) {
//         return (
//             <div className="w-full max-w-lg mx-auto p-4 md:p-0">
//                 <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 md:border md:rounded-full md:shadow-md md:p-2 md:h-[72px]">
//                     <Skeleton className="h-14 md:h-full w-full rounded-lg md:rounded-full" />
//                     <Skeleton className="h-14 md:h-full w-full rounded-lg md:rounded-full" />
//                     <Skeleton className="h-14 w-full md:h-12 md:w-12 rounded-lg md:rounded-full flex-shrink-0" />
//                 </div>
//             </div>
//         );
//     }

//     return (
//         // The main container switches from a vertical stack (flex-col) to a horizontal grid (md:grid)
//         <section className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-4 
//                            md:p-2 md:grid md:grid-cols-5 md:gap-2 md:border md:rounded-full md:shadow-md">

//             {/* Destination Input */}
//             <div className="w-full flex flex-col p-4  rounded-lg 
//                             md:p-2 md:pl-6  md:col-span-2 lg:border-none md:border-none border">
//                 <Label className="font-semibold text-sm">Where</Label>
//                 <Autocomplete
//                     onLoad={onLoad}
//                     onPlaceChanged={onPlaceChanged}
//                     fields={["formatted_address", "geometry.location"]}
//                 >
//                     <Input
//                         placeholder="Search Destination"
//                         className="border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
//                     />
//                 </Autocomplete>
//             </div>

//             {/* Date Picker */}
//             <div className="w-full flex flex-col p-4 rounded-lg 
//                             md:p-2 md:pl-6 md:border-l md:col-span-2 md:rounded-none lg:border-none md:border-none border">
//                 <Label className="font-semibold text-sm">Check in</Label>
//                 <Popover>
//                     <PopoverTrigger asChild>
//                         <Button
//                             variant="ghost"
//                             className={`w-full justify-start text-left font-normal p-0 h-auto hover:bg-transparent ${!date ? "text-muted-foreground" : ""}`}
//                         >
//                             {date ? format(date, "PPP") : <span>Add dates</span>}
//                         </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                             mode="single"
//                             selected={date}
//                             onSelect={setDate}
//                             initialFocus
//                         />
//                     </PopoverContent>
//                 </Popover>
//             </div>

//             {/* Search Button */}
//             {/* On mobile, it's a full-width button. On desktop, it's a small circle in the grid layout. */}
//             <div className="flex items-center justify-center md:p-2">
//                 <Button
//                     onClick={handleSearch}
//                     className="w-full h-14 rounded-lg text-lg 
//                                md:w-12 md:h-12 md:rounded-full"
//                 >
//                     <Search className="h-5 w-5 md:mr-0" />
//                     <span className="md:sr-only ml-2 md:ml-0">Search</span>
//                 </Button>
//             </div>
//         </section>
//     );
// }


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

// Define props to receive from the parent page
interface HeroSearchProps {
    filters: FilterParams;
    onFilterChange: (newValues: Partial<FilterParams>) => void;
}

export default function HeroSearch({ filters, onFilterChange }: HeroSearchProps) {
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [date, setDate] = useState<string>("");
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_Maps_API_KEY as string,
        libraries,
    });

    const onLoad = (ac: google.maps.places.Autocomplete) => setAutocomplete(ac);

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();

            const address = place.formatted_address || "";
            const lat = place.geometry?.location?.lat() || null;
            const lng = place.geometry?.location?.lng() || null;

            if (address && lat && lng) {
                // Call the parent's update function
                onFilterChange({ search: address, pickup_time: date });
            }
        }
    };

    const handleSearch = () => {
        console.log("Search button clicked. Current filters:", filters);
        // You can add navigation logic here if needed, e.g., router.push('/search-results')
        // But for now, the state is already updated in the parent.
    };

    // ... (rest of your component: skeletons, return statement)
    if (loadError) return <div>Error loading maps.</div>;
    if (!isLoaded) return <Skeleton className="h-20 w-full" />; // Simplified skeleton

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
                        onChange={(e) => onFilterChange({ search: e.target.value })}
                        className="border-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </Autocomplete>
            </div>

            {/* Date Picker */}
            <div className="w-full flex flex-col p-4 rounded-lg md:p-2 md:pl-6 md:border-l md:col-span-2 border md:border-none">
                <Label className="font-semibold text-sm">Check in</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className={`w-full justify-start text-left font-normal p-0 h-auto hover:bg-transparent ${!filters.pickup_time ? "text-muted-foreground" : ""}`}>
                            {filters.pickup_time ? format(filters.pickup_time, "PPP") : <span>Add dates</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            // selected={filters.pickup_time}
                            onSelect={(newDate) => onFilterChange({ pickup_time: newDate })}
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