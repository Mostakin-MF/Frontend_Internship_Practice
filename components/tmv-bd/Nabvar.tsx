import Link from "next/link";

export default function Navbar() {

  return (
    <>
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          MyCompany
        </div>

        <div className="hidden md:block">
          <ul className="flex gap-5 text-xl font-semibold">
            <li>Home</li>
            <li>About</li>
            <li>Contact Me</li>
          </ul>
        </div>

        {/* Right Button */}
        <Link href="#">
          <button className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-medium hover:bg-yellow-300 transition">
            Get Started
          </button>
        </Link>
      </nav>
    </>
  );
}