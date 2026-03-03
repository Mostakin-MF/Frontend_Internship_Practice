"use client";

import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

// Dummy data for a device location trace
const dummyTraceData = [
    { lat: 23.7937, lng: 90.4066, time: "10:00 AM", locationName: "Banani" },
    { lat: 23.7949, lng: 90.4125, time: "10:05 AM", locationName: "Gulshan 2" },
    { lat: 23.8041, lng: 90.4152, time: "10:15 AM", locationName: "Baridhara" },
    { lat: 23.8151, lng: 90.4255, time: "10:30 AM", locationName: "Kuril" },
    { lat: 23.8223, lng: 90.4284, time: "10:45 AM", locationName: "Khilkhet" },
    { lat: 23.8433, lng: 90.4030, time: "11:00 AM", locationName: "Uttara" },
];

export default function GoogleMapComponent() {
    const [currentLocationIndex, setCurrentLocationIndex] = useState(dummyTraceData.length - 1);
    const currentPos = dummyTraceData[currentLocationIndex];

    // Provide your Google Maps API key via env (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

    return (
        <div className="w-full h-full min-h-[500px] bg-gray-100 dark:bg-gray-800/50 rounded-xl overflow-hidden relative group">
            {!apiKey && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-amber-500/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur-sm pointer-events-none">
                    Warning: Missing Google Maps API Key
                </div>
            )}

            {apiKey ? (
                <APIProvider apiKey={apiKey}>
                    <Map
                        defaultZoom={13}
                        defaultCenter={{ lat: currentPos.lat, lng: currentPos.lng }}
                        center={{ lat: currentPos.lat, lng: currentPos.lng }}
                        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEVICE_TRACING_MAP_ID"}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    >
                        {dummyTraceData.map((pos, index) => (
                            <AdvancedMarker key={index} position={{ lat: pos.lat, lng: pos.lng }}>
                                {index === currentLocationIndex ? (
                                    <div className="bg-blue-600 rounded-full w-6 h-6 border-4 border-white shadow-[0_0_15px_rgba(37,99,235,0.5)] animate-pulse" title={`Current Location: ${pos.locationName}`} />
                                ) : index < currentLocationIndex ? (
                                    <div className="bg-gray-500 rounded-full w-3 h-3 border-2 border-white shadow-sm" title={`Past Location: ${pos.time} - ${pos.locationName}`} />
                                ) : null}
                            </AdvancedMarker>
                        ))}
                    </Map>
                </APIProvider>
            ) : (
                <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-gray-200 dark:bg-gray-800">
                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto animate-pulse flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 dark:text-gray-400">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                        </div>
                        <h3 className="text-gray-600 dark:text-gray-300 font-medium">Map Preview Not Available</h3>
                        <p className="text-gray-400 dark:text-gray-500 text-sm max-w-[250px]">Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env to enable the map.</p>
                    </div>
                </div>
            )}

            {/* Overlay to show device info */}
            <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-black/95 p-4 rounded-xl shadow-2xl backdrop-blur-md border border-gray-100 dark:border-gray-800 z-10 min-w-[260px] transition-all hover:scale-[1.02]">
                <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">Live Tracker View</h3>
                <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Device Active</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Location</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{currentPos.locationName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Time: {currentPos.time}</p>
                </div>

                <div className="flex gap-2 text-sm">
                    <button
                        onClick={() => setCurrentLocationIndex(Math.max(0, currentLocationIndex - 1))}
                        disabled={currentLocationIndex === 0}
                        className="flex-1 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg disabled:opacity-40 transition-all font-medium"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentLocationIndex(Math.min(dummyTraceData.length - 1, currentLocationIndex + 1))}
                        disabled={currentLocationIndex === dummyTraceData.length - 1}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-40 transition-all font-medium shadow-md shadow-blue-600/20"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
