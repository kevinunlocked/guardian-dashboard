"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapBox({ sites = [], risks = [] }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [31.0456, -17.8252],
      zoom: 11,
    });

    sites.forEach((site) => {
      new mapboxgl.Marker({ color: "#06b6d4" })
        .setLngLat([site.lng, site.lat])
        .addTo(map);
    });

    return () => map.remove();
  }, [sites]);

  return <div ref={ref} className="w-full h-full" />;
}
