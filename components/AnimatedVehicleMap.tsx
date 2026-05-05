"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map";
import { Play, Pause, RotateCcw, Navigation2 } from "lucide-react";

export const dhakWaypoints = [
  { lat: 23.7937, lng: 90.4066, time: "10:00 AM", locationName: "Banani" },
  { lat: 23.7949, lng: 90.4125, time: "10:05 AM", locationName: "Gulshan 2" },
  { lat: 23.8041, lng: 90.4152, time: "10:15 AM", locationName: "Baridhara" },
  { lat: 23.8151, lng: 90.4255, time: "10:30 AM", locationName: "Kuril Flyover" },
  { lat: 23.8223, lng: 90.4284, time: "10:45 AM", locationName: "Khilkhet" },
  { lat: 23.8433, lng: 90.4030, time: "11:00 AM", locationName: "Uttara Sector 4" },
];

export const TOTAL_STEPS = (dhakWaypoints.length - 1) * 100;

// Full route as [lng, lat] tuples for MapRoute
const routeCoordinates: [number, number][] = dhakWaypoints.map(
  (w) => [w.lng, w.lat]
);

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getPositionAtStep(step: number) {
  const segmentIdx = Math.min(Math.floor(step / 100), dhakWaypoints.length - 2);
  const t = (step % 100) / 100;
  const from = dhakWaypoints[segmentIdx];
  const to = dhakWaypoints[Math.min(segmentIdx + 1, dhakWaypoints.length - 1)];
  return {
    lat: lerp(from.lat, to.lat, t),
    lng: lerp(from.lng, to.lng, t),
    segmentIdx,
  };
}

function getRotation(step: number): number {
  const segmentIdx = Math.min(Math.floor(step / 100), dhakWaypoints.length - 2);
  const from = dhakWaypoints[segmentIdx];
  const to = dhakWaypoints[Math.min(segmentIdx + 1, dhakWaypoints.length - 1)];
  const dx = to.lng - from.lng;
  const dy = to.lat - from.lat;
  return (Math.atan2(dx, dy) * 180) / Math.PI;
}

function VehicleIcon({ rotation }: { rotation: number }) {
  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className="transition-transform duration-300"
    >
      <div className="relative">
        <div className="absolute -inset-3 rounded-full bg-blue-500/20 animate-ping" />
        <div className="absolute -inset-2 rounded-full bg-blue-500/30" />
        <div className="relative bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-white">
          <Navigation2 className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}

interface AnimatedVehicleMapProps {
  onStepChange?: (step: number) => void;
}

export default function AnimatedVehicleMap({ onStepChange }: AnimatedVehicleMapProps) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const position = getPositionAtStep(step);
  const rotation = getRotation(step);
  const isFinished = step >= TOTAL_STEPS;

  useEffect(() => {
    if (playing && !isFinished) {
      intervalRef.current = setInterval(() => {
        setStep((prev) => {
          const next = prev + 1;
          onStepChange?.(next);
          return next;
        });
      }, 30);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, isFinished, onStepChange]);

  const handleReset = () => {
    setPlaying(false);
    setStep(0);
    onStepChange?.(0);
  };

  return (
    <div className="relative w-full h-full">
      <Map center={[90.4152, 23.8041]} zoom={12.5}>
        <MapControls showZoom showFullscreen position="bottom-right" />

        {/* Full dashed route line */}
        <MapRoute
          coordinates={routeCoordinates}
          color="#3b82f6"
          width={3}
          opacity={0.5}
          dashArray={[2, 2]}
          interactive={false}
        />

        {/* Past waypoint dots */}
        {dhakWaypoints.slice(0, position.segmentIdx + 1).map((wp, i) => (
          <MapMarker key={`past-${i}`} longitude={wp.lng} latitude={wp.lat}>
            <MarkerContent>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400/70 border border-white shadow-sm" />
            </MarkerContent>
            <MarkerTooltip>{wp.locationName}</MarkerTooltip>
          </MapMarker>
        ))}

        {/* Destination */}
        <MapMarker
          longitude={dhakWaypoints[dhakWaypoints.length - 1].lng}
          latitude={dhakWaypoints[dhakWaypoints.length - 1].lat}
        >
          <MarkerContent>
            <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-md" />
          </MarkerContent>
          <MarkerTooltip>Destination: Uttara Sector 4</MarkerTooltip>
        </MapMarker>

        {/* Animated vehicle */}
        <MapMarker longitude={position.lng} latitude={position.lat}>
          <MarkerContent>
            <VehicleIcon rotation={rotation} />
          </MarkerContent>
          <MarkerTooltip>
            TRK-8924 •{" "}
            {dhakWaypoints[Math.min(position.segmentIdx, dhakWaypoints.length - 1)].time}
          </MarkerTooltip>
        </MapMarker>
      </Map>

      {/* Play / Pause / Reset overlay */}
      <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          disabled={isFinished}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium text-sm transition-all shadow-md shadow-blue-600/20"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {playing ? "Pause" : isFinished ? "Complete" : "Play"}
        </button>
        <button
          onClick={handleReset}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="ml-1 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-white">
            {Math.round((step / TOTAL_STEPS) * 100)}%
          </span>{" "}
          complete
        </div>
      </div>
    </div>
  );
}
