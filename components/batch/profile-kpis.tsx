import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import CountUp from "../effects/count-up";
import { ProfileKPIsProps } from "@/types";
import { formatFeedInBags } from "@/lib/bird-man";

export default function ProfileKPIs({
    totalAliveBirds,
    totalFeedConsumed,
    totalMortality,
    mortalityRate,
    mortalityToday,
    avgBodyWeightLatest,
    numberOfSeriousDeseasesHappen,
    fcr,
}: ProfileKPIsProps) {
    const metrics = [
        {
            title: "Live Birds",
            value: totalAliveBirds,
            description: "Total number of live birds in this Batch",
        },
        {
            title: "Total Mortality",
            value: totalMortality,
            description: "Total number of mortalities in this Batch",
        },
        {
            title: "Mortality Rate",
            value: mortalityRate ? `${mortalityRate.toFixed(2)}%` : "",
            description: "Percentage of birds that have died",
        },
        {
            title: "Total Feed Consumed (kg)",
            value: formatFeedInBags(totalFeedConsumed),
            description: "Total feed consumed by the birds",
        },
        {
            title: "Mortality Today",
            value: mortalityToday,
            description: "Number of mortalities recorded today",
        },
        {
            title: "Avg Weight (Latest) (g)",
            value: avgBodyWeightLatest ? avgBodyWeightLatest : "N/A",
            description:
                "Average body weight of birds from the latest measurement",
        },
        {
            title: "FCR",
            value: fcr?.toFixed(2) ? fcr?.toFixed(2) : "N/A",
            description: "Feed Conversion Ratio",
        },
        {
            title: "Serious Diseases",
            value: numberOfSeriousDeseasesHappen
                ? numberOfSeriousDeseasesHappen
                : "N/A",
            description: "Number of serious diseases recorded in this Batch",
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
                <Card key={index}>
                    <CardContent>
                        <div className="text-2xl text-primary font-bold">
                            {!metric.value ? (
                                "N/A"
                            ) : typeof metric.value === "number" ? (
                                <CountUp
                                    from={0}
                                    to={metric.value}
                                    duration={1}
                                    separator=","
                                    className="count-up-text"
                                />
                            ) : (
                                metric.value
                            )}
                        </div>
                    </CardContent>
                    <CardHeader>
                        <CardTitle>{metric.title}</CardTitle>
                        <CardDescription>{metric.description}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
