"use client";

import { useState } from "react";

// ─── Offer data ───────────────────────────────────────────────────────────────

const offers = [
  {
    id: "starter",
    name: "Starter Pack",
    originalPrice: 4999,
    offerPrice: 2499,
    discount: 50,
    emoji: "🚀",
    tagline: "Best for individuals",
    features: ["1 Vehicle Tracker", "6 Month Warranty", "Basic Dashboard", "Email Support"],
    accentFrom: "#FDD10E",
    accentTo: "#F36B24",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro Pack",
    originalPrice: 9999,
    offerPrice: 4999,
    discount: 50,
    emoji: "⭐",
    tagline: "Most popular choice",
    features: ["3 Vehicle Trackers", "1 Year Warranty", "Advanced Dashboard", "Priority Support", "Real-time Alerts"],
    accentFrom: "#F36B24",
    accentTo: "#e91e63",
    popular: true,
  },
  {
    id: "business",
    name: "Business Pack",
    originalPrice: 24999,
    offerPrice: 14999,
    discount: 40,
    emoji: "🏢",
    tagline: "For fleets & companies",
    features: ["10 Vehicle Trackers", "2 Year Warranty", "Fleet Dashboard", "24/7 Support", "API Access", "Custom Reports"],
    accentFrom: "#9C27B0",
    accentTo: "#3F51B5",
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    originalPrice: 99999,
    offerPrice: 59999,
    discount: 40,
    emoji: "👑",
    tagline: "Unlimited scale",
    features: ["Unlimited Trackers", "Lifetime Warranty", "Custom Solution", "Dedicated Manager", "On-site Install", "SLA Guarantee"],
    accentFrom: "#00BCD4",
    accentTo: "#009688",
    popular: false,
  },
];

// ─── Countdown (static for display) ──────────────────────────────────────────

const CountdownBox = ({ value, label, delay }: { value: string; label: string; delay: string }) => (
  <div className="flex flex-col items-center">
    <div
      className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #1E1E1E 0%, #2a2a2a 100%)" }}
    >
      {/* Rotating conic border */}
      <div
        className="absolute inset-0 animate-spin"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 100deg, #F36B24 160deg, #FDD10E 270deg, #F36B24 330deg, transparent 360deg)`,
          animationDuration: "3s",
          animationDelay: delay,
        }}
      />
      <div className="absolute inset-[2px] rounded-[9px]" style={{ background: "linear-gradient(to bottom, #1E1E1E 50%, #252525 50%)" }} />
      <span
        className="relative z-10 text-3xl font-extrabold"
        style={{ background: "linear-gradient(to bottom, #FDD10E, #F36B24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
      >
        {value}
      </span>
    </div>
    <span className="text-[#8D96A1] text-[10px] tracking-widest uppercase mt-2">{label}</span>
  </div>
);

// ─── Offer Ticket ─────────────────────────────────────────────────────────────

const OfferTicket = ({ offer }: { offer: typeof offers[0] }) => {
  const [claimed, setClaimed] = useState(false);

  return (
    <div className={`relative rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${offer.popular ? "border-[#F36B24]" : "border-white/10"
      } bg-[#111111] min-w-[260px] max-w-xs flex-shrink-0`}>

      {/* Top gradient bar */}
      <div className="h-1.5" style={{ background: `linear-gradient(to right, ${offer.accentFrom}, ${offer.accentTo})` }} />

      {/* Popular badge */}
      {offer.popular && (
        <div
          className="absolute top-4 right-4 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-black"
          style={{ background: `linear-gradient(to right, ${offer.accentFrom}, ${offer.accentTo})` }}
        >
          POPULAR
        </div>
      )}

      <div className="p-6">
        {/* Emoji + name */}
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{offer.emoji}</span>
          <div>
            <h3 className="text-white font-extrabold text-lg leading-tight">{offer.name}</h3>
            <p className="text-[#8D96A1] text-xs">{offer.tagline}</p>
          </div>
        </div>

        {/* Discount badge */}
        <div
          className="inline-block mt-3 mb-4 text-[10px] font-bold px-2 py-0.5 rounded-full text-black"
          style={{ background: `linear-gradient(to right, ${offer.accentFrom}, ${offer.accentTo})` }}
        >
          {offer.discount}% OFF
        </div>

        {/* Price */}
        <div className="mb-5">
          <span className="text-[#8D96A1] text-sm line-through mr-2">৳{offer.originalPrice.toLocaleString()}</span>
          <span
            className="text-3xl font-extrabold"
            style={{ background: `linear-gradient(to right, ${offer.accentFrom}, ${offer.accentTo})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            ৳{offer.offerPrice.toLocaleString()}
          </span>
        </div>

        {/* Divider with notches */}
        <div className="relative flex items-center my-4">
          <div className="absolute -left-6 w-5 h-5 rounded-full bg-black" />
          <div className="flex-1 border-t border-dashed border-white/10" />
          <div className="absolute -right-6 w-5 h-5 rounded-full bg-black" />
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {offer.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-[#c0c0c0]">
              <span style={{ color: offer.accentFrom }}>✓</span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => setClaimed(!claimed)}
          className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95"
          style={{
            background: claimed
              ? "#1a3a1a"
              : `linear-gradient(to right, ${offer.accentFrom}, ${offer.accentTo})`,
            color: claimed ? "#4ade80" : "#000",
            border: claimed ? "1px solid #4ade80" : "none",
          }}
        >
          {claimed ? "✓ Claimed!" : "Claim Offer"}
        </button>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, #F36B24 0%, transparent 70%)" }}
      />

      <div className="relative z-10 flex flex-col items-center pt-14 pb-16 px-4">

        {/* Badge */}
        <div className="mb-6 relative group cursor-pointer">
          <div className="w-36 h-8 rounded-full border border-[#FDD10E] bg-[#0a0a0a] flex items-center justify-center">
            <span
              className="font-semibold text-sm"
              style={{ background: "linear-gradient(to right, #FDD10E, #F36B24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Current Offers
            </span>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex gap-5 mb-8">
          <CountdownBox value="01" label="Days" delay="0s" />
          <CountdownBox value="21" label="Hours" delay="-0.75s" />
          <CountdownBox value="52" label="Minutes" delay="-1.5s" />
          <CountdownBox value="20" label="Seconds" delay="-2.25s" />
        </div>

        {/* Headline */}
        <h1 className="text-white text-center font-bold text-4xl md:text-5xl leading-tight mb-2" style={{ letterSpacing: "-0.02em" }}>
          Discover the best GPS tracking offer
          <br className="hidden md:block" />
          <span style={{ background: "linear-gradient(to right, #FDD10E, #F36B24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {" "}in Bangladesh
          </span>
        </h1>
        <p className="text-[#8D96A1] text-sm md:text-base mb-10 text-center max-w-lg">
          Limited time deals on our GPS fleet tracking solutions. Offer ends soon — don&apos;t miss out!
        </p>

        {/* Offer tickets */}
        <div className="w-full max-w-6xl flex flex-wrap justify-center gap-5">
          {offers.map((offer) => (
            <OfferTicket key={offer.id} offer={offer} />
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-10 text-[#8D96A1] text-xs text-center">
          All prices include GST · Free installation within Dhaka · 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
}
