"use client";

import React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export interface KitchenVolumePoint {
  day: string;
  orders: number;
}

const defaultKitchenData: KitchenVolumePoint[] = [
  { day: "Mon", orders: 470 },
  { day: "Tue", orders: 610 },
  { day: "Wed", orders: 560 },
  { day: "Thu", orders: 890 },
  { day: "Fri", orders: 1380 },
  { day: "Sat", orders: 1710 },
  { day: "Sun", orders: 1240 },
];

const chartConfig = {
  orders: {
    label: "Kitchen Orders",
    color: "#dc2626",
  },
} satisfies ChartConfig;

export default function WeeklyKitchenVolumeChart({
  data = defaultKitchenData,
}: {
  data?: KitchenVolumePoint[];
}) {
  return (
    <Card className="rounded-3xl border-orange-200/80 bg-white shadow-sm shadow-orange-950/5">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2">
        <div>
          <CardTitle className="text-base sm:text-lg font-extrabold text-stone-950">
            Weekly Kitchen Order Volume
          </CardTitle>
          <CardDescription className="text-xs text-stone-500">
            Brick-oven kitchen throughput across the week
          </CardDescription>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#FAF7F2] border border-orange-200/70 px-3 py-1 text-xs font-semibold text-stone-700">
          <span className="h-2.5 w-2.5 rounded-full bg-[#dc2626]" />
          Busiest: Sat
        </span>
      </CardHeader>

      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <AreaChart
            data={data}
            margin={{ top: 12, right: 14, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="kitchenVolumeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#dc2626" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              stroke="#fed7aa"
              strokeOpacity={0.6}
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "#78716c", fontSize: 12, fontWeight: 600 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 1800]}
              ticks={[0, 450, 900, 1350, 1800]}
              tick={{ fill: "#a8a29e", fontSize: 11, fontWeight: 500 }}
            />

            <ChartTooltip
              cursor={{
                stroke: "#dc2626",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Area
              type="monotone"
              dataKey="orders"
              stroke="#dc2626"
              strokeWidth={2.5}
              fill="url(#kitchenVolumeFill)"
              activeDot={{
                r: 5,
                fill: "#dc2626",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}