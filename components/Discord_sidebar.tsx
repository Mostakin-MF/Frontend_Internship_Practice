"use client"
import { ReactNode } from 'react';
import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';

const SideBar = () => {
    return (
        <div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-discord-900 text-white shadow-lg">
            <SideBarIcon icon={<FaFire size="28" />} text="Direct Messages" />
            <Divider />
            <SideBarIcon icon={<BsPlus size="32" />} text="Add Server" />
            <SideBarIcon icon={<BsFillLightningFill size="20" />} text="Explore Public Servers" />
            <SideBarIcon icon={<FaPoo size="20" />} text="Nitro" />
            <Divider />
            <SideBarIcon icon={<BsGearFill size="22" />} text="Settings" />
        </div>
    );
};

interface SideBarIconProps {
    icon: ReactNode;
    text?: string;
}

const SideBarIcon = ({ icon, text = 'tooltip 💡' }: SideBarIconProps) => (
    <div className="sidebar-icon group">
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
);

const Divider = () => <hr className="sidebar-divider" />;

export default SideBar;