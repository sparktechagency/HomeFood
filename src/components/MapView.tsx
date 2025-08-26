// "use client";

// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { FoodItem } from '@/lib/types/api';
// import ProductCard from '@/components/core/prod-card';
// import { useGetAllFoodItemsQuery } from '@/redux/features/Seller/SellerApi';



// // --- 1. Define a new icon specifically for your location ---
// const myLocationIcon = new L.Icon({
//     iconUrl: '/image/location.png', // The path to your logo
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//     popupAnchor: [0, -40]
// });

// // Define the component's props
// interface MapViewProps {
//     foodItems: FoodItem[];
//     userLocation: { latitude: number; longitude: number } | null; // Accept the new prop
// }

// const MapView: React.FC<MapViewProps> = ({ foodItems, userLocation }) => {

// const { data: userData } = useGetAllFoodItemsQuery({})
// const userlattitude = userData?.data?.locations[0].latitude;
// const userlongitude = userData?.data?.locations[0].longitude;

//     const initialCenter: [number, number] = [userlattitude, userlongitude];
//     console.log('foodItems', foodItems);

//     return (
//         <MapContainer
//             center={initialCenter}
//             zoom={12}
//             scrollWheelZoom={true}
//             className="border-0 w-full h-[80dvh] rounded-lg"
//         >
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* --- 2. Add a special marker for your location --- */}
//             {userLocation && (
//                 <Marker
//                     position={[userLocation.latitude, userLocation.longitude]}
//                     icon={myLocationIcon}
//                     zIndexOffset={1000} // Ensure it appears on top of other markers
//                 >
//                     <Popup>You are here</Popup>
//                 </Marker>
//             )}

//             {/* The existing loop for food item markers remains the same */}
//             {foodItems.map((food: any) => {
//                 const lat = parseFloat(food.user?.latitude);
//                 const lng = parseFloat(food.user?.longitude);

//                 if (!isNaN(lat) && !isNaN(lng)) {
//                     const customMarkerIcon = new L.DivIcon({
//                         className: 'custom-marker-icon',
//                         html: `<img src="/image/location.png" class="marker-pin-image" alt="pinpoint" /><div class="marker-price-tag">$${+ food.price + "/-"}</div>`,
//                         iconSize: [50, 65],
//                         iconAnchor: [25, 50],
//                         popupAnchor: [0, -50]
//                     });



//                     return (
//                         <Marker key={food.id} position={[lat, lng]} icon={customMarkerIcon}>
//                             <Popup minWidth={300} className="!p-0">
//                                 <ProductCard item={food} control={false} />
//                             </Popup>
//                         </Marker>
//                     );
//                 }
//                 return null;
//             })}
//         </MapContainer>
//     );
// };

// export default MapView;





// "use client";

// import React from 'react';
// import dynamic from 'next/dynamic';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Import hooks and components needed for the page
// import { useGetAllFoodItemsQuery } from '@/redux/features/Seller/SellerApi';
// import ProductCard from '@/components/core/prod-card';
// import { Loader2 } from 'lucide-react';

// // --- Default Leaflet Icon Fix ---
// // This prevents icon issues that can occur in Next.js
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('/image/location.png'),
//     iconUrl: '/image/location.png',
//     shadowUrl: require('/image/location.png'),
// });


// // 1. We define the component that contains the actual map logic.
// //    This component will be loaded dynamically to ensure it only runs on the client.
// const MapDisplay = () => {
//     // Import react-leaflet components ONLY inside the client-side component
//     const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');

//     // Fetch data using the RTK Query hook
//     const { data: apiResponse, isLoading, isError } = useGetAllFoodItemsQuery({});

//     // --- Handle Loading State ---
//     if (isLoading) {
//         return (
//             <div className="flex h-[80dvh] w-full items-center justify-center rounded-lg bg-secondary">
//                 <Loader2 className="h-10 w-10 animate-spin" />
//                 <p className="ml-4">Loading Food Locations...</p>
//             </div>
//         );
//     }

//     // --- Handle Error State ---
//     if (isError || !apiResponse?.success) {
//         return (
//             <div className="flex h-[80dvh] w-full items-center justify-center rounded-lg bg-destructive/10 text-destructive">
//                 <p>Error: Could not load food locations.</p>
//             </div>
//         );
//     }

//     // Extract locations and the full list of food items from the API response
//     const locations = apiResponse.data?.locations || [];
//     const foodItems = apiResponse.data?.foods?.data || [];

//     // --- Handle No Locations Found ---
//     if (locations.length === 0) {
//         return (
//             <div className="flex h-[80dvh] w-full items-center justify-center rounded-lg bg-secondary">
//                 <p>No food items with locations were found.</p>
//             </div>
//         )
//     }

//     // Determine the map's center from the first location in the API data
//     const firstLocation = locations[0];
//     const mapCenter: [number, number] = [
//         parseFloat(firstLocation.latitude),
//         parseFloat(firstLocation.longitude)
//     ];

//     return (
//         <MapContainer
//             center={mapCenter}
//             zoom={13}
//             scrollWheelZoom={true}
//             className="border-0 w-full h-[80dvh] rounded-lg"
//         >
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//             {/* Loop over the `locations` array to create a marker for each food item */}
//             {locations.map((location) => {
//                 const lat = parseFloat(location.latitude);
//                 const lng = parseFloat(location.longitude);

//                 // Find the full food item details using the food_id from the location
//                 const foodDetails = foodItems.find(food => food.id === location.food_id);

//                 // Skip rendering if coordinates are invalid or details are missing
//                 if (isNaN(lat) || isNaN(lng) || !foodDetails) {
//                     return null;
//                 }

//                 return (
//                     <Marker key={location.food_id} position={[lat, lng]}>
//                         <Popup minWidth={300}>
//                             <ProductCard item={foodDetails} control={false} />
//                         </Popup>
//                     </Marker>
//                 );
//             })}
//         </MapContainer>
//     );
// };


// // 2. The main page component that will be exported.
// //    It uses next/dynamic to load our MapDisplay component without server-side rendering.
// export default function MapPage() {

//     // Use a Promise to resolve the component for dynamic import
//     const Map = React.useMemo(() => dynamic(
//         () => Promise.resolve(MapDisplay),
//         {
//             ssr: false,
//             loading: () => (
//                 <div className="flex h-[80dvh] w-full items-center justify-center rounded-lg bg-secondary">
//                     <Loader2 className="h-10 w-10 animate-spin" />
//                     <p className="ml-4">Loading Map...</p>
//                 </div>
//             )
//         }
//     ), []);

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4">Nearby Food Map</h1>
//             <Map />
//         </div>
//     );
// }


"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import hooks and components needed for the page
import { useGetAllFoodItemsQuery } from '@/redux/features/Seller/SellerApi';
import ProductCard from '@/components/core/prod-card';
import { Loader2 } from 'lucide-react';

// --- Default Leaflet Icon Fix ---
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('../../public/image/location.png'),
    iconUrl: require('../../public/image/location.png'),
    shadowUrl: require('../../public/image/location.png'),
});

const MapDisplay = () => {
    const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
    const { data: apiResponse, isLoading } = useGetAllFoodItemsQuery({});
    console.log('apiResponse', apiResponse);

    if (isLoading) {
        return (
            <div className="flex h-[80dvh] w-full items-center justify-center rounded-lg bg-secondary">
                <Loader2 className="h-10 w-10 animate-spin" />
                <p className="ml-4">Loading Food Locations...</p>
            </div>
        );
    }



    const locations = apiResponse.data?.locations || [];
    const foodItems = apiResponse.data?.foods?.data || [];

    if (locations.length === 0) {
        return (
            <div className="flex h-[80dvh] w-full items-center justify-center rounded-lg bg-secondary">
                <p>No food items with locations were found.</p>
            </div>
        )
    }

    const firstLocation = locations[0];
    const mapCenter: [number, number] = [
        parseFloat(firstLocation.latitude),
        parseFloat(firstLocation.longitude)
    ];

    return (
        <MapContainer
            center={mapCenter}
            zoom={3}
            scrollWheelZoom={true}
            className="border-0 w-full h-[80dvh] rounded-lg"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((location: any) => {
                const lat = parseFloat(location.latitude);
                const lng = parseFloat(location.longitude);
                const foodDetails = foodItems.find((food: any) => food.id === location.food_id);

                if (isNaN(lat) || isNaN(lng) || !foodDetails) {
                    return null;
                }

                const customIcon = new L.DivIcon({
                    className: 'custom-pin-icon',
                    html: `
                        <img src="/image/location.png" class="marker-pin-image" alt="pinpoint" />
                        <div class="marker-price-tag">$${location.price}</div>
                    `,
                    iconSize: [50, 65],
                    iconAnchor: [25, 65],
                    popupAnchor: [0, -65]
                });

                return (
                    <Marker key={location.food_id} position={[lat, lng]} icon={customIcon}>
                        <Popup minWidth={300}>
                            <ProductCard item={foodDetails} control={false} />
                        </Popup>
                    </Marker>
                );

            })}
        </MapContainer>
    );
};

export default function MapPage() {
    const Map = React.useMemo(() => dynamic(
        () => Promise.resolve(MapDisplay),
        {
            ssr: false,
            loading: () => (
                <div className="flex h-[80dvh] w-full items-center justify-center rounded-lg bg-secondary">
                    <Loader2 className="h-10 w-10 animate-spin" />
                    <p className="ml-4">Loading Map...</p>
                </div>
            )
        }
    ), []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Nearby Food Map</h1>
            <Map />
        </div>
    );
}