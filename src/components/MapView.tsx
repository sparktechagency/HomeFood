

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