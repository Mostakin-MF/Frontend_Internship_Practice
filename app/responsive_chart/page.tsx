"use client";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
];

const colors = {
    primary: "#000000",
    secondary: "#e62121ff",
    accent: "#49b827ff",
}

export default function MyBarChart() {
    return (
        <div className="w-[500px] h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={colors.secondary} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}