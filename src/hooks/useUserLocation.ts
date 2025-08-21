// src/hooks/useUserLocation.ts
import { useState, useEffect } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

export function useUserLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const onError = (err: GeolocationPositionError) => {
      setError(`Failed to get location: ${err.message}`);
    };

    // Request the user's location
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []); // Empty dependency array ensures this runs only once

  return { location, error };
}
