import { Card, CountDownTile, OfferTicketPlaceholder } from "./card";

export default function Offerpage() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-black relative overflow-hidden pt-15">

            {/* 1. Badge Section */}
            <div className="mb-5">
                <CountDownTile />
            </div>

            {/* 2. Countdown Timer Section */}
            <div className="flex gap-4 mb-8">
                <Card title="Days" value={1} />
                <Card title="Hours" value={21} />
                <Card title="Minutes" value={52} />
                <Card title="Seconds" value={20} />
            </div>

            {/* 3. Headline Text Section */}
            <div className="w-full max-w-[760px] flex items-center justify-center text-center mb-16 px-4">
                <h1 className="text-white font-lato font-semibold text-[32px] md:text-[42px] leading-tight md:leading-[54px] tracking-tight md:tracking-[-0.02em] text-center">
                    Discover the best GPS tracking offer <br className="hidden md:block" />
                    in Bangladesh
                </h1>
            </div>

            {/* 5. Bottom Offer Section (Placeholders) */}
            <div className="w-full max-w-7xl relative z-10 flex flex-col items-center pb-8">
                <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full px-4 overflow-x-auto no-scrollbar pb-4">
                    <OfferTicketPlaceholder />
                    <OfferTicketPlaceholder />
                    <OfferTicketPlaceholder />
                    <OfferTicketPlaceholder />
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                    <button className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-white/10 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-[#FFC107] flex items-center justify-center text-black hover:bg-[#FFD54F] transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

