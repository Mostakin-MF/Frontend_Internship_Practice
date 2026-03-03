import React from 'react';
import GoogleMapComponent from '@/components/GoogleMapComponent';
import { MapPin, Activity, Navigation, ShieldCheck, Battery, Signal, Clock } from 'lucide-react';

export const metadata = {
    title: 'Device Location Tracing | Portal',
};

export default function MapPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 pb-12">
            {/* Gradient Header Pattern */}
            <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-indigo-700 absolute top-0 left-0 z-0"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-12 space-y-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-800/50">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                            <MapPin className="w-5 h-5" />
                            <span className="font-semibold tracking-wide text-sm uppercase">Live Tracking Module</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Fleet Vehicle #TRK-8924
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-lg">
                            Monitor device locations in real-time, trace routes, and analyze travel history. Includes live telemetry data.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 px-4 py-2 rounded-xl flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
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

                {/* Stats Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                                <Navigation className="w-5 h-5" />
                            </div>
                            <div className="text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">+2.4 mi</div>
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Distance Today</p>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">14.2 mi</div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Time in Transit</p>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">1h 45m</div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                                <Activity className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Average Speed</p>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1">
                            24 <span className="text-sm font-medium text-gray-500">mph</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Device Security</p>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white text-emerald-600 dark:text-emerald-400">Secured</div>
                    </div>
                </div>

                {/* Map Container */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 h-[600px] w-full bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
                        <div className="grow">
                            <GoogleMapComponent />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 flex flex-col h-[600px]">
                        <h3 className="font-bold text-lg mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-blue-500" />
                            Trace Log
                        </h3>

                        <div className="space-y-6 overflow-y-auto pr-2 grow custom-scrollbar">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center mt-1">
                                    <div className="w-3.5 h-3.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                                    <div className="w-[2px] h-14 bg-gradient-to-b from-blue-400 to-gray-200 dark:from-blue-600 dark:to-gray-700"></div>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Uttara Sector 4</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">11:00 AM • Current</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col items-center mt-1">
                                    <div className="w-3.5 h-3.5 bg-gray-300 dark:bg-gray-600 rounded-full border border-white dark:border-gray-800"></div>
                                    <div className="w-[2px] h-14 bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">Khilkhet Area</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">10:45 AM • In transit</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col items-center mt-1">
                                    <div className="w-3.5 h-3.5 bg-gray-300 dark:bg-gray-600 rounded-full border border-white dark:border-gray-800"></div>
                                    <div className="w-[2px] h-14 bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">Kuril Flyover</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">10:30 AM • In transit</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col items-center mt-1">
                                    <div className="w-3.5 h-3.5 bg-gray-300 dark:bg-gray-600 rounded-full border border-white dark:border-gray-800"></div>
                                    <div className="w-[2px] h-14 bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">Baridhara</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">10:15 AM • Stopped 5m</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col items-center mt-1">
                                    <div className="w-3.5 h-3.5 bg-gray-300 dark:bg-gray-600 rounded-full border border-white dark:border-gray-800"></div>
                                    <div className="w-[2px] h-14 bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">Gulshan 2</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">10:05 AM • In transit</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex flex-col items-center mt-1">
                                    <div className="w-3.5 h-3.5 bg-gray-300 dark:bg-gray-600 rounded-full border border-white dark:border-gray-800"></div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-700 dark:text-gray-300">Banani</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">10:00 AM • Journey started</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}