"use client";

import { useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const colors: Record<string, string> = {
  red:    "bg-red-400",
  green:  "bg-green-400",
  blue:   "bg-blue-400",
  purple: "bg-purple-400",
  amber:  "bg-amber-400",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Toggle switch */
function Toggle({ label, color }: { label: string; color: string }) {
  const [on, setOn] = useState(false);
  const trackOn  = color;
  const trackOff = "bg-slate-600";
  return (
    <div className="flex items-center justify-between w-full">
      <span className="text-slate-300 text-sm">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${on ? trackOn : trackOff}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${on ? "translate-x-5" : ""}`}
        />
      </button>
    </div>
  );
}

/** Range slider */
function Slider({ label, color }: { label: string; color: string }) {
  const [val, setVal] = useState(60);
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-slate-300 text-sm">{label}</span>
        <span className={`text-xs font-bold ${color}`}>{val}%</span>
      </div>
      <input
        type="range" min={0} max={100} value={val}
        onChange={(e) => setVal(+e.target.value)}
        className="w-full accent-indigo-500"
      />
    </div>
  );
}

/** Star rating */
function StarRating() {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => setStars(s)}
          className={`text-2xl transition-transform duration-100 hover:scale-125 ${
            s <= (hover || stars) ? "text-amber-400" : "text-slate-600"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/** Progress Bar */
function ProgressBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-slate-400 text-xs">{label}</span>
        <span className="text-slate-400 text-xs">{value}%</span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/** Counter */
function Counter({ label, color }: { label: string; color: string }) {
  const [count, setCount] = useState(0);
  return (
    <div className={`flex flex-col items-center gap-2 p-4 rounded-2xl border border-slate-800 bg-slate-900`}>
      <span className="text-slate-400 text-xs font-medium">{label}</span>
      <span className={`text-3xl font-extrabold ${color}`}>{count}</span>
      <div className="flex gap-2">
        <button onClick={() => setCount(c => c - 1)} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors">−</button>
        <button onClick={() => setCount(0)} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold transition-colors">↺</button>
        <button onClick={() => setCount(c => c + 1)} className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors">+</button>
      </div>
    </div>
  );
}

/** CSS-only accordion */
function AccordionCSS({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-slate-800 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center px-4 py-3 bg-slate-900 hover:bg-slate-800 text-sm text-white font-medium transition-colors"
          >
            {item.q}
            <span className={`text-slate-400 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}>▼</span>
          </button>
          {open === i && (
            <div className="px-4 py-3 bg-slate-950 text-slate-400 text-sm">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/** Tooltip hover */
function TooltipDemo() {
  const items = [
    { label: "📋 Copy",    tip: "Copy to clipboard",    color: "bg-blue-600" },
    { label: "🗑️ Delete",  tip: "Delete permanently",   color: "bg-rose-600" },
    { label: "✏️ Edit",    tip: "Edit this item",       color: "bg-amber-600" },
    { label: "📤 Share",   tip: "Share with team",      color: "bg-emerald-600" },
  ];
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <div key={item.label} className="relative group">
          <button className={`px-4 py-2 rounded-lg ${item.color} text-white text-sm font-semibold transition-transform hover:scale-105`}>
            {item.label}
          </button>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-slate-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
            {item.tip}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Dropdown menu (CSS-only) */
function DropdownMenu() {
  const [open, setOpen] = useState(false);
  const options = ["Dashboard", "Settings", "Profile", "Billing", "Sign out"];
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-semibold rounded-xl transition-colors"
      >
        Menu ▾
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-44 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setOpen(false)}
              className="w-full text-left px-4 py-2.5 text-slate-200 hover:bg-slate-700 text-sm transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Badge showcase */
function BadgeRow({ items }: { items: { label: string; bg: string; text: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((b) => (
        <span key={b.label} className={`px-3 py-1 rounded-full text-xs font-bold ${b.bg} ${b.text}`}>
          {b.label}
        </span>
      ))}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function Section({ title, subtitle, children, accent = "bg-blue-500" }: {
  title: string; subtitle: string; children: React.ReactNode; accent?: string;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        <span className={`w-1 h-6 rounded-full ${accent}`} />
        <div>
          <h2 className="text-base font-bold text-white">{title}</h2>
          <p className="text-slate-500 text-xs">{subtitle}</p>
        </div>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        {children}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnimationPage() {
  const [bgColor, setBgColor] = useState("");

  return (
    <main className="min-h-screen bg-slate-950 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-[11px] font-bold tracking-widest uppercase text-sky-400 bg-sky-400/10 border border-sky-400/30 rounded-full">
            CSS & Tailwind
          </span>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            Basic Animations & Interactions
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-sm">
            Tailwind CSS utilities, CSS-only patterns, and React state-driven
            interactive components — all without Framer Motion.
          </p>
        </div>

        {/* 1 — Tailwind built-in animations */}
        <Section title="Tailwind Built-in Animations" subtitle="spin · ping · pulse · bounce — out of the box" accent="bg-sky-500">
          <div className="flex flex-wrap gap-8 items-center justify-center py-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 border-4 border-sky-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-slate-500">animate-spin</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-rose-400 animate-ping" />
              <span className="text-xs text-slate-500">animate-ping</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-violet-500 animate-pulse" />
              <span className="text-xs text-slate-500">animate-pulse</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-400 animate-bounce" />
              <span className="text-xs text-slate-500">animate-bounce</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-amber-400 rounded-lg" style={{ animation: "spin 3s linear infinite" }} />
              <span className="text-xs text-slate-500">CSS spin</span>
            </div>
          </div>
        </Section>

        {/* 2 — Color selector */}
        <Section title="Dynamic Background Color" subtitle="State-driven color change using React useState" accent="bg-violet-500">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.entries(colors).map(([name, cls]) => (
                <button
                  key={name}
                  onClick={() => setBgColor(cls)}
                  className={`px-4 py-2 rounded-xl font-semibold capitalize text-sm text-white ${cls} hover:scale-105 transition-transform`}
                >
                  {name}
                </button>
              ))}
              <button onClick={() => setBgColor("")} className="px-4 py-2 rounded-xl text-slate-400 border border-slate-700 text-sm hover:bg-slate-800 transition-colors">
                Reset
              </button>
            </div>
            <div className={`h-20 rounded-xl transition-all duration-500 ${bgColor || "bg-slate-800"} flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">{bgColor || "Choose a color above"}</span>
            </div>
          </div>
        </Section>

        {/* 3 — Group hover */}
        <Section title="Group Hover" subtitle="Parent hover triggers child animations via Tailwind group-* utilities" accent="bg-amber-500">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Hover me", child: "I lit up! ✨", from: "from-blue-800", to: "to-blue-900", childColor: "text-blue-300" },
              { label: "Try this", child: "Group hover! 🎯", from: "from-rose-800", to: "to-rose-900", childColor: "text-rose-300" },
              { label: "Pro Plan", child: "Now active 🚀", from: "from-emerald-800", to: "to-emerald-900", childColor: "text-emerald-300" },
            ].map((item) => (
              <div
                key={item.label}
                className={`group p-5 rounded-xl bg-gradient-to-br ${item.from} ${item.to} border border-slate-700 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl`}
              >
                <p className="font-bold text-white mb-1 transition-all group-hover:translate-x-1">{item.label}</p>
                <p className={`text-xs ${item.childColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>{item.child}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 4 — focus-within */}
        <Section title="Focus Within" subtitle="Parent styles react to child focus events — no JavaScript!" accent="bg-emerald-500">
          <div className="max-w-md mx-auto space-y-4">
            {[
              { label: "Email", placeholder: "you@example.com", type: "email" },
              { label: "Password", placeholder: "••••••••", type: "password" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs text-slate-400 mb-1.5 font-semibold uppercase tracking-wider">{f.label}</label>
                <div className="rounded-xl border border-slate-700 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 bg-slate-800 transition-all">
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full bg-transparent px-4 py-3 text-white text-sm outline-none rounded-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 5 — Tooltip hover */}
        <Section title="Tooltip Hover (CSS)" subtitle="Pure CSS / Tailwind group-hover tooltip pattern" accent="bg-rose-500">
          <TooltipDemo />
        </Section>

        {/* 6 — Toggles */}
        <Section title="Toggle Switches" subtitle="Accessible custom toggles built with CSS transitions" accent="bg-fuchsia-500">
          <div className="max-w-sm mx-auto space-y-4">
            <Toggle label="Dark Mode"          color="bg-indigo-500" />
            <Toggle label="Email Notifications" color="bg-emerald-500" />
            <Toggle label="Analytics Tracking"  color="bg-amber-500" />
            <Toggle label="Beta Features"       color="bg-rose-500" />
          </div>
        </Section>

        {/* 7 — Sliders */}
        <Section title="Range Sliders" subtitle="Native input with React state to track value" accent="bg-teal-500">
          <div className="max-w-md mx-auto space-y-5">
            <Slider label="Volume"     color="text-sky-400" />
            <Slider label="Brightness" color="text-amber-400" />
            <Slider label="Opacity"    color="text-violet-400" />
          </div>
        </Section>

        {/* 8 — Progress bars */}
        <Section title="Progress Bars" subtitle="Skill proficiency visualization with colored bars" accent="bg-cyan-500">
          <div className="max-w-md mx-auto space-y-4">
            <ProgressBar label="React / Next.js"  value={88} color="bg-sky-500" />
            <ProgressBar label="TypeScript"        value={80} color="bg-blue-500" />
            <ProgressBar label="Tailwind CSS"      value={92} color="bg-teal-500" />
            <ProgressBar label="Node.js"            value={72} color="bg-emerald-500" />
            <ProgressBar label="UI / Design"        value={78} color="bg-fuchsia-500" />
          </div>
        </Section>

        {/* 9 — Counters */}
        <Section title="Interactive Counters" subtitle="click + and − to change value, ↺ to reset" accent="bg-orange-500">
          <div className="flex flex-wrap gap-4 justify-center">
            <Counter label="Likes"    color="text-rose-400" />
            <Counter label="Views"    color="text-sky-400" />
            <Counter label="Shares"   color="text-emerald-400" />
            <Counter label="Bookmarks" color="text-amber-400" />
          </div>
        </Section>

        {/* 10 — Star rating */}
        <Section title="Star Rating" subtitle="Hover-aware interactive star rating component" accent="bg-yellow-500">
          <div className="flex flex-col items-center gap-3">
            <StarRating />
            <p className="text-slate-500 text-xs">Hover to preview, click to lock rating</p>
          </div>
        </Section>

        {/* 11 — Accordion */}
        <Section title="Accordion (React state)" subtitle="FAQ-style expandable sections" accent="bg-indigo-500">
          <AccordionCSS
            items={[
              { q: "What is Tailwind CSS?", a: "Tailwind is a utility-first CSS framework that lets you build designs directly in your markup using small, composable classes." },
              { q: "Why use group-hover?", a: "group-hover lets you style child elements when the parent is hovered, all without JavaScript — great for cards, nav items, and dropdowns." },
              { q: "What is focus-within?", a: "focus-within applies styles to a container when any of its children receive focus, enabling clean form field highlight effects." },
              { q: "Are CSS transitions performant?", a: "Yes — transitions on transform and opacity are GPU-accelerated and do not trigger layout recalculation, making them very smooth." },
            ]}
          />
        </Section>

        {/* 12 — Dropdown */}
        <Section title="Dropdown Menu (state-driven)" subtitle="Click-controlled dropdown with auto-close on selection" accent="bg-violet-500">
          <div className="flex gap-4 flex-wrap items-start">
            <DropdownMenu />
            <p className="text-slate-500 text-xs pt-3">Click the button, then choose an option to close the menu.</p>
          </div>
        </Section>

        {/* 13 — Badges */}
        <Section title="Badge Showcase" subtitle="Status pills, labels, and counters" accent="bg-rose-500">
          <div className="space-y-4">
            <BadgeRow items={[
              { label: "New",      bg: "bg-blue-500",    text: "text-white" },
              { label: "Hot 🔥",   bg: "bg-rose-500",    text: "text-white" },
              { label: "Sale",     bg: "bg-amber-400",   text: "text-amber-900" },
              { label: "Sold Out", bg: "bg-slate-700",   text: "text-slate-300" },
              { label: "Popular",  bg: "bg-violet-500",  text: "text-white" },
              { label: "Limited",  bg: "bg-orange-500",  text: "text-white" },
            ]} />
            <BadgeRow items={[
              { label: "🟢 Online",       bg: "bg-emerald-500/20", text: "text-emerald-400" },
              { label: "🟡 Away",         bg: "bg-amber-500/20",   text: "text-amber-400" },
              { label: "🔴 Do Not Disturb", bg: "bg-rose-500/20",  text: "text-rose-400" },
              { label: "⚫ Offline",       bg: "bg-slate-700",      text: "text-slate-400" },
              { label: "👑 Admin",         bg: "bg-yellow-400/20",  text: "text-yellow-400" },
            ]} />
          </div>
        </Section>

        {/* 14 — Hover card */}
        <Section title="Hover Cards" subtitle="Cards that reveal details on hover using Tailwind transitions" accent="bg-teal-500">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "React",       emoji: "⚛️",  level: "Advanced",  desc: "Component-based UI library by Meta.", tag: "bg-sky-500/20 text-sky-400" },
              { name: "Next.js",     emoji: "▲",   level: "Advanced",  desc: "Full-stack React framework by Vercel.", tag: "bg-white/10 text-white" },
              { name: "TypeScript",  emoji: "🔷",  level: "Proficient", desc: "Typed superset of JavaScript.", tag: "bg-blue-500/20 text-blue-400" },
              { name: "Tailwind",    emoji: "🎨",  level: "Expert",    desc: "Utility-first CSS framework.", tag: "bg-teal-500/20 text-teal-400" },
              { name: "Recharts",    emoji: "📊",  level: "Learning",  desc: "Composable charting library for React.", tag: "bg-orange-500/20 text-orange-400" },
              { name: "Framer",      emoji: "✨",  level: "Learning",  desc: "Production-grade motion library.", tag: "bg-fuchsia-500/20 text-fuchsia-400" },
            ].map((card) => (
              <div
                key={card.name}
                className="group p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-slate-600 hover:shadow-xl transition-all duration-300 cursor-default"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{card.emoji}</span>
                  <div>
                    <p className="font-bold text-white text-sm">{card.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.tag}`}>{card.level}</span>
                  </div>
                </div>
                <p className="text-slate-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-0 group-hover:h-auto overflow-hidden">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <p className="text-center mt-8 text-xs text-slate-700 font-mono tracking-widest uppercase">
          Tailwind CSS · React Hooks · Internship Practice
        </p>
      </div>
    </main>
  );
}