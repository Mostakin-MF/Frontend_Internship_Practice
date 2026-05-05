"use client";

import React from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
} from "@/components/ui/map";

const nycLocations = [
  { id: 1, name: "Empire State Building", lng: -73.9857, lat: 40.7484, emoji: "🏙️" },
  { id: 2, name: "Central Park",          lng: -73.9654, lat: 40.7829, emoji: "🌳" },
  { id: 3, name: "Times Square",          lng: -73.9855, lat: 40.7580, emoji: "✨" },
  { id: 4, name: "Brooklyn Bridge",       lng: -73.9969, lat: 40.7061, emoji: "🌉" },
  { id: 5, name: "Statue of Liberty",     lng: -74.0445, lat: 40.6892, emoji: "🗽" },
];

export default function NycLandmarkMap() {
  return (
    <div className="h-[420px] w-full">
      <Map center={[-74.006, 40.7128]} zoom={11}>
        <MapControls showZoom showFullscreen position="bottom-right" />
        {nycLocations.map((loc) => (
          <MapMarker key={loc.id} longitude={loc.lng} latitude={loc.lat}>
            <MarkerContent>
              <div className="size-8 rounded-full bg-indigo-600 border-2 border-white shadow-lg flex items-center justify-center text-sm">
                {loc.emoji}
              </div>
            </MarkerContent>
            <MarkerTooltip>{loc.name}</MarkerTooltip>
            <MarkerPopup closeButton>
              <div className="space-y-1 min-w-[140px]">
                <p className="font-semibold text-foreground">{loc.emoji} {loc.name}</p>
                <p className="text-xs text-muted-foreground">
                  {loc.lat.toFixed(4)}°N, {Math.abs(loc.lng).toFixed(4)}°W
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
