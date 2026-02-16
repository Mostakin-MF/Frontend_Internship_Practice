import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, Globe, Menu } from "lucide-react";

export default function Navbar() {

  return (
    <>
      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/Logo.png" alt="Track My Vehicle" width={150} height={150} className="w-auto h-16 sm:h-20" />
        </div>

        <div className="hidden lg:block">
          <ul className="flex gap-8 text-gray-600 font-medium dark:text-gray-300 items-center">
            <li className="text-orange-500 cursor-pointer">Home</li>
            <li className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition">Products</li>
            <li className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition">Features <span className="text-xs">▼</span></li>
            <li className="cursor-pointer hover:text-orange-500 transition">How It Works</li>
            <li className="cursor-pointer hover:text-orange-500 transition">Store Locator</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
            <ShoppingCart size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
          </button>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
            <Menu size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </nav>
    </>
  );
}