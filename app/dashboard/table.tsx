"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import rawData from "./data.json";

type DocRecord = { id: number; header: string; type: string; status: string; target: string; limit: string; reviewer: string; };
const data: DocRecord[] = rawData as DocRecord[];

const PAGE_SIZE = 10;

const typeColors: Record<string, string> = {
  "Narrative": "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "Technical content": "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  "Research": "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  "Legal": "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  "Planning": "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Financial": "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Plain language": "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "Visual": "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
};

export function DocumentsTable() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const pageData = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left font-semibold text-muted-foreground py-3 px-4 w-8">#</th>
              <th className="text-left font-semibold text-muted-foreground py-3 px-4">Document</th>
              <th className="text-left font-semibold text-muted-foreground py-3 px-4 hidden md:table-cell">Type</th>
              <th className="text-left font-semibold text-muted-foreground py-3 px-4">Status</th>
              <th className="text-left font-semibold text-muted-foreground py-3 px-4 hidden lg:table-cell">Target</th>
              <th className="text-left font-semibold text-muted-foreground py-3 px-4 hidden lg:table-cell">Limit</th>
              <th className="text-left font-semibold text-muted-foreground py-3 px-4 hidden xl:table-cell">Reviewer</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((doc, i) => (
              <tr
                key={doc.id}
                className="border-b border-border/50 hover:bg-muted/30 transition-colors group"
              >
                <td className="py-3 px-4 text-muted-foreground text-xs font-mono">
                  {page * PAGE_SIZE + i + 1}
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {doc.header}
                  </span>
                </td>
                <td className="py-3 px-4 hidden md:table-cell">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[doc.type] ?? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}>
                    {doc.type}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    doc.status === "Done"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${doc.status === "Done" ? "bg-emerald-500" : "bg-blue-500 animate-pulse"}`} />
                    {doc.status}
                  </span>
                </td>
                <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{doc.target}</td>
                <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">{doc.limit}</td>
                <td className="py-3 px-4 hidden xl:table-cell">
                  {doc.reviewer === "Assign reviewer" ? (
                    <span className="text-xs text-muted-foreground italic">{doc.reviewer}</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                        {doc.reviewer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-xs text-foreground">{doc.reviewer}</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-medium text-foreground">{page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, data.length)}</span> of{" "}
          <span className="font-medium text-foreground">{data.length}</span> documents
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                p === page
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:bg-muted text-muted-foreground"
              }`}
            >
              {p + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="p-1.5 rounded-lg border border-border hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
