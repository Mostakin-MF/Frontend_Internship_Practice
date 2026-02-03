"use client";

import Image from "next/image"

export default function RightSide() {
    return (
        <div className="flex flex-col h-full w-full bg-gradient-to-b from-[#FCDD3E] to-white rounded-[24px] pt-8 px-8 overflow-hidden relative">
            {/* Gradient Overlay for bottom effect */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
            <header>
                <h2 className="text-[28px] font-bold text-[#111111] mt-6 mb-3 tracking-normal leading-tight">
                    The simplest way to manage<br /> your workforce.
                </h2>
                <p className="text-base text-[#111111]">
                    Enter your credentials to access your account.
                </p>
            </header>

            <div className="relative flex-1 mt-10 w-full">
                <Image
                    src="/right_Frame.png"
                    alt="Workspace Illustration"
                    fill
                    priority
                    className="object-contain object-bottom"
                />
            </div>
        </div>
    )
}