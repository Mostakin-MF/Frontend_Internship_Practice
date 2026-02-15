import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      
      {/* Hero Section */}
      <section className="bg-gray-100 min-h-screen/60 flex items-center dark:bg-slate-600 dark:text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 dark:text-white">
              Build Your Business Faster
            </h1>
            <p className="text-gray-600 text-lg mb-8 dark:text-white">
              We provide modern solutions to help your company grow with
              powerful tools, clean design, and scalable technology.
            </p>

            {/* CTA Button */}
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
              Explore Services
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/heto_right_image.png"
              alt="Hero Image"
              width={560}
              height={780}
              className="w-full h-auto max-w-md md:max-w-full"
              priority
            />
          </div>

        </div>
      </section>
    </header>
  );
}
