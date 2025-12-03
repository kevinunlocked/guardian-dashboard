"use client";

import Map, { Marker } from "react-map-gl";

export default function MapBox({ sites }) {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        latitude: sites?.[0]?.lat || 0,
        longitude: sites?.[0]?.lng || 0,
        zoom: 8,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      style={{ width: "100%", height: "100%" }}
    >
      {sites?.map((s, i) => (
        <Marker key={i} latitude={s.lat} longitude={s.lng}>
          <div className="w-3 h-3 bg-teal-400 rounded-full shadow-lg border border-white"></div>
        </Marker>
      ))}
    </Map>
  );
}
