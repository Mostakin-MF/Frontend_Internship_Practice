import Image from "next/image";

export default function PlatformInfo() {
    return (
        <section className="w-full bg-[#E6E9E6] py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-16">

                {/* Left Content */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-6 max-w-md">
                        100% Self Owned Platform
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                        Bondstein is the only company in Bangladesh operating tracking
                        services with complete self owned platform.
                    </p>
                </div>

                {/* Right Image */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-xl">
                        <Image
                            src="/Dashboard 1.png"
                            alt="Platform Dashboard"
                            width={900}
                            height={600}
                            priority
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}