import Product from "./Product";

export default function ProductSection() {
    return (
        <section className="w-full py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 font-titillium">
                        Find the right solution
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 font-lato">
                        Explore products designed to power your fleet's success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
                    <Product />
                    <Product />
                    <Product />
                    <Product />
                </div>
            </div>
        </section>
    );
}