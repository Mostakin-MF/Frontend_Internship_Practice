"use client";

import { useState } from "react";

// ─── Form ─────────────────────────────────────────────────────────────────────

function FormField({ label, type, placeholder, icon }: { label: string; type: string; placeholder: string; icon: string }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-1.5">{label}</label>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 bg-slate-800/50 ${focused ? "border-violet-500 ring-2 ring-violet-500/20" : "border-slate-700 hover:border-slate-600"
          }`}
      >
        <span className="text-slate-400">{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-500"
        />
      </div>
    </div>
  );
}

// ─── Social button ────────────────────────────────────────────────────────────

function SocialButton({ icon, label, bg }: { icon: string; label: string; bg: string }) {
  return (
    <button className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border ${bg} text-white text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95`}>
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}

// ─── Feature list for right panel ─────────────────────────────────────────────

const features = [
  { icon: "🔐", title: "Secure Authentication", desc: "End-to-end encrypted login with JWT tokens." },
  { icon: "⚡", title: "Lightning Fast", desc: "Session management optimized for speed." },
  { icon: "🌙", title: "Dark Mode Ready", desc: "Beautiful in both light and dark themes." },
  { icon: "📱", title: "Mobile Responsive", desc: "Works perfectly on any screen size." },
];

const stats = [
  { value: "50K+", label: "Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "Rating" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SignIn2Page() {
  const [submitted, setSubmitted] = useState(false);
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* ── Left Panel (Form) ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">

        {/* Subtle background blob */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative w-full max-w-md">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
              A
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">Acme<span className="text-violet-400">.</span></span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 mb-8">
            {(["signin", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === t ? "bg-violet-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                  }`}
              >
                {t === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {!submitted ? (
            <>
              {/* Heading */}
              <h1 className="text-3xl font-extrabold text-white mb-1">
                {tab === "signin" ? "Welcome back" : "Create account"}
              </h1>
              <p className="text-slate-400 text-sm mb-7">
                {tab === "signin"
                  ? "Enter your credentials to access your account."
                  : "Sign up to get started with Acme today."}
              </p>

              {/* Social */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <SocialButton icon="🌐" label="Google" bg="bg-slate-800 border-slate-700 hover:border-violet-500" />
                <SocialButton icon="🐙" label="GitHub" bg="bg-slate-800 border-slate-700 hover:border-violet-500" />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-slate-800" />
                <span className="text-xs text-slate-500">or continue with email</span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>

              {/* Form fields */}
              <div className="space-y-4 mb-6">
                {tab === "signup" && (
                  <FormField label="Full Name" type="text" placeholder="John Doe" icon="👤" />
                )}
                <FormField label="Email Address" type="email" placeholder="you@example.com" icon="✉️" />
                <FormField label="Password" type="password" placeholder="Enter your password" icon="🔒" />
                {tab === "signup" && (
                  <FormField label="Confirm Password" type="password" placeholder="Repeat password" icon="🔒" />
                )}
              </div>

              {tab === "signin" && (
                <div className="flex justify-end mb-6">
                  <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Forgot password?</a>
                </div>
              )}

              {/* Submit */}
              <button
                onClick={() => setSubmitted(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-sm shadow-lg hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-150"
              >
                {tab === "signin" ? "Sign In →" : "Create Account →"}
              </button>

              {tab === "signup" && (
                <p className="text-xs text-slate-500 mt-4 text-center">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-violet-400 hover:underline">Terms</a> and{" "}
                  <a href="#" className="text-violet-400 hover:underline">Privacy Policy</a>.
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-3xl mx-auto mb-4">
                ✅
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2">
                {tab === "signin" ? "Signed In!" : "Account Created!"}
              </h2>
              <p className="text-slate-400 text-sm mb-6">Welcome to Acme. Redirecting you to the dashboard…</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-violet-400 hover:text-violet-300 underline"
              >
                ← Back to form
              </button>
            </div>
          )}

        </div>
      </div>

      {/* ── Right Panel (Info) ── */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center bg-gradient-to-br from-violet-950 via-slate-900 to-fuchsia-950 px-14 py-14 relative overflow-hidden border-l border-slate-800">

        {/* Decorative blobs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <span className="inline-block px-3 py-1 mb-6 text-[11px] font-bold tracking-widest uppercase text-violet-300 bg-violet-500/20 border border-violet-500/30 rounded-full">
            Sign In Variant 2
          </span>
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Everything you need<br />
            <span className="text-violet-400">in one place.</span>
          </h2>
          <p className="text-slate-400 mb-10 text-sm leading-relaxed max-w-sm">
            A full-featured authentication UI showcasing form design, tab switching, social logins, and success states — all in dark mode.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mb-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-lg shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}