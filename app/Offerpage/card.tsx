function Card({ title, value }: { title: string; value: number }) {
    // PAD with leading zero
    const formattedValue = value < 10 ? `0${value}` : `${value}`;

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-[#a1a1aa] text-[10px] uppercase tracking-wider mb-1.5 font-medium font-titillium">{title}</h3>
            <div className="bg-[#1e1e1e] rounded-lg border border-[#333333] shadow-lg w-16 h-16 md:w-20 md:h-20 flex justify-center items-center backdrop-blur-sm bg-opacity-80">
                <p className="text-[#ff9f1c] text-3xl md:text-4xl font-bold font-titillium tracking-wide drop-shadow-md">
                    {formattedValue}
                </p>
            </div>
        </div>
    );
}

function CountDownTile() {
    return (
        <div className="relative group cursor-pointer w-[150px] h-[32px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F36B24] to-[#FDD10E] rounded-[100px] opacity-75"></div>
            <div className="relative w-full h-full bg-[#0a0a0a] rounded-[100px] border border-[#F36B24]/30 flex items-center justify-center">
                <span className="bg-gradient-to-r from-[#F36B24] to-[#FDD10E] bg-clip-text text-transparent font-titillium font-semibold text-[18px] leading-none tracking-tight text-center" style={{ letterSpacing: '-0.02em' }}>
                    Current Offers
                </span>
            </div>
        </div>
    );
}

function OfferTicketPlaceholder() {
    return (
        <div className="w-64 h-36">

        </div>
    );
}

export { Card, CountDownTile, OfferTicketPlaceholder };

