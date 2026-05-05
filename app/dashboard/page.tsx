import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { KpiCards } from "./kpi-cards";
import { DocumentsTable } from "./table";
import {
  DocumentsByTypeChart,
  StatusDonutChart,
  TargetVsLimitChart,
  DocumentTypeRadar,
  TopReviewers,
  TypeProgressBreakdown,
} from "./charts";
import { ActivityFeed } from "./activity-feed";

export default function DashboardPage() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-6 p-4 md:p-6">

            {/* Page heading */}
            <div>
              <h1 className="text-2xl font-bold text-foreground">Project Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Overview of all 68 documents — completion status, reviewer performance, and progress tracking.
              </p>
            </div>

            {/* ── KPI Cards ── */}
            <KpiCards />

            {/* ── Row 1: Bar Chart + Donut Chart ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="font-semibold text-foreground">Documents by Type</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Completion breakdown across all document categories</p>
                </div>
                <DocumentsByTypeChart />
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="font-semibold text-foreground">Status Overview</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Done vs In-Progress ratio</p>
                </div>
                <StatusDonutChart />
              </div>
            </div>

            {/* ── Row 2: Area Chart + Radar Chart ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="font-semibold text-foreground">Target vs Limit Trend</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">First 20 documents — target pages vs limit pages</p>
                </div>
                <TargetVsLimitChart />
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="font-semibold text-foreground">Type Distribution Radar</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Document count by category</p>
                </div>
                <DocumentTypeRadar />
              </div>
            </div>

            {/* ── Row 3: Documents Table ── */}
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-border">
                <h2 className="font-semibold text-foreground">All Documents</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Full list with status, reviewer, and progress — paginated</p>
              </div>
              <DocumentsTable />
            </div>

            {/* ── Row 4: Reviewers + Type Progress + Activity ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="font-semibold text-foreground">Top Reviewers</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">By documents assigned</p>
                </div>
                <TopReviewers />
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="font-semibold text-foreground">Progress by Type</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Completion rate per category</p>
                </div>
                <TypeProgressBreakdown />
              </div>
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="font-semibold text-foreground">Recent Activity</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Latest reviewer actions</p>
                </div>
                <ActivityFeed />
              </div>
            </div>

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
