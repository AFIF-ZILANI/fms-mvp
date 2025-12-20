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

export const description = "Alive birds chart (age in days)";

const chartConfig = {
    alive: {
        label: "Alive Birds",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

export default function AliveBirdsChart({
    aliveBirdsArray,
}: {
    aliveBirdsArray: { age: number; alive: number }[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Alive Birds Chart</CardTitle>
                <CardDescription>
                    Showing alive birds count by age (days)
                </CardDescription>
            </CardHeader>

            <CardContent>
                {aliveBirdsArray && aliveBirdsArray.length ? (
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            data={aliveBirdsArray}
                            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="age"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                label={{
                                    value: "Age (days)",
                                    position: "insideBottom",
                                    offset: -10,
                                }}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                width={50}
                            />

                            <ChartTooltip content={<ChartTooltipContent />} />

                            <Line
                                dataKey="alive"
                                type="monotone"
                                stroke="var(--chart-5)"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 5 }}
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
