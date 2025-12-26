"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Wheat,
    Skull,
    Layers,
    Bird,
    Droplets,
    Activity,
} from "lucide-react";
// import CountUp from "../effects/count-up";
import { BatchOverviewToday } from "@/types/api";

type BatchGenaralCardGroupProp = {
    data: BatchOverviewToday;
};
export default function GeneralCardGroup({ data }: BatchGenaralCardGroupProp) {
    const metrics = [
        {
            title: "Active Batches",
            icon: Layers,
            value: data.activeBatches,
            description: "Number of batches currently running on the farm",
        },
        {
            title: "Alive Birds",
            icon: Bird,
            value: data.aliveBirds,
            description: "Total live birds across all active batches",
        },
        {
            title: "Mortality Today",
            icon: Skull,
            value: `${data.mortality} (${data.mortalityRate?.toFixed(2)}%)`,
            description: "Birds lost today across all running batches",
        },
        {
            title: "Feed Consumed Today",
            icon: Wheat,
            value: data.feedConsumed,
            description: "Total feed consumed today (CARB)",
        },
        {
            title: "Water Consumed Today",
            icon: Droplets,
            value: data.waterConsumed,
            description: "Total water consumed today (CARB)",
        },
        {
            title: "Water : Feed Ratio",
            icon: Activity,
            value: data.waterFeedRatio?.toFixed(2),
            description:
                "Water-to-feed ratio for today (health & stress indicator)",
        },
    ];

    return (
        <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
            {metrics.map((metric, i) => (
                <Card
                    key={i}
                    className="rounded-2xl border border-gray-200 shadow-sm"
                >
                    <CardContent>
                        <div className="text-2xl text-primary font-bold">
                            {!metric.value ? "N/A" : metric.value}
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
