"use client";

import { toast } from "react-toastify";
import { useState } from "react";

// ─── Toast variants ────────────────────────────────────────────────────────────

const toastVariants = [
  {
    label: "Success",
    emoji: "✅",
    description: "Operation completed",
    bg: "bg-emerald-600",
    border: "border-emerald-500",
    glow: "hover:shadow-emerald-500/30",
    fn: () => toast.success("✅ Product added successfully!", { position: "top-right" }),
  },
  {
    label: "Error",
    emoji: "❌",
    description: "Something went wrong",
    bg: "bg-rose-600",
    border: "border-rose-500",
    glow: "hover:shadow-rose-500/30",
    fn: () => toast.error("❌ Something went wrong!", { position: "top-right" }),
  },
  {
    label: "Warning",
    emoji: "⚠️",
    description: "Proceed with caution",
    bg: "bg-amber-600",
    border: "border-amber-500",
    glow: "hover:shadow-amber-500/30",
    fn: () => toast.warning("⚠️ This action may have side effects!", { position: "top-right" }),
  },
  {
    label: "Info",
    emoji: "ℹ️",
    description: "Helpful information",
    bg: "bg-blue-600",
    border: "border-blue-500",
    glow: "hover:shadow-blue-500/30",
    fn: () => toast.info("ℹ️ New version available. Refresh to update.", { position: "top-right" }),
  },
  {
    label: "Custom Dark",
    emoji: "🔥",
    description: "Custom styled toast",
    bg: "bg-slate-700",
    border: "border-slate-500",
    glow: "hover:shadow-slate-400/20",
    fn: () =>
      toast("🔥 Custom dark toast!", {
        style: { background: "#1e293b", color: "#fff", borderRadius: "12px", border: "1px solid #334155" },
        position: "top-right",
      }),
  },
  {
    label: "Promise",
    emoji: "⏳",
    description: "Async/await flow",
    bg: "bg-violet-600",
    border: "border-violet-500",
    glow: "hover:shadow-violet-500/30",
    fn: () =>
      toast.promise(
        new Promise((res) => setTimeout(res, 2000)),
        { pending: "⏳ Uploading file…", success: "🎉 File uploaded!", error: "💥 Upload failed!" },
        { position: "top-right" }
      ),
  },
  {
    label: "Loading",
    emoji: "🔄",
    description: "Manual dismiss",
    bg: "bg-indigo-600",
    border: "border-indigo-500",
    glow: "hover:shadow-indigo-500/30",
    fn: () => {
      const id = toast.loading("🔄 Processing…", { position: "top-right" });
      setTimeout(() => toast.update(id, { render: "✅ Done!", type: "success", isLoading: false, autoClose: 3000 }), 2500);
    },
  },
  {
    label: "Bottom Left",
    emoji: "📍",
    description: "Different position",
    bg: "bg-teal-600",
    border: "border-teal-500",
    glow: "hover:shadow-teal-500/30",
    fn: () => toast("📍 Bottom left toast!", { position: "bottom-left", style: { background: "#0f766e", color: "#fff", borderRadius: "12px" } }),
  },
  {
    label: "Top Center",
    emoji: "🎯",
    description: "Centered notification",
    bg: "bg-fuchsia-600",
    border: "border-fuchsia-500",
    glow: "hover:shadow-fuchsia-500/30",
    fn: () => toast("🎯 Top center notification!", { position: "top-center", style: { background: "#a21caf", color: "#fff", borderRadius: "12px" } }),
  },
];

const positionOptions = [
  "top-right", "top-left", "top-center",
  "bottom-right", "bottom-left", "bottom-center",
] as const;

type ToastPosition = typeof positionOptions[number];

// ─── Code Snippet ─────────────────────────────────────────────────────────────

const codeSnippets: Record<string, string> = {
  basic: `import { toast } from 'react-toastify';

// Simple variants
toast.success('✅ Saved!');
toast.error('❌ Failed!');
toast.warning('⚠️ Caution!');
toast.info('ℹ️ FYI!');`,
  promise: `// Async-aware toast
toast.promise(
  fetch('/api/save'),
  {
    pending: '⏳ Saving…',
    success: '✅ Saved!',
    error:   '❌ Failed!',
  }
);`,
  custom: `// Custom styling
toast('🔥 Custom!', {
  style: {
    background: '#1e293b',
    color: '#fff',
    borderRadius: '12px',
  },
  position: 'top-right',
  autoClose: 3000,
});`,
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ToastDemo() {
  const [activeSnippet, setActiveSnippet] = useState<"basic" | "promise" | "custom">("basic");
  const [customPos, setCustomPos] = useState<ToastPosition>("top-right");
  const [customMsg, setCustomMsg] = useState("Hello from custom toast! 🚀");

  return (
    <main className="min-h-screen bg-slate-950 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-[11px] font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full">
            Notification System
          </span>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent mb-2">
            Toast Notifications
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-sm">
            react-toastify integration — click any card to fire the toast. Explore
            positions, types, promise-flows, and custom styling.
          </p>
        </div>

        {/* Toast Grid */}
        <section className="mb-12">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5">All Toast Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toastVariants.map((v) => (
              <button
                key={v.label}
                onClick={v.fn}
                className={`group flex items-start gap-4 p-5 rounded-2xl border ${v.border} bg-slate-900 hover:bg-slate-800 transition-all duration-200 hover:shadow-xl ${v.glow} text-left`}
              >
                <span className="text-2xl mt-0.5 group-hover:scale-125 transition-transform duration-150">{v.emoji}</span>
                <div>
                  <p className="font-bold text-white text-sm">{v.label}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{v.description}</p>
                  <span className={`inline-block mt-2 text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${v.bg}`}>
                    Click to fire
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Custom playground */}
        <section className="mb-12 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-base font-bold text-white mb-1">Custom Toast Builder</h2>
          <p className="text-slate-400 text-xs mb-5">Write your own message and choose a position.</p>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-violet-500 transition-colors"
              placeholder="Enter toast message…"
            />
            <select
              value={customPos}
              onChange={(e) => setCustomPos(e.target.value as ToastPosition)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-violet-500 transition-colors"
            >
              {positionOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <button
              onClick={() => toast(customMsg, {
                position: customPos,
                style: { background: "#312e81", color: "#fff", borderRadius: "12px", border: "1px solid #4f46e5" },
              })}
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl text-sm transition-colors"
            >
              Fire 🚀
            </button>
          </div>
        </section>

        {/* Code snippets */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex border-b border-slate-800">
            {(["basic", "promise", "custom"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveSnippet(key)}
                className={`px-5 py-3 text-sm font-semibold capitalize transition-colors ${activeSnippet === key
                    ? "bg-slate-800 text-white border-b-2 border-violet-500"
                    : "text-slate-400 hover:text-slate-200"
                  }`}
              >
                {key}
              </button>
            ))}
          </div>
          <pre className="p-6 text-sm text-slate-300 overflow-auto font-mono leading-relaxed">
            <code>{codeSnippets[activeSnippet]}</code>
          </pre>
        </section>

        {/* Tips */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Auto-close", desc: "Default is 5s. Set autoClose: false for sticky toasts.", color: "border-blue-500/40 bg-blue-500/5" },
            { title: "Stacking", desc: "Multiple toasts stack automatically with animations.", color: "border-emerald-500/40 bg-emerald-500/5" },
            { title: "Theming", desc: "Pass style or className for full custom design.", color: "border-violet-500/40 bg-violet-500/5" },
          ].map((tip) => (
            <div key={tip.title} className={`rounded-2xl border ${tip.color} p-4`}>
              <p className="font-bold text-white text-sm mb-1">💡 {tip.title}</p>
              <p className="text-slate-400 text-xs">{tip.desc}</p>
            </div>
          ))}
        </section>

        <p className="text-center mt-10 text-xs text-slate-700 font-mono tracking-widest uppercase">
          react-toastify · Next.js · Internship Practice
        </p>
      </div>
    </main>
  );
}