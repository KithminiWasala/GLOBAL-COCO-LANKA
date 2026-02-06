import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationMapProps {
    latitude: number;
    longitude: number;
    businessName: string;
}

export default function LocationMap({ latitude, longitude, businessName }: LocationMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Initialize map
        const map = L.map(mapRef.current, {
            center: [latitude, longitude],
            zoom: 17,
            zoomControl: true,
            scrollWheelZoom: false,
        });

        mapInstanceRef.current = map;

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        }).addTo(map);

        // Add custom marker
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
        <div style="position: relative;">
          <div style="
            width: 40px;
            height: 40px;
            background: #16a34a;
            border: 4px solid white;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          "></div>
          <div style="
            position: absolute;
            top: 8px;
            left: 8px;
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
        });

        L.marker([latitude, longitude], { icon: customIcon })
            .addTo(map)
            .bindPopup(`<strong>${businessName}</strong>`)
            .openPopup();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [latitude, longitude, businessName]);

    return (
        <div
            ref={mapRef}
            className="w-full h-full rounded-2xl overflow-hidden"
            style={{ minHeight: '450px' }}
        />
    );
}
