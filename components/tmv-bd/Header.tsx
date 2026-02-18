import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm">

      {/* Hero Section */}
      <section className="bg-gray-100 min-h-screen flex items-center dark:bg-slate-600 dark:text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">

            {/* Badge */}
            <div className="mb-10">
              <Image
                src="/brandchoice.png"
                alt="Preferred Choice of #1 Brands"
                width={160}
                height={160}
                className="w-30 h-30 lg:w-40 lg:h-40 h-auto"
              />
            </div>

            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-[#0F172A] mb-10">
              Track your vehicle. <br />
              Anytime. Anywhere.
            </h1>

            {/* CTA */}
            <button className="bg-[#FFCC00] text-black px-10 py-4 rounded-xl font-semibold text-lg hover:bg-[#e6b800] transition duration-300 shadow-lg">
              Buy Now
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/heto_right_image.png"
              alt="Hero Image"
              width={560}
              height={780}
              className="w-full h-auto max-w-md md:max-w-full lg:translate-x-60 lg:translate-y-20"
              priority
            />
          </div>

        </div>
      </section>
    </header>
  );
}
