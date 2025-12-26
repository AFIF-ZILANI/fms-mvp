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
import { BatchSpecific } from "@/types/api";
import { formatFeedInBags } from "@/lib/bird-man";

export default function BatchOverviewGrid({
    batchSpecificData,
}: {
    batchSpecificData: BatchSpecific[];
}) {
    return (
        <React.Fragment>
            <h2 className="text-2xl font-semibold tracking-tight">
                Active Batches
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {batchSpecificData.map((b) => (
                    <Card className="border border-gray-200" key={b.batchId}>
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                                {b.phase === "BROODER"
                                    ? "Brooder Chicks"
                                    : b.phase === "GROWER"
                                      ? "Grower Flocks"
                                      : b.phase === "FINISHER"
                                        ? "Near to Sell birds"
                                        : null}
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
                                    {b.batch_bussiness_id}
                                </div>

                                {/* Row 2 */}
                                <div className="py-2 border-b border-gray-200 text-muted-foreground">
                                    Live Birds
                                </div>
                                <div className="py-2 border-b border-gray-200 font-medium text-right">
                                    {b.aliveBirds.toLocaleString("en-US")}
                                </div>

                                {/* Row 3 */}
                                <div className="py-2 border-b border-gray-200 text-muted-foreground">
                                    Mortality Today
                                </div>
                                <div className="py-2 border-b border-gray-200 font-medium text-right">
                                    {b.mortalityToday.toLocaleString("en-US")}
                                </div>

                                {/* Row 4 (last row, no border) */}
                                <div className="py-2 text-muted-foreground">
                                    Feed Consumed Today
                                </div>
                                <div className="py-2 font-medium text-right">
                                    {formatFeedInBags(b.feedConsumedToday)}
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex items-center justify-between">
                            {/* <CardDescription>House 1</CardDescription> */}
                            <Button variant="link" size="sm" asChild>
                                <Link href={`/batches/${b.batchId}`}>
                                    View Details
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </React.Fragment>
    );
}
