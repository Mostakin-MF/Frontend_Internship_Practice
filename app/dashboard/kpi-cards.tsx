"use client";

import React from "react";
import { FileText, CheckCircle2, Clock, Users, TrendingUp, TrendingDown } from "lucide-react";
import rawData from "./data.json";

type DocRecord = { id: number; header: string; type: string; status: string; target: string; limit: string; reviewer: string; };
const data: DocRecord[] = rawData as DocRecord[];

const done = data.filter((d) => d.status === "Done").length;
const inProcess = data.filter((d) => d.status === "In Process").length;
const reviewers = new Set(data.map((d) => d.reviewer).filter((r) => r !== "Assign reviewer")).size;
const avgTarget = Math.round(data.reduce((acc, d) => acc + parseInt(d.target), 0) / data.length);

const cards = [
  {
    label: "Total Documents",
    value: data.length,
    sub: "Across all types",
    icon: FileText,
    color: "blue",
    trend: null,
  },
  {
    label: "Completed",
    value: done,
    sub: `${Math.round((done / data.length) * 100)}% completion rate`,
    icon: CheckCircle2,
    color: "emerald",
    trend: { up: true, text: "+4 this week" },
  },
  {
    label: "In Progress",
    value: inProcess,
    sub: `${Math.round((inProcess / data.length) * 100)}% of total`,
    icon: Clock,
    color: "amber",
    trend: { up: false, text: "-2 from last week" },
  },
  {
    label: "Active Reviewers",
    value: reviewers,
    sub: `Avg target: ${avgTarget} pts`,
    icon: Users,
    color: "violet",
    trend: { up: true, text: "+1 this sprint" },
  },
];

const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
  blue:    { bg: "bg-blue-50 dark:bg-blue-900/20",    icon: "text-blue-600 dark:text-blue-400",    badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-900/20",  icon: "text-amber-600 dark:text-amber-400",  badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
  violet:  { bg: "bg-violet-50 dark:bg-violet-900/20", icon: "text-violet-600 dark:text-violet-400", badge: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300" },
};

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const c = colorMap[card.color];
        return (
          <div
            key={card.label}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${c.bg}`}>
                <card.icon className={`w-5 h-5 ${c.icon}`} />
              </div>
              {card.trend && (
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${c.badge}`}>
                  {card.trend.up
                    ? <TrendingUp className="w-3 h-3" />
                    : <TrendingDown className="w-3 h-3" />}
                  {card.trend.text}
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-foreground tabular-nums">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
