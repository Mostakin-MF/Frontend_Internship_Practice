"use client";

import {
  ResponsiveContainer,
  BarChart, Bar,
  LineChart, Line,
  AreaChart, Area,
  PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";

// ─── Data ─────────────────────────────────────────────────────────────────────

const monthlyRevenue = [
  { month: "Jan", revenue: 4200, expenses: 2800, profit: 1400 },
  { month: "Feb", revenue: 3800, expenses: 2600, profit: 1200 },
  { month: "Mar", revenue: 5100, expenses: 3100, profit: 2000 },
  { month: "Apr", revenue: 4700, expenses: 2900, profit: 1800 },
  { month: "May", revenue: 6300, expenses: 3400, profit: 2900 },
  { month: "Jun", revenue: 5800, expenses: 3200, profit: 2600 },
  { month: "Jul", revenue: 7200, expenses: 3800, profit: 3400 },
  { month: "Aug", revenue: 6800, expenses: 3600, profit: 3200 },
  { month: "Sep", revenue: 7800, expenses: 4100, profit: 3700 },
  { month: "Oct", revenue: 8400, expenses: 4400, profit: 4000 },
  { month: "Nov", revenue: 9100, expenses: 4700, profit: 4400 },
  { month: "Dec", revenue: 10200, expenses: 5100, profit: 5100 },
];

const trafficData = [
  { day: "Mon", organic: 1200, direct: 800, referral: 400 },
  { day: "Tue", organic: 1500, direct: 900, referral: 500 },
  { day: "Wed", organic: 1100, direct: 750, referral: 380 },
  { day: "Thu", organic: 1800, direct: 1100, referral: 620 },
  { day: "Fri", organic: 2100, direct: 1300, referral: 750 },
  { day: "Sat", organic: 1600, direct: 1000, referral: 560 },
  { day: "Sun", organic: 900,  direct: 600,  referral: 280 },
];

const pieData = [
  { name: "React",      value: 38, color: "#61DBFB" },
  { name: "Next.js",   value: 24, color: "#F0F0F0" },
  { name: "TypeScript",value: 18, color: "#3178C6" },
  { name: "Tailwind",  value: 12, color: "#38BDF8" },
  { name: "Others",    value: 8,  color: "#6366F1" },
];

const radarData = [
  { skill: "HTML/CSS",    score: 95 },
  { skill: "JavaScript",  score: 88 },
  { skill: "React",       score: 85 },
  { skill: "TypeScript",  score: 78 },
  { skill: "Node.js",     score: 72 },
  { skill: "Databases",   score: 65 },
  { skill: "DevOps",      score: 58 },
];

const weeklyGrowth = [
  { week: "W1", users: 200 },
  { week: "W2", users: 280 },
  { week: "W3", users: 340 },
  { week: "W4", users: 420 },
  { week: "W5", users: 510 },
  { week: "W6", users: 620 },
  { week: "W7", users: 750 },
  { week: "W8", users: 890 },
];

// ─── KPI Cards ────────────────────────────────────────────────────────────────

const kpiCards = [
  { label: "Total Revenue", value: "$79.6K", change: "+18.4%", up: true,  color: "from-blue-500 to-blue-700" },
  { label: "Net Profit",    value: "$32.7K", change: "+24.1%", up: true,  color: "from-emerald-500 to-teal-700" },
  { label: "Active Users",  value: "8,890",  change: "+11.2%", up: true,  color: "from-violet-500 to-purple-700" },
  { label: "Bounce Rate",   value: "24.3%",  change: "-3.8%",  up: false, color: "from-rose-500 to-pink-700" },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 shadow-2xl text-sm">
      <p className="text-slate-300 font-semibold mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: <span className="text-white">{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function ChartCard({ title, subtitle, children, span = 1 }: {
  title: string; subtitle: string; children: React.ReactNode; span?: 1 | 2;
}) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-6 ${span === 2 ? "col-span-1 lg:col-span-2" : ""}`}>
      <h3 className="text-base font-bold text-white mb-0.5">{title}</h3>
      <p className="text-xs text-slate-500 mb-5">{subtitle}</p>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResponsiveChartPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-block px-3 py-1 mb-3 text-[11px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 rounded-full">
            Data Visualization
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Recharts library · Responsive containers · Multiple chart types</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((k) => (
            <div key={k.label} className={`rounded-2xl p-5 bg-gradient-to-br ${k.color} shadow-xl`}>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">{k.label}</p>
              <p className="text-white text-2xl font-extrabold">{k.value}</p>
              <p className={`text-xs mt-1 font-medium ${k.up ? "text-white/90" : "text-white/80"}`}>
                {k.change} from last period
              </p>
            </div>
          ))}
        </div>

        {/* Chart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* 1. Bar Chart — Revenue vs Expenses */}
          <ChartCard title="Revenue vs Expenses" subtitle="Monthly breakdown (USD) · Grouped bar chart" span={2}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyRevenue} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
                <Bar dataKey="revenue"  fill="#3b82f6" radius={[4,4,0,0]} name="Revenue" />
                <Bar dataKey="expenses" fill="#f43f5e" radius={[4,4,0,0]} name="Expenses" />
                <Bar dataKey="profit"   fill="#10b981" radius={[4,4,0,0]} name="Profit" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 2. Area Chart — Traffic Sources */}
          <ChartCard title="Weekly Traffic Sources" subtitle="Organic · Direct · Referral sessions · Area chart">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="organicGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="directGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="referralGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
                <Area type="monotone" dataKey="organic"  stroke="#6366f1" fill="url(#organicGrad)"  strokeWidth={2} name="Organic" />
                <Area type="monotone" dataKey="direct"   stroke="#f59e0b" fill="url(#directGrad)"   strokeWidth={2} name="Direct" />
                <Area type="monotone" dataKey="referral" stroke="#10b981" fill="url(#referralGrad)" strokeWidth={2} name="Referral" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 3. Pie Chart — Tech stack */}
          <ChartCard title="Tech Stack Distribution" subtitle="Percentage of codebase by technology · Pie chart">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 shrink-0">
                {pieData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                    <span className="text-slate-300">{d.name}</span>
                    <span className="text-slate-500 ml-auto pl-4">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          {/* 4. Line Chart — User Growth */}
          <ChartCard title="User Growth (8 Weeks)" subtitle="Weekly cumulative new user signups · Line chart">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyGrowth}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone" dataKey="users" name="Users"
                  stroke="url(#lineGrad)" strokeWidth={3}
                  dot={{ fill: "#6366f1", strokeWidth: 0, r: 5 }}
                  activeDot={{ r: 7, fill: "#f43f5e" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* 5. Radar Chart — Skills */}
          <ChartCard title="Developer Skill Radar" subtitle="Self-assessed proficiency (0–100) · Spider chart" span={2}>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

        </div>

        <p className="text-center mt-10 text-xs text-slate-700 font-mono tracking-widest uppercase">
          Recharts · Tailwind CSS · Next.js · Internship Practice
        </p>
      </div>
    </main>
  );
}