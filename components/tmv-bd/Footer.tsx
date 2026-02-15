import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#F6F5EE] text-[#1D1D1D] px-4 md:px-10 py-12 font-inter dark:bg-slate-700 dark:text-white">
            <div className="max-w-310 mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Section - Logo, Address, Socials */}
                <div className="md:col-span-4 flex flex-col items-start gap-6">
                    <Image src="/Logo.png" alt="Track My Vehicle Logo" width={100} height={100} className="w-[100px] h-[100px] object-contain" />

                    <div className="space-y-2">
                        <h3 className="text-[18px] font-bold text-[#1D1D1D] leading-5.5 dark:text-white">Head Office</h3>
                        <p className="text-[#4A5E6D] text-[15px] leading-6 font-normal max-w-75 dark:text-white">
                            138/1, Level, 4 Bir Uttam Mir Shawkat Sarak, Dhaka 1208
                        </p>
                    </div>

                    <div className="flex gap-3 mt-2">
                        {[<Twitter key="tw" size={18} />, <Facebook key="fb" size={18} />, <Instagram key="ig" size={18} />, <Youtube key="yt" size={18} />].map((icon, index) => (
                            <div key={index} className="w-9 h-9 bg-[#F3CD0E] rounded-full flex items-center justify-center text-[#1D1D1D] hover:bg-[#EAC304] transition-colors cursor-pointer">
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Middle Section - Quick Links & More */}
                <div className="md:col-span-4 flex justify-start gap-10 md:justify-start md:gap-24">
                    <div className="flex flex-col gap-6">
                        <h3 className="text-[16px] font-bold text-[#4A5E6D] dark:text-white">Quick links</h3>
                        <ul className="space-y-3">
                            {["Shop", "About", "Contact", "Support", "Policies"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[#6C757D] text-[15px] hover:text-[#1D1D1D] transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-[16px] font-bold text-[#4A5E6D] uppercase dark:text-white">MORE</h3>
                        <ul className="space-y-3">
                            {["Legal Text", "Privacy Notice", "FAQ"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-[#6C757D] text-[15px] hover:text-[#1D1D1D] transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Section - Email & Flagship Product */}
                <div className="md:col-span-4 flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[28px] md:text-[32px] font-semibold text-[#0F172A] leading-10 md:max-w-100">
                            Drop your email here. We will get back to you.
                        </h3>

                        <div className="relative w-full max-w-100">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full border bg-opacity-50 text-[#4A5E6D] placeholder-[#9CA3AF] px-6 py-4 rounded-full outline-none focus:ring-1 focus:ring-[#F3CD0E] pr-14"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#F3CD0E] rounded-full flex items-center justify-center text-white hover:bg-[#D4B202] transition-colors">
                                <Send size={18} className="-ml-1 text-white fill-white" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-[#6C757D] text-[15px]">The flagship product of</span>
                        <Image src="/logoImage 1.png" width={140} height={40} alt="Bondstein Logo" className="mt-1" />
                    </div>
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="mt-4 border-t border-[#E5E7EB] pt-8 text-center">
                <p className="text-[#9CA3AF] text-[14px]">
                    © Copyright {new Date().getFullYear()}, All Rights TMV
                </p>
            </div>
        </footer>
    );
}