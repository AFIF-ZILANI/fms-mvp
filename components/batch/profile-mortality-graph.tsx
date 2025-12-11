"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export const description = "Daily mortality bar chart";

const chartConfig = {
  mortality: {
    label: "Mortality",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;
interface MortalityChartProps {
  mortalityData?: { day: number; mortality: number }[];
}

export function MortalityChart({ mortalityData }: MortalityChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Mortality</CardTitle>
        <CardDescription>
          Showing daily mortality for the active batch
        </CardDescription>
      </CardHeader>

      <CardContent>
        {mortalityData && mortalityData.length ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={mortalityData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="day"
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

              <Bar
                dataKey="mortality"
                fill="var(--chart-5)"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <ChartEmptyState />
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
