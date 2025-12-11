"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Wheat,
  Skull,
  Calendar,
  Layers,
  Bird,
} from "lucide-react";
import CountUp from "../effects/count-up";
import { BatchCardGroupProps } from "@/types";

export default function GeneralCardGroup({ data }: BatchCardGroupProps) {
  const metrics = [
    {
      title: "Active Batches",
      icon: Layers,
      value: {
        grower: data.activeBatches.grower,
        brooder: data.activeBatches.brooder,
      },
      description: "Total number of active batches on the farm.",
    },
    {
      title: "Live Birds",
      icon: Bird,
      value: { grower: data.liveBirds.grower, brooder: data.liveBirds.brooder },
      description: "Current live bird count",
    },
    {
      title: "Mortality Today",
      icon: Skull,
      value: {
        grower: data.mortalityToday.grower,
        brooder: data.mortalityToday.brooder,
      },
      description: "Mortality count for today",
    },
    {
      title: "Age of Batches (days)",
      icon: Calendar,
      value: { grower: data.birdsAge.grower, brooder: data.birdsAge.brooder },
      description: "Average age of adult/child batches",
    },
    {
      title: "Total Mortality",
      icon: AlertTriangle,
      value: {
        grower: data.totalMortality.grower,
        brooder: data.totalMortality.brooder,
      },
      description: "Cumulative mortality count",
    },

    {
      title: "Feed Consumed Today (kg)",
      icon: Wheat,
      value: {
        grower: data.feedConsumedToday.grower,
        brooder: data.feedConsumedToday.brooder,
      },
      description: "Feed consumed by adult/child birds today",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, i) => (
        <Card key={i} className="rounded-2xl border border-gray-200 shadow-sm">
          <CardContent>
            <div className="bg-muted p-4 rounded-xl flex flex-col gap-4">
              {/* Grower */}
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-muted-foreground font-medium">
                  Grower
                </span>
                {metric?.value?.grower ? (
                  <CountUp
                    from={0}
                    to={metric.value.grower}
                    duration={1}
                    separator=","
                    className="text-xl font-bold text-primary"
                  />
                ) : (
                  <span className="text-xl font-bold text-muted-foreground">
                    N/A
                  </span>
                )}
              </div>

              {/* Brooder */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-muted-foreground font-medium">
                  Brooder
                </span>
                {metric?.value?.brooder ? (
                  <CountUp
                    from={0}
                    to={metric.value.brooder}
                    duration={1}
                    separator=","
                    className="text-xl font-bold text-primary"
                  />
                ) : (
                  <span className="text-xl font-bold text-muted-foreground">
                    N/A
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <metric.icon className="h-5 w-5 text-primary" />
              {metric.title}
            </CardTitle>
            <CardDescription className="text-sm">
              {metric.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
