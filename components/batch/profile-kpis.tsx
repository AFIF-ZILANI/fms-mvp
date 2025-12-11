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

export default function ProfileKPIs({ data }: ProfileKPIsProps) {
  const metrics = [
    {
      title: "Live Birds",
      value: data.liveBirds,
      description: "Total number of live birds in this Batch",
    },
    {
      title: "Total Mortality",
      value: data.totalMortality,
      description: "Total number of mortalities in this Batch",
    },
    {
      title: "Mortality Rate",
      value:
        data && data.mortalityRate ? `${data.mortalityRate.toFixed(2)}%` : "",
      description: "Percentage of birds that have died",
    },
    {
      title: "Total Feed Consumed (kg)",
      value: data.totalFeedConsumed,
      description: "Total feed consumed by the birds",
    },
    {
      title: "Mortality Today",
      value: data.mortalityToday,
      description: "Number of mortalities recorded today",
    },
    {
      title: "Avg Weight (Latest) (g)",
      value: data.avgBodyWeightLatest ? data.avgBodyWeightLatest : "N/A",
      description: "Average body weight of birds from the latest measurement",
    },
    {
      title: "FCR",
      value: data.fcr?.toFixed(2) ? data.fcr?.toFixed(2) : "N/A",
      description: "Feed Conversion Ratio",
    },
    {
      title: "Serious Diseases",
      value: data.numberOfSeriousDeseasesHappen
        ? data.numberOfSeriousDeseasesHappen
        : "N/A",
      description: "Number of serious diseases recorded in this Batch",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
