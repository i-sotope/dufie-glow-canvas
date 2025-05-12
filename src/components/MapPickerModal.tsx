import React, { useState, useEffect, useCallback } from 'react';
// Removed Leaflet imports
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// Removed Leaflet CSS import
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react"; // For loading state

// Interface for Google Maps LatLngLiteral
interface LatLngLiteral {
    lat: number;
    lng: number;
}

// Removed Leaflet Icon Fix

interface MapPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (latlng: LatLngLiteral) => void;
  initialPosition?: LatLngLiteral;
}

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = ['places']; // Add libraries if needed

const MapPickerModal: React.FC<MapPickerProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
  initialPosition = { lat: 5.6037, lng: -0.1870 } // Default to Accra, Ghana
}) => {
  // Google Maps API loading state
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // Ensure your API key is in .env
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState<LatLngLiteral | null>(initialPosition);
  const [mapCenter, setMapCenter] = useState<LatLngLiteral>(initialPosition);
  const defaultZoom = 13;

  // Reset marker and center when modal opens or initialPosition changes
  useEffect(() => {
    if (isOpen) {
        setMarkerPosition(initialPosition);
        setMapCenter(initialPosition);
    }
  }, [initialPosition, isOpen]);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(newPosition);
      // Optionally pan the map to the new marker
      // mapRef.current?.panTo(newPosition);
    }
  }, []);

  const handleSelect = () => {
    if (markerPosition) {
      onLocationSelect(markerPosition);
      onClose(); // Close modal after selection
    } else {
      console.warn("No valid marker position to select");
    }
  };

  // Store map instance if needed for more complex interactions
  // const mapRef = useRef<google.maps.Map | null>(null);
  // const onMapLoad = useCallback((map: google.maps.Map) => {
  //   mapRef.current = map;
  // }, []);

  if (!isOpen) return null;

  const renderMap = () => {
    if (loadError) return <div>Error loading maps. Please check your API key and network connection.</div>;
    if (!isLoaded) return <div className="flex items-center justify-center h-[400px]"><Loader2 className="h-8 w-8 animate-spin" /> Loading Map...</div>;

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={defaultZoom}
        onClick={handleMapClick}
        options={{
            streetViewControl: false, // Optional: disable street view
            mapTypeControl: false, // Optional: disable map type control
            fullscreenControl: false, // Optional: disable fullscreen
        }}
        // onLoad={onMapLoad} // Uncomment if mapRef is needed
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            // Optional: Add InfoWindow or other interactions
            // onClick={() => console.log("Marker clicked!")}
          />
        )}
      </GoogleMap>
    );
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Select Delivery Location</DialogTitle>
        </DialogHeader>
        {/* Replace Leaflet Container with Google Maps */}
        <div className="h-[400px] w-full">
          {renderMap()}
        </div>
        <DialogFooter className="p-6 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={handleSelect} disabled={!markerPosition || !isLoaded}>
            Select Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MapPickerModal; 