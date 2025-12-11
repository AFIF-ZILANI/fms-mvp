"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartEmptyState } from "../empty-chart-error";

export const description = "Feed chart (age in days)";

const chartConfig = {
  feedConsumed: {
    label: "Feed (KG)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function FeedConsumtionChart({
  feedConsumedArray,
}: {
  feedConsumedArray?: number[];
}) {
  // Convert to recharts usable data
  function formatData(data: number[]) {
    return data.map((value, index) => ({
      age: index + 1, // day number starting from 1
      feedConsumed: value,
    }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feed Consumption</CardTitle>
        <CardDescription>
          Showing feed consumption by age (days)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {feedConsumedArray && feedConsumedArray.length ? (
          <ChartContainer config={chartConfig}>
            <LineChart
              data={formatData(feedConsumedArray)}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="age"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                label={{
                  value: "Age (days)",
                  position: "insideBottom",
                  offset: -7,
                }}
              />

              <YAxis tickLine={false} axisLine={false} tickMargin={8} />

              <ChartTooltip content={<ChartTooltipContent />} />

              <Line
                dataKey="feedConsumed"
                type="monotone"
                stroke="var(--chart-5)"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <ChartEmptyState />
        )}
      </CardContent>
    </Card>
  );
}
