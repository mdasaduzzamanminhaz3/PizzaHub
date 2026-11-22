"use client";

import React, { useMemo } from "react";
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
  { day: "Mon", orders: 0 },
  { day: "Tue", orders: 0 },
  { day: "Wed", orders: 0 },
  { day: "Thu", orders: 0 },
  { day: "Fri", orders: 0 },
  { day: "Sat", orders: 0 },
  { day: "Sun", orders: 0 },
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
  const chartData = data.length > 0 ? data : defaultKitchenData;

  const busiestDay = useMemo(() => {
    let top = chartData[0];
    for (const point of chartData) {
      if ((point.orders || 0) > (top?.orders || 0)) {
        top = point;
      }
    }
    return top && top.orders > 0 ? top.day : "Sat";
  }, [chartData]);

  const { maxY, ticks } = useMemo(() => {
    const highest = Math.max(0, ...chartData.map((d) => Number(d.orders) || 0));
    if (highest <= 10) {
      return { maxY: 10, ticks: [0, 2, 5, 8, 10] };
    }
    if (highest <= 50) {
      const top = Math.ceil(highest / 10) * 10;
      return {
        maxY: top,
        ticks: [0, Math.round(top * 0.25), Math.round(top * 0.5), Math.round(top * 0.75), top],
      };
    }
    const top = Math.ceil(highest / 100) * 100;
    return {
      maxY: top,
      ticks: [0, Math.round(top * 0.25), Math.round(top * 0.5), Math.round(top * 0.75), top],
    };
  }, [chartData]);

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
          Busiest: {busiestDay}
        </span>
      </CardHeader>

      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-72 w-full">
          <AreaChart
            data={chartData}
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
              domain={[0, maxY]}
              ticks={ticks}
              allowDecimals={false}
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