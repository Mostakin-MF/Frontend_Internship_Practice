import { Plus } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Product({}) {
    return (
        <div className="flex flex-col w-84 bg-[#F6F5EE] rounded-2xl overflow-hidden shadow-sm font-sans">
            <div className="relative w-full h-51.75 bg-[#F6F5EE] flex items-center justify-center pt-8">
                <Image
                    src="/ppp.png"
                    alt="Product"
                    width={336}
                    height={207}
                    className="object-contain"
                />
            </div>

            <div className="flex flex-col px-6 pt-4 pb-6 gap-6">
                {/* Product Info */}
                <div className="space-y-1">
                    <h3 className="text-xl text-black font-semibold font-inter">VTS Regular</h3>
                    <p className="text-sm text-muted-foreground font-lato leading-relaxed">
                        Live GPS tracking with voice, smart alerts, and a 1-year warranty.
                    </p>
                </div>

                {/* Pricing Options */}
                <div className="flex items-center gap-2">
                    <div className="flex flex-col h-12 w-16 justify-center text-sm font-medium">
                        <span className="text-secondary text-sm">Device</span>
                        <span className="text-black font-medium text-[10px]">5,000 BDT</span>
                    </div>

                    <div className="flex items-center justify-center w-8 h-8 px-1">
                        <Plus className="w-5 h-5 text-gray-400" />
                    </div>

                    <ProductCardButton
                        className="h-12 w-24 text-xs font-medium border-primary bg-primary shadow-sm"
                        isActive={false}
                    >
                        <span className="text-black font-bold text-sm">6 Months</span>
                        <span className="text-black font-medium text-[10px]">+2,500 BDT</span>
                    </ProductCardButton>

                    <ProductCardButton className="h-12 w-24 text-xs font-medium bg-white" isActive={false}>
                        <span className="text-black font-bold text-sm">12 Months</span>
                        <span className="text-gray-400 font-medium text-[10px]">+5,000 BDT</span>
                    </ProductCardButton>
                </div>

                <div className="w-full h-px bg-gray-200" />

                <div className="flex flex-col items-center gap-4">
                    <div className="text-center space-y-0.5">
                        <h2 className="text-2xl font-bold text-secondary font-titillium">Total 7,000 BDT</h2>
                        <p className="text-sm font-medium text-[#EC7B35] font-lato">+ 6 Month Subscription</p>
                    </div>

                    <button
                        type="button"
                        className="w-full h-12 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg shadow-black/5 active:scale-95"
                    >
                        Purchase
                    </button>
                </div>
            </div>
        </div>
    )
}

function ProductCardButton({
    className,
    children,
    isActive = false
}: {
    className?: string,
    children: React.ReactNode,
    isActive?: boolean
}) {
    return (
        <button
            type="button"
            className={cn(
                "flex flex-col items-center justify-center rounded-lg border transition-all active:scale-95",
                isActive
                    ? "bg-primary border-primary text-black"
                    : "bg-white border-gray-100 text-gray-500 hover:border-gray-200 hover:shadow-sm",
                className
            )}
        >
            {children}
        </button>
    )
}
