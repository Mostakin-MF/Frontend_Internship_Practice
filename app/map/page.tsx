"use client";

import React, { useState } from "react";
import {
  Activity,
  Battery,
  Clock,
  MapPin,
  Navigation,
  ShieldCheck,
  Signal,
  Truck,
} from "lucide-react";
import dynamic from "next/dynamic";
import { dhakWaypoints, TOTAL_STEPS } from "@/components/AnimatedVehicleMap";

// Dynamically import both map components (client-only, no SSR)
const AnimatedVehicleMap = dynamic(
  () => import("@/components/AnimatedVehicleMap"),
  { ssr: false }
);

const NycLandmarkMap = dynamic(
  () => import("@/components/NycLandmarkMap"),
  { ssr: false }
);

function getStepInfo(step: number) {
  const segmentIdx = Math.min(Math.floor(step / 100), dhakWaypoints.length - 2);
  const pct = Math.round((step / TOTAL_STEPS) * 100);
  return {
    current: dhakWaypoints[Math.min(segmentIdx, dhakWaypoints.length - 1)],
    pct,
    segmentIdx,
  };
}

const statCards = [
  {
    icon: Navigation,
    color: "blue",
    label: "Total Distance Today",
    value: "14.2 mi",
    badge: "+2.4 mi",
  },
  {
    icon: Clock,
    color: "indigo",
    label: "Time in Transit",
    value: "1h 45m",
    badge: null,
  },
  {
    icon: Activity,
    color: "purple",
    label: "Average Speed",
    value: "24 mph",
    badge: null,
  },
  {
    icon: ShieldCheck,
    color: "orange",
    label: "Device Security",
    value: "Secured",
    badge: null,
  },
];

export default function MapPage() {
  const [step, setStep] = useState(0);
  const info = getStepInfo(step);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 pb-12">
      {/* Gradient header background */}
      <div className="h-52 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 absolute top-0 left-0 z-0" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-12 space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-800/50">
          <div>
            <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold tracking-wide text-sm uppercase">Live Fleet Tracking</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Fleet Vehicle #TRK-8924
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg">
              Monitor device locations in real-time, trace routes, and analyze travel history.
              Includes live telemetry data and animated route replay.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 px-4 py-2 rounded-xl flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Online</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-2 rounded-xl flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Battery className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">84%</span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-2 rounded-xl flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Signal className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">4G LTE</span>
            </div>
          </div>
        </div>

        {/* ── KPI Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => (
            <div
              key={card.label}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-${card.color}-50 dark:bg-${card.color}-900/20 text-${card.color}-600 dark:text-${card.color}-400`}>
                  <card.icon className="w-5 h-5" />
                </div>
                {card.badge && (
                  <div className="text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">
                    {card.badge}
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{card.label}</p>
              <div className={`text-2xl font-bold ${i === 3 ? "text-emerald-600 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Dhaka Fleet Map + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
            <AnimatedVehicleMap onStepChange={setStep} />
          </div>

          {/* Sidebar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex flex-col h-[600px]">
            {/* Vehicle info */}
            <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">TRK-8924</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Fleet Vehicle</p>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Current</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{info.current.locationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Progress</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{info.pct}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${info.pct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Trace log */}
            <h3 className="font-bold text-base mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Trace Log
            </h3>
            <div className="space-y-5 overflow-y-auto pr-2 grow">
              {dhakWaypoints.map((wp, i) => {
                const isPast = i <= info.segmentIdx;
                const isCurrent = i === info.segmentIdx;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center mt-1">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm transition-all ${
                          isCurrent
                            ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                            : isPast
                              ? "bg-blue-300 dark:bg-blue-700"
                              : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                      {i < dhakWaypoints.length - 1 && (
                        <div
                          className={`w-[2px] h-12 mt-0.5 ${
                            isPast
                              ? "bg-gradient-to-b from-blue-400 to-blue-200 dark:from-blue-600 dark:to-blue-900"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <p
                        className={`font-semibold text-sm ${
                          isCurrent
                            ? "text-blue-600 dark:text-blue-400"
                            : isPast
                              ? "text-gray-700 dark:text-gray-300"
                              : "text-gray-400 dark:text-gray-600"
                        }`}
                      >
                        {wp.locationName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {wp.time} • {isCurrent ? "Current" : isPast ? "Passed" : "Upcoming"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── NYC Landmark Explorer (from original map page) ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-5 border-b border-gray-100 dark:border-gray-800">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-indigo-500" />
              NYC Landmark Explorer
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Click markers to explore New York City landmarks
            </p>
          </div>
          <NycLandmarkMap />
        </div>

      </div>
    </div>
  );
}