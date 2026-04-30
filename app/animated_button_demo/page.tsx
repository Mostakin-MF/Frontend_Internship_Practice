"use client";

// code link for visualization
//  https://codepen.io/yuhomyan/pen/OJMejWJ

import React, { useState } from "react";
import OceanGradientButton from "@/components/AnimatedButton/variants/OceanGradientButton";
import BorderSweepButton from "@/components/AnimatedButton/variants/BorderSweepButton";
import Flip3DButton from "@/components/AnimatedButton/variants/Flip3DButton";

// ─── Inline Button Variants ──────────────────────────────────────────────────

/** Neon Glow */
function NeonGlowButton({ color = "cyan" }: { color?: string }) {
  const map: Record<string, { border: string; shadow: string; text: string; hoverBg: string }> = {
    cyan:   { border: "border-cyan-400",   shadow: "hover:shadow-cyan-400/60",   text: "text-cyan-400",   hoverBg: "hover:bg-cyan-400/10" },
    fuchsia:{ border: "border-fuchsia-400",shadow: "hover:shadow-fuchsia-400/60",text: "text-fuchsia-400",hoverBg: "hover:bg-fuchsia-400/10" },
    lime:   { border: "border-lime-400",   shadow: "hover:shadow-lime-400/60",   text: "text-lime-400",   hoverBg: "hover:bg-lime-400/10" },
    amber:  { border: "border-amber-400",  shadow: "hover:shadow-amber-400/60",  text: "text-amber-400",  hoverBg: "hover:bg-amber-400/10" },
  };
  const c = map[color] ?? map.cyan;
  return (
    <button
      className={`px-6 py-2.5 rounded-lg border-2 ${c.border} ${c.text} bg-transparent font-bold tracking-widest uppercase text-sm transition-all duration-300 ${c.hoverBg} hover:shadow-lg ${c.shadow} hover:-translate-y-0.5`}
    >
      Neon {color}
    </button>
  );
}

/** Shimmer / Shine */
function ShimmerButton({ label = "Shimmer", bg = "from-violet-600 to-fuchsia-600" }: { label?: string; bg?: string }) {
  return (
    <div className="relative inline-flex overflow-hidden rounded-xl group">
      <button
        className={`relative px-8 py-3 font-bold text-white bg-gradient-to-r ${bg} rounded-xl z-10 transition-transform duration-200 group-hover:scale-[1.02]`}
      >
        {label}
        <span className="absolute inset-0 w-[30%] h-full bg-white/20 skew-x-[-20deg] -translate-x-full group-hover:translate-x-[450%] transition-transform duration-700 ease-in-out" />
      </button>
    </div>
  );
}

/** Pill Toggle */
function PillToggle() {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => setActive(!active)}
      className={`px-7 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 border-2 ${
        active
          ? "bg-emerald-500 border-emerald-500 text-white scale-105 shadow-lg shadow-emerald-400/40"
          : "bg-transparent border-slate-500 text-slate-300 hover:border-emerald-400 hover:text-emerald-300"
      }`}
    >
      {active ? "✓ Subscribed" : "Subscribe"}
    </button>
  );
}

/** Magnetic-feel hover */
function MagneticButton({ label, from, to }: { label: string; from: string; to: string }) {
  return (
    <button
      className={`relative px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-br ${from} ${to} shadow-lg transition-all duration-200 hover:shadow-2xl hover:scale-110 active:scale-95`}
    >
      {label}
    </button>
  );
}

/** Loading / Spinner */
function LoadingButton() {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-80 text-white font-semibold transition-colors duration-200 min-w-[140px] justify-center"
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading…
        </>
      ) : (
        "Click Me"
      )}
    </button>
  );
}

/** Ghost hover fill */
function GhostFillButton({ label, fillFrom, fillTo, textColor }: { label: string; fillFrom: string; fillTo: string; textColor: string }) {
  return (
    <button
      className={`relative px-6 py-2.5 rounded-lg border-2 ${fillFrom.replace("from-","border-").split(" ")[0]} font-bold text-sm overflow-hidden group transition-all duration-300`}
    >
      <span className={`relative z-10 transition-colors duration-300 group-hover:text-white ${textColor}`}>{label}</span>
      <span className={`absolute inset-0 bg-gradient-to-r ${fillFrom} ${fillTo} -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out`} />
    </button>
  );
}

/** Ripple click */
function RippleButton({ label, bg }: { label: string; bg: string }) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };
  return (
    <button
      onClick={handleClick}
      className={`relative px-6 py-2.5 rounded-xl font-bold text-white overflow-hidden ${bg} transition-transform duration-150 hover:scale-105 active:scale-95`}
    >
      {label}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/40 w-4 h-4 -translate-x-1/2 -translate-y-1/2 animate-ping"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </button>
  );
}

/** Count up */
function CountButton({ label, color }: { label: string; color: string }) {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white ${color} transition-transform duration-150 hover:scale-105 active:scale-90`}
    >
      {label}
      <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs min-w-[22px] text-center">{count}</span>
    </button>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="mb-14">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-4 items-center">{children}</div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AnimatedButtonsDemo() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 px-6 md:px-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase text-fuchsia-400 bg-fuchsia-400/10 rounded-full border border-fuchsia-400/30">
          Component Gallery
        </span>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-fuchsia-400 to-amber-400 bg-clip-text text-transparent mb-3">
          Animated Buttons
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Hover, click, and interact. Every button below demonstrates a unique CSS / React animation technique.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">

        {/* 1 — Component-based buttons */}
        <Section title="Component Variants" subtitle="Imported component files — each encapsulates its own CSS animation module.">
          <OceanGradientButton />
          <BorderSweepButton />
          <Flip3DButton />
        </Section>

        {/* 2 — Neon Glow */}
        <Section title="Neon Glow Borders" subtitle="Dark background with glowing border + text. Uses box-shadow on hover.">
          <NeonGlowButton color="cyan" />
          <NeonGlowButton color="fuchsia" />
          <NeonGlowButton color="lime" />
          <NeonGlowButton color="amber" />
        </Section>

        {/* 3 — Shimmer */}
        <Section title="Shimmer / Shine Effect" subtitle="A diagonal light sweep passes over the button on hover using a skewed pseudo element.">
          <ShimmerButton label="Shimmer Violet" bg="from-violet-600 to-fuchsia-600" />
          <ShimmerButton label="Shimmer Ocean" bg="from-cyan-500 to-blue-600" />
          <ShimmerButton label="Shimmer Sunset" bg="from-orange-500 to-rose-600" />
          <ShimmerButton label="Shimmer Emerald" bg="from-emerald-500 to-teal-600" />
        </Section>

        {/* 4 — Gradient Magnetic */}
        <Section title="Gradient Magnetic" subtitle="Vivid gradients + scale-up on hover create a magnetic, satisfying feel.">
          <MagneticButton label="🔥 Blast" from="from-rose-500" to="to-orange-400" />
          <MagneticButton label="🌊 Ocean" from="from-cyan-500" to="to-blue-600" />
          <MagneticButton label="🍀 Forest" from="from-emerald-500" to="to-green-400" />
          <MagneticButton label="⚡ Thunder" from="from-yellow-400" to="to-amber-600" />
          <MagneticButton label="🌙 Night" from="from-indigo-600" to="to-purple-700" />
          <MagneticButton label="🌸 Blossom" from="from-pink-500" to="to-rose-400" />
        </Section>

        {/* 5 — Ghost Fill */}
        <Section title="Ghost Fill on Hover" subtitle="Transparent border becomes a full gradient background on hover.">
          <GhostFillButton label="Ghost Blue"    fillFrom="from-blue-500"    fillTo="to-blue-700"    textColor="text-blue-400" />
          <GhostFillButton label="Ghost Purple"  fillFrom="from-purple-500"  fillTo="to-fuchsia-600" textColor="text-purple-400" />
          <GhostFillButton label="Ghost Rose"    fillFrom="from-rose-500"    fillTo="to-pink-600"    textColor="text-rose-400" />
          <GhostFillButton label="Ghost Teal"    fillFrom="from-teal-500"    fillTo="to-cyan-600"    textColor="text-teal-400" />
        </Section>

        {/* 6 — Interactive state */}
        <Section title="Interactive State Buttons" subtitle="Buttons that change state, count clicks, or show spinners.">
          <PillToggle />
          <LoadingButton />
          <CountButton label="❤️ Like" color="bg-rose-600 hover:bg-rose-500" />
          <CountButton label="⭐ Star" color="bg-amber-500 hover:bg-amber-400" />
          <CountButton label="🔔 Notify" color="bg-indigo-600 hover:bg-indigo-500" />
        </Section>

        {/* 7 — Ripple */}
        <Section title="Ripple Click Effect" subtitle="Click anywhere on the button to see the ripple spread from the cursor.">
          <RippleButton label="Ripple Blue"    bg="bg-blue-600" />
          <RippleButton label="Ripple Violet"  bg="bg-violet-600" />
          <RippleButton label="Ripple Emerald" bg="bg-emerald-600" />
          <RippleButton label="Ripple Rose"    bg="bg-rose-600" />
        </Section>

        {/* 8 — Size scale */}
        <Section title="Size Scale" subtitle="Same style across different sizes to show scalability.">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((sz) => {
            const map = { xs: "px-3 py-1 text-xs", sm: "px-4 py-1.5 text-sm", md: "px-5 py-2 text-base", lg: "px-7 py-3 text-lg", xl: "px-9 py-4 text-xl" };
            return (
              <button
                key={sz}
                className={`rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition-transform ${map[sz]}`}
              >
                {sz.toUpperCase()}
              </button>
            );
          })}
        </Section>

        {/* 9 — Icon buttons */}
        <Section title="Icon Buttons" subtitle="Round action buttons common in toolbars and floating action buttons.">
          {[
            { emoji: "🔔", bg: "bg-violet-600" },
            { emoji: "❤️", bg: "bg-rose-600" },
            { emoji: "🔗", bg: "bg-blue-600" },
            { emoji: "📋", bg: "bg-slate-700" },
            { emoji: "🗑️", bg: "bg-red-700" },
            { emoji: "✏️", bg: "bg-amber-600" },
            { emoji: "🔍", bg: "bg-teal-600" },
            { emoji: "📤", bg: "bg-emerald-600" },
          ].map((item) => (
            <button
              key={item.emoji}
              className={`w-12 h-12 rounded-full ${item.bg} text-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-transform duration-150 shadow-lg`}
            >
              {item.emoji}
            </button>
          ))}
        </Section>

        {/* Footer */}
        <p className="text-center mt-4 font-mono text-xs text-slate-600 tracking-widest uppercase">
          DEERBUCKS.DESIGNING · INTERNSHIP PRACTICE
        </p>
      </div>
    </main>
  );
}