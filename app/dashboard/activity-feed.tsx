"use client";

import React from "react";
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

const recentActivity = data
  .filter((d) => d.reviewer !== "Assign reviewer")
  .slice(0, 8)
  .map((d) => ({
    id: d.id,
    action: d.status === "Done" ? "completed" : "is reviewing",
    doc: d.header,
    reviewer: d.reviewer,
    type: d.type,
  }));

export function ActivityFeed() {
  return (
    <div className="space-y-3 overflow-y-auto max-h-[320px]">
      {recentActivity.map((item, i) => (
        <div key={item.id} className="flex gap-3 items-start">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5"
            style={{ backgroundColor: `hsl(${(i * 47) % 360}, 65%, 50%)` }}
          >
            {item.reviewer
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-foreground leading-snug">
              <span className="font-semibold">{item.reviewer.split(" ")[0]}</span>{" "}
              <span className="text-muted-foreground">{item.action}</span>
            </p>
            <p className="text-xs font-medium truncate text-foreground">{item.doc}</p>
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full mt-1 inline-block ${
                item.action === "completed"
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
              }`}
            >
              {item.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
