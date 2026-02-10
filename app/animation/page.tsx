"use client"
import { useState } from "react";


export default function Test_Animation()
{
    const colors = ["red", "green", "blue"];
    const [color, setColor] = useState("white");
    const possible = ["bg-red-400", "bg-green-400", "bg-blue-400", "bg-white"];

    return(
        <main className="flex flex-col justify-center items-center gap-10">
        
        <div className="group h-12 w-12 bg-blue-300 flex justify-center items-center">
            <div className="w-4 h-4 bg-amber-300 group-hover:bg-amber-600"></div>
            <div className="w-4 h-4 bg-gray-500 group-hover:bg-amber-600"></div>

        </div>

        <div>
            <div className="animate-spin">-{"->"}</div>
            <div className="animate-ping">Like</div>
            <div className="animate-pulse">Subscribe</div>
            <div className="animate-bounce">Hit the 4</div>
        </div>


        <div>
                <select
                className={`bg-${color}-400`}
                value={color}
                onChange={(e) => setColor(e.target.value)}
                >
                <option value="">choose</option>
                {colors.map((color) => {
                return <option value={color}>{color}</option>;
                })}
                </select>
        </div>


<div className="min-h-auto  flex items-center justify-center p-6">
  <div
    className="
      group w-full max-w-sm
      rounded-xl border border-slate-700
      bg-slate-800 p-6
      transition hover:bg-slate-700
    "
  >
    <div className="flex items-center justify-between">
      <h2
        className="
          text-lg font-semibold text-white
          transition group-hover:text-blue-400
        "
      >
        Pro Plan
      </h2>

      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" />
        <div
          className="
            h-5 w-9 rounded-full bg-slate-600
            transition peer-checked:bg-green-500
          "
        ></div>
        <span
          className="
            absolute left-1 top-1 h-3 w-3 rounded-full bg-white
            transition-transform peer-checked:translate-x-4
          "
        ></span>
      </label>
    </div>

    <p
      className="
        mt-3 text-sm text-slate-400
        transition group-hover:text-slate-200
      "
    >
      Hover the card, toggle the switch, resize screen.
    </p>

    <div
      className="
        mt-4 inline-block rounded-full
        bg-blue-500/10 px-3 py-1
        text-xs text-blue-400
        animate-pulse
      "
    >
      Popular
    </div>

    <button
      className="
        mt-6 w-full rounded-lg
        bg-blue-600 py-2 text-white
        transition-transform
        hover:scale-105
        sm:py-3
        md:text-lg
      "
    >
      Get Started
    </button>

    <p
      className="
        mt-3 text-center text-xs text-slate-500
        hidden peer-checked:block
        peer-checked:text-green-400
      "
    >
      ✔ Plan activated
    </p>
  </div>
</div>

        <div className="min-h-screen bg-slate-900 p-10 space-y-12 text-slate-200">

  <div className="max-w-md">
    <label className="block text-sm mb-2 text-slate-400">Focus Within</label>
    <div
      className="
        rounded-lg border border-slate-700 p-3
        focus-within:border-blue-500
        focus-within:ring-1 focus-within:ring-blue-500
      "
    >
      <input
        type="text"
        placeholder="Click inside"
        className="w-full bg-transparent outline-none"
      />
    </div>
  </div>

  <div className="relative inline-block group">
    <button
      className="rounded-lg bg-blue-600 px-4 py-2 text-white"
    >
      Hover me
    </button>

    <div
      className="
        absolute left-1/2 top-full mt-2
        -translate-x-1/2
        rounded bg-black px-3 py-1 text-xs
        opacity-0 scale-95
        transition
        group-hover:opacity-100
        group-hover:scale-100
      "
    >
      Tooltip text
    </div>
  </div>

  <div className="relative inline-block group">
    <button
      className="rounded-lg bg-slate-700 px-4 py-2"
    >
      Menu ▼
    </button>

    <div
      className="
        absolute mt-2 w-40 rounded-lg bg-slate-800
        border border-slate-700
        opacity-0 scale-95
        pointer-events-none
        transition
        group-hover:opacity-100
        group-hover:scale-100
        group-hover:pointer-events-auto
      "
    >
      <a className="block px-4 py-2 hover:bg-slate-700" href="#">Profile</a>
      <a className="block px-4 py-2 hover:bg-slate-700" href="#">Settings</a>
      <a className="block px-4 py-2 hover:bg-slate-700" href="#">Logout</a>
    </div>
  </div>

  <div className="max-w-md">
    <input type="checkbox" className="peer hidden" />

    <label
      className="
        block cursor-pointer rounded-lg bg-slate-800 p-4
      "
    >
      Click to expand
    </label>

    <div
      className="
        max-h-0 overflow-hidden
        transition-all duration-300
        peer-checked:max-h-40
        peer-checked:mt-2
        rounded-lg bg-slate-700 p-4
      "
    >
      Accordion content without JavaScript.
    </div>
  </div>

  <div>
    <input type="checkbox" className="peer hidden" />

    <label
      className="cursor-pointer rounded bg-green-600 px-4 py-2 text-white"
    >
      Open Modal
    </label>

    <div
      className="
        fixed inset-0 bg-black/60
        opacity-0 pointer-events-none
        transition
        peer-checked:opacity-100
        peer-checked:pointer-events-auto
        flex items-center justify-center
      "
    >
      <div className="rounded-lg bg-slate-800 p-6">
        <p>Modal content (CSS only)</p>
        <label
          className="mt-4 inline-block cursor-pointer text-red-400"
        >
          Close
        </label>
      </div>
    </div>
  </div>

</div>
        
        </main>
    )
}