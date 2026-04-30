"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Coin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

interface PaginationProps {
  totalPost: number;
  postPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationExample() {
  const [coinsData, setCoinsData] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const postPerPage = 20;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 200,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoinsData(response.data);
      } catch {
        // Use mock data on API failure
        setCoinsData(mockCoins);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const filtered = coinsData.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const lastPostNumber = currentPage * postPerPage;
  const firstPostNumber = lastPostNumber - postPerPage;
  const currentPostPage = filtered.slice(firstPostNumber, lastPostNumber);

  // Reset to page 1 when search changes
  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const totalMarketCap = coinsData.reduce((acc, c) => acc + c.market_cap, 0);
  const totalVolume = coinsData.reduce((acc, c) => acc + c.total_volume, 0);

  return (
    <main className="min-h-screen bg-slate-950 py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 mb-3 text-[11px] font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full">
              Live Market Data
            </span>
            <h1 className="text-3xl font-extrabold text-white">Crypto Markets</h1>
            <p className="text-slate-400 text-sm mt-1">CoinGecko API · Pagination · {coinsData.length} coins loaded</p>
          </div>

          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search coins…"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-amber-500 transition-colors w-64"
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Coins Tracked", value: coinsData.length.toString(), color: "text-blue-400" },
            { label: "Total Market Cap", value: `$${(totalMarketCap / 1e12).toFixed(2)}T`, color: "text-emerald-400" },
            { label: "24h Volume",  value: `$${(totalVolume / 1e9).toFixed(0)}B`, color: "text-violet-400" },
            { label: "Page", value: `${currentPage} / ${Math.ceil(filtered.length / postPerPage)}`, color: "text-amber-400" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <p className="text-slate-500 text-xs mb-1">{s.label}</p>
              <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400 text-sm">Fetching market data…</p>
          </div>
        )}

        {/* Coin Grid */}
        {!loading && (
          <>
            {currentPostPage.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-400 text-lg">No results for &ldquo;{search}&rdquo;</p>
              </div>
            ) : (
              <CryptoList coinsData={currentPostPage} />
            )}
            <Pagination
              totalPost={filtered.length}
              postPerPage={postPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}

        <p className="text-center mt-10 text-xs text-slate-700 font-mono tracking-widest uppercase">
          CoinGecko · Axios · Next.js · Internship Practice
        </p>
      </div>
    </main>
  );
}

// ─── Coin Grid ────────────────────────────────────────────────────────────────

const CryptoList = ({ coinsData }: { coinsData: Coin[] }) => (
  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-8">
    {coinsData.map((coin) => (
      <CryptoCard key={coin.id} coin={coin} />
    ))}
  </div>
);

const CryptoCard = ({ coin }: { coin: Coin }) => {
  const positive = coin.price_change_percentage_24h >= 0;
  return (
    <div className="group bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-0.5">
      {/* Top */}
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="w-9 h-9 object-contain" />
        <div className="min-w-0">
          <p className="text-white font-bold text-sm truncate">{coin.name}</p>
          <p className="text-slate-500 text-xs uppercase">{coin.symbol}</p>
        </div>
      </div>

      {/* Price */}
      <p className="text-white font-extrabold text-lg">
        ${coin.current_price.toLocaleString()}
      </p>

      {/* 24h change */}
      <span
        className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full w-fit ${
          positive
            ? "bg-emerald-500/15 text-emerald-400"
            : "bg-rose-500/15 text-rose-400"
        }`}
      >
        {positive ? "▲" : "▼"} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        <span className="font-normal text-[10px] opacity-70">24h</span>
      </span>

      {/* Market cap */}
      <p className="text-slate-600 text-[10px]">
        MCap: ${(coin.market_cap / 1e9).toFixed(1)}B
      </p>
    </div>
  );
};

// ─── Pagination ───────────────────────────────────────────────────────────────

const Pagination = ({ totalPost, postPerPage, currentPage, setCurrentPage }: PaginationProps) => {
  const totalPages = Math.ceil(totalPost / postPerPage);
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "…")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("…");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("…");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {/* Prev */}
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-500 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
      >
        ← Prev
      </button>

      {getPages().map((page, idx) =>
        page === "…" ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-2 text-slate-500 text-sm">…</span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrentPage(page as number)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
              currentPage === page
                ? "bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/30 scale-105"
                : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-500 hover:text-amber-400"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:border-amber-500 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
      >
        Next →
      </button>
    </div>
  );
};

// ─── Mock fallback data ───────────────────────────────────────────────────────

const mockCoins: Coin[] = [
  { id: "bitcoin",    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",    name: "Bitcoin",    symbol: "BTC",  current_price: 68000, price_change_percentage_24h: 1.2,  market_cap: 1.3e12, total_volume: 28e9 },
  { id: "ethereum",   image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png", name: "Ethereum",   symbol: "ETH",  current_price: 3200,  price_change_percentage_24h: -0.8, market_cap: 385e9,  total_volume: 14e9 },
  { id: "solana",     image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",  name: "Solana",     symbol: "SOL",  current_price: 145,   price_change_percentage_24h: 3.5,  market_cap: 64e9,   total_volume: 3.2e9 },
  { id: "bnb",        image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png", name: "BNB", symbol: "BNB", current_price: 415, price_change_percentage_24h: 0.6, market_cap: 62e9, total_volume: 1.8e9 },
  { id: "xrp",        image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png", name: "XRP", symbol: "XRP", current_price: 0.58, price_change_percentage_24h: -2.1, market_cap: 32e9, total_volume: 1.4e9 },
];