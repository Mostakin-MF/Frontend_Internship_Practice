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
                {/* Staggered delays for the "start from different corner" effect */}
                <Card title="Days" value={1} delay="0s" />
                <Card title="Hours" value={21} delay="-0.75s" />
                <Card title="Minutes" value={52} delay="-1.5s" />
                <Card title="Seconds" value={20} delay="-2.25s" />
            </div>

            {/* 3. Headline Text Section */}
            <div className="w-full flex items-center justify-center text-center">
                <h1 className="text-white font-lato font-semibold text-[54px] md:text-[42px] leading-tight md:leading-[54px] tracking-tight md:tracking-[-0.02em] text-center" style={{ letterSpacing: '-0.02em' }}>
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
            </div>


        </div>
    );
}

