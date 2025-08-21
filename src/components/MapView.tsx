"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FoodItem } from '@/lib/types/api';
import ProductCard from '@/components/core/prod-card';

// --- 1. Define a new icon specifically for your location ---
const myLocationIcon = new L.Icon({
    iconUrl: '/image/location.png', // The path to your logo
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

// Define the component's props
interface MapViewProps {
    foodItems: FoodItem[];
    userLocation: { latitude: number; longitude: number } | null; // Accept the new prop
}

const MapView: React.FC<MapViewProps> = ({ foodItems, userLocation }) => {
    const initialCenter: [number, number] = [23.8103, 90.4125];

    return (
        <MapContainer
            center={initialCenter}
            zoom={12}
            scrollWheelZoom={true}
            className="border-0 w-full h-[80dvh] rounded-lg"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* --- 2. Add a special marker for your location --- */}
            {userLocation && (
                <Marker
                    position={[userLocation.latitude, userLocation.longitude]}
                    icon={myLocationIcon}
                    zIndexOffset={1000} // Ensure it appears on top of other markers
                >
                    <Popup>You are here</Popup>
                </Marker>
            )}

            {/* The existing loop for food item markers remains the same */}
            {foodItems.map((food: any) => {
                const lat = parseFloat(food.user?.latitude);
                const lng = parseFloat(food.user?.longitude);

                if (!isNaN(lat) && !isNaN(lng)) {
                    const customMarkerIcon = new L.DivIcon({
                        className: 'custom-marker-icon',
                        html: `<img src="/image/location.png" class="marker-pin-image" alt="pinpoint" /><div class="marker-price-tag">$${+ food.price + "/-"}</div>`,
                        iconSize: [50, 65],
                        iconAnchor: [25, 50],
                        popupAnchor: [0, -50]
                    });

                    let firstImage = '';
                    try {
                        const imagesArray = JSON.parse(food.images as string);
                        if (Array.isArray(imagesArray) && imagesArray.length > 0) {
                            firstImage = imagesArray[0];
                        }
                    } catch (e) { }

                    const cardItem = { ...food, images: firstImage };

                    return (
                        <Marker key={food.id} position={[lat, lng]} icon={customMarkerIcon}>
                            <Popup minWidth={300} className="!p-0">
                                <ProductCard item={cardItem} control={false} />
                            </Popup>
                        </Marker>
                    );
                }
                return null;
            })}
        </MapContainer>
    );
};

export default MapView;