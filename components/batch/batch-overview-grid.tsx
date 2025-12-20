import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BatchOverviewGridProps } from "@/types";
import { BatchOverviewData } from "@/types/api";

export default function BatchOverviewGrid({
    brooder,
    grower,
}: BatchOverviewData) {
    return (
        <React.Fragment>
            <h2 className="text-2xl font-semibold tracking-tight">
                Active Batches
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Brooder Card */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                            Brooder Chicks
                        </CardTitle>
                        <CardDescription>
                            0{"-"}30 days | Early stage flock
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="mt-2">
                        <div className="grid grid-cols-2 text-sm">
                            {/* Row 1 */}
                            <div className="py-2 border-b border-gray-200 text-muted-foreground">
                                Batch ID
                            </div>
                            <div className="py-2 border-b border-gray-200 font-medium text-right">
                                {brooder.batch_bussiness_id}
                            </div>

                            {/* Row 2 */}
                            <div className="py-2 border-b border-gray-200 text-muted-foreground">
                                Live Birds
                            </div>
                            <div className="py-2 border-b border-gray-200 font-medium text-right">
                                {brooder.liveBirds.toLocaleString("en-US")}
                            </div>

                            {/* Row 3 */}
                            <div className="py-2 border-b border-gray-200 text-muted-foreground">
                                Mortality Today
                            </div>
                            <div className="py-2 border-b border-gray-200 font-medium text-right">
                                {brooder.mortalityToday.toLocaleString("en-US")}
                            </div>

                            {/* Row 4 (last row, no border) */}
                            <div className="py-2 text-muted-foreground">
                                Feed Consumed Today (Bag)
                            </div>
                            <div className="py-2 font-medium text-right">
                                {(() => {
                                    const bags = Math.floor(
                                        brooder.feedConsumedToday / 50
                                    );
                                    const remainingKg =
                                        brooder.feedConsumedToday % 50;

                                    return `${bags} Bags ${remainingKg} kg`;
                                })()}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between">
                        <CardDescription>House 1</CardDescription>
                        <Button variant="link" size="sm" asChild>
                            <Link href={`/batches/${brooder.batchId}`}>
                                View Details
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                {/* Grower Card */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                            Grower Flocks
                        </CardTitle>
                        <CardDescription>
                            31–60+ days | Growing stage
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="mt-2">
                        <div className="grid grid-cols-2 text-sm">
                            {/* Row 1 */}
                            <div className="py-2 border-b border-gray-200 text-muted-foreground">
                                Batch ID
                            </div>
                            <div className="py-2 border-b border-gray-200 font-medium text-right">
                                {grower.batch_bussiness_id}
                            </div>

                            {/* Row 2 */}
                            <div className="py-2 border-b border-gray-200 text-muted-foreground">
                                Live Birds
                            </div>
                            <div className="py-2 border-b border-gray-200 font-medium text-right">
                                {grower.liveBirds.toLocaleString("en-US")}
                            </div>

                            {/* Row 3 */}
                            <div className="py-2 border-b border-gray-200 text-muted-foreground">
                                Mortality Today
                            </div>
                            <div className="py-2 border-b border-gray-200 font-medium text-right">
                                {grower.mortalityToday.toLocaleString("en-US")}
                            </div>

                            {/* Row 4 (last row, no border) */}
                            <div className="py-2 text-muted-foreground">
                                Feed Consumed Today (Bag)
                            </div>
                            <div className="py-2 font-medium text-right">
                                {(() => {
                                    const bags = Math.floor(
                                        brooder.feedConsumedToday / 50
                                    );
                                    const remainingKg =
                                        brooder.feedConsumedToday % 50;

                                    return `${bags} Bags ${remainingKg} kg`;
                                })()}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between">
                        <CardDescription>House 2</CardDescription>
                        <Button variant="link" size="sm">
                            <Link href={`/batches/${grower.batchId}`}>
                                View Details
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </React.Fragment>
    );
}
