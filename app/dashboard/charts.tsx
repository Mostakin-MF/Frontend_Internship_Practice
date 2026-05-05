"use client";

import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import rawData from "./data.json";

type DocRecord = {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
};

const data: DocRecord[] = rawData as DocRecord[];

// ─── Bar Chart: Documents by Type ─────────────────────────────────────────────
export function DocumentsByTypeChart() {
  const chartData = useMemo(() => {
    const counts: Record<string, { total: number; done: number; inProcess: number }> = {};
    data.forEach((d) => {
      if (!counts[d.type]) counts[d.type] = { total: 0, done: 0, inProcess: 0 };
      counts[d.type].total++;
      if (d.status === "Done") counts[d.type].done++;
      else counts[d.type].inProcess++;
    });
    return Object.entries(counts)
      .map(([type, v]) => ({ type: type.replace(" content", ""), ...v }))
      .sort((a, b) => b.total - a.total);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
        <XAxis
          dataKey="type"
          tick={{ fontSize: 11, fill: "currentColor" }}
          angle={-35}
          textAnchor="end"
          interval={0}
        />
        <YAxis tick={{ fontSize: 11, fill: "currentColor" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
        <Bar dataKey="done" name="Done" fill="#22c55e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="inProcess" name="In Process" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Donut Chart: Status Breakdown ────────────────────────────────────────────
export function StatusDonutChart() {
  const chartData = useMemo(() => {
    const done = data.filter((d) => d.status === "Done").length;
    const inProcess = data.filter((d) => d.status === "In Process").length;
    return [
      { name: "Done", value: done },
      { name: "In Process", value: inProcess },
    ];
  }, []);

  const COLORS = ["#22c55e", "#3b82f6"];

  const renderCustomLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent,
  }: {
    cx: number; cy: number; midAngle: number;
    innerRadius: number; outerRadius: number; percent: number;
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex items-center justify-center gap-8">
      <ResponsiveContainer width="60%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-3">
        {chartData.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
            <div>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.value} documents</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Area Chart: Target vs Limit (first 20) ───────────────────────────────────
export function TargetVsLimitChart() {
  const chartData = useMemo(() =>
    data.slice(0, 20).map((d) => ({
      name: d.header.slice(0, 18) + (d.header.length > 18 ? "…" : ""),
      target: parseInt(d.target),
      limit: parseInt(d.limit),
    })),
    []
  );

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 65 }}>
        <defs>
          <linearGradient id="gradTarget" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="gradLimit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "currentColor" }}
          angle={-40}
          textAnchor="end"
          interval={0}
        />
        <YAxis tick={{ fontSize: 11, fill: "currentColor" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
        <Area type="monotone" dataKey="target" name="Target" stroke="#6366f1" strokeWidth={2} fill="url(#gradTarget)" />
        <Area type="monotone" dataKey="limit" name="Limit" stroke="#f59e0b" strokeWidth={2} fill="url(#gradLimit)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Radar Chart: Document Type Distribution ──────────────────────────────────
export function DocumentTypeRadar() {
  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    data.forEach((d) => {
      const key = d.type.replace(" content", "");
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([type, count]) => ({ type, count }));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={chartData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="currentColor" strokeOpacity={0.15} />
        <PolarAngleAxis dataKey="type" tick={{ fontSize: 11, fill: "currentColor" }} />
        <Radar
          name="Documents"
          dataKey="count"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// ─── Top Reviewers ─────────────────────────────────────────────────────────────
export function TopReviewers() {
  const reviewers = useMemo(() => {
    const counts: Record<string, { total: number; done: number }> = {};
    data.forEach((d) => {
      if (d.reviewer === "Assign reviewer") return;
      if (!counts[d.reviewer]) counts[d.reviewer] = { total: 0, done: 0 };
      counts[d.reviewer].total++;
      if (d.status === "Done") counts[d.reviewer].done++;
    });
    return Object.entries(counts)
      .map(([name, v]) => ({ name, ...v, rate: Math.round((v.done / v.total) * 100) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  }, []);

  const avatarColors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];
  const maxTotal = Math.max(...reviewers.map((r) => r.total));

  return (
    <div className="space-y-4">
      {reviewers.map((r, i) => (
        <div key={r.name} className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm"
            style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
          >
            {r.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
              <span className="text-xs text-muted-foreground ml-2 shrink-0">{r.total} docs</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full transition-all duration-700"
                style={{
                  width: `${(r.total / maxTotal) * 100}%`,
                  backgroundColor: avatarColors[i % avatarColors.length],
                }}
              />
            </div>
          </div>
          <span className="text-xs font-semibold shrink-0" style={{ color: avatarColors[i % avatarColors.length] }}>
            {r.rate}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Type Progress Breakdown ──────────────────────────────────────────────────
export function TypeProgressBreakdown() {
  const types = useMemo(() => {
    const map: Record<string, { done: number; total: number }> = {};
    data.forEach((d) => {
      const key = d.type;
      if (!map[key]) map[key] = { done: 0, total: 0 };
      map[key].total++;
      if (d.status === "Done") map[key].done++;
    });
    return Object.entries(map)
      .map(([type, v]) => ({ type, ...v, pct: Math.round((v.done / v.total) * 100) }))
      .sort((a, b) => b.pct - a.pct);
  }, []);

  const colors = ["#22c55e", "#6366f1", "#f59e0b", "#3b82f6", "#8b5cf6", "#06b6d4", "#ef4444", "#84cc16"];

  return (
    <div className="space-y-3">
      {types.map((t, i) => (
        <div key={t.type}>
          <div className="flex justify-between items-center mb-1">
            <p className="text-xs font-medium text-foreground">{t.type}</p>
            <span className="text-xs text-muted-foreground">{t.done}/{t.total}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{ width: `${t.pct}%`, backgroundColor: colors[i % colors.length] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
