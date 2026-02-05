"use client";

import GlowCircle from "@/components/SignIn/circle_glow";
import LeftSide from "@/components/SignIn/LeftSide";
import RightSide from "@/components/SignIn/Rightside";

export default function Page() {
  return (
    <>
      <div className="flex min-h-screen">

        <iframe className = "border border-gray-300 w-full h-screen" src="https://embed.figma.com/proto/J275LFLundql2h581b3fPP/Redesign-of-Track-of-Vehicle---Website?node-id=1709-4372&starting-point-node-id=1709%3A4372&scaling=scale-down-width&content-scaling=fixed&embed-host=share"></iframe>
        {/* Left sides
        <div className="flex justify-center items-center relative min-h-screen w-full lg:w-1/2 bg-primary-200 text-white rounded-4xl md:flex-col overflow-visible">
          <GlowCircle
            size={200}
            top={100}
            left={100}
            color="red-300"
            opacity={70}
            blur="blur-3xl"
            className="bg-gradient-to-r from-primary-400 to-white"
          />
        <LeftSide className="w-[360px]" />
        </div>

        {/* Right side 
        <div className="flex justify-center items-center min-h-screen w-full lg:w-1/2 bg-orange-500 text-white rounded-3xl md:flex-col">
          <RightSide />
        </div> */}
      </div>
    </>



    // <main className="min-h-screen bg-background text-foreground p-10 space-y-6">
    //   <h1 className="text-3xl font-bold">
    //     Tailwind v4 CSS Theme
    //   </h1>

    //   <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
    //     Primary Button
    //   </button>

    //   <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
    //     Secondary Button
    //   </button>

    //   <div className="bg-success text-success-foreground p-4 rounded-md">
    //     Success Message
    //   </div>

    //   <div className="bg-warning text-warning-foreground p-4 rounded-md">
    //     Warning Message
    //   </div>
    // </main>
    
  )
}

