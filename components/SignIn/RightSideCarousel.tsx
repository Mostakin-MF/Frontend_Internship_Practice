"use client";

import Image from "next/image";

const images = [
    { src: "/Frame 2147224366.png", alt: "Right Dashboard" },
    { src: "/Frame 2147224364.png", alt: "Middle Dashboard" },
    { src: "/Frame 2147224365.png", alt: "Left Dashboard" },
];

export default function RightSideCarousel() {
    return (
        <div className="flex flex-col h-full w-full bg-gradient-to-b from-[#FCDD3E] to-white rounded-[24px] pt-8 px-8 overflow-hidden relative">
            {/* Gradient Overlay for bottom effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/50 to-transparent pointer-events-none z-10" />

            <header className="z-20 relative">
                <h2 className="text-[28px] font-bold text-[#111111] mt-6 mb-3 tracking-normal leading-tight">
                    The Simplest way to manage<br /> your workforce.
                </h2>
                <p className="text-base text-[#111111]">
                    Enter your credentials to access your account.
                </p>
            </header>

            {/* Static Image Container */}
            <div className="relative flex-1 mt-10 w-full flex items-center justify-center z-10">
                <div className="flex gap-6">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="relative w-[280px] h-[360px] md:w-[320px] md:h-[400px] shrink-0 rounded-xl overflow-hidden shadow-lg bg-white"
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-contain" // Changed to contain to show full UI card
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
