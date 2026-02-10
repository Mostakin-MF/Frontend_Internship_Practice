// code link for visualization
//  https://codepen.io/yuhomyan/pen/OJMejWJ

import React from "react";
import OceanGradientButton from "@/components/AnimatedButton/variants/OceanGradientButton";
import BorderSweepButton from "@/components/AnimatedButton/variants/BorderSweepButton";
import Flip3DButton from "@/components/AnimatedButton/variants/Flip3DButton";
// For other variants not implemented as files, we will render simple placeholders.
// Once you create the variant files, import them here the same way.

export default function AnimatedButtonsDemo() {
  // list of demos (use the real components you add)
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-semibold mb-2">Animation Buttons</h1>
        <p className="text-gray-600 mb-8">Hover and enjoy the satisfying neumorphic animation designs!</p>

        <div className="flex flex-wrap justify-center gap-4">
          <OceanGradientButton />
          <BorderSweepButton />
          <Flip3DButton />
          {/* Add the other 13 components here after you create them */}
          <button className="inline-block rounded-md px-4 py-2 bg-gray-200 text-gray-700">Placeholder</button>
          <button className="inline-block rounded-md px-4 py-2 bg-gray-200 text-gray-700">Placeholder</button>
          <button className="inline-block rounded-md px-4 py-2 bg-gray-200 text-gray-700">Placeholder</button>
        </div>

        <p className="mt-8 font-mono text-sm text-gray-500">DEERBUCKS.DESIGNING</p>
      </div>
    </main>
  );
}