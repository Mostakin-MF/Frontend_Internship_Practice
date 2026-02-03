import Image from "next/image"

export default function Logo() {
    return (
        <div className="pb-30">
            <Image
                src="/PULSE LOGO-Photoroom 1.png"
                alt="Pulse Logo"
                width={180}
                height={56}
                priority
            />
        </div>
    )
}