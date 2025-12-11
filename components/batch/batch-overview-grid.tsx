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

export default function BatchOverviewGrid({
  data: { batchId, liveBirds, feedConsumed, mortalityToday },
}: BatchOverviewGridProps) {
  return (
    <React.Fragment>
      <h2 className="text-2xl font-semibold tracking-tight">Active Batches</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Brooder Card */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Brooder Chicks
            </CardTitle>
            <CardDescription>0{"-"}30 days | Early stage flock</CardDescription>
          </CardHeader>

          <CardContent className="mt-2">
            <div className="grid grid-cols-2 text-sm">
              {/* Row 1 */}
              <div className="py-2 border-b border-gray-200 text-muted-foreground">
                Batch ID
              </div>
              <div className="py-2 border-b border-gray-200 font-medium text-right">
                {batchId.brooder}
              </div>

              {/* Row 2 */}
              <div className="py-2 border-b border-gray-200 text-muted-foreground">
                Live Birds
              </div>
              <div className="py-2 border-b border-gray-200 font-medium text-right">
                {liveBirds.brooder.toLocaleString("en-US")}
              </div>

              {/* Row 3 */}
              <div className="py-2 border-b border-gray-200 text-muted-foreground">
                Mortality Today
              </div>
              <div className="py-2 border-b border-gray-200 font-medium text-right">
                {mortalityToday.brooder.toLocaleString("en-US")}
              </div>

              {/* Row 4 (last row, no border) */}
              <div className="py-2 text-muted-foreground">
                Feed Consumed Today (Bag)
              </div>
              <div className="py-2 font-medium text-right">
                {feedConsumed.brooder.toLocaleString("en-US")}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <CardDescription>House 1</CardDescription>
            <Button variant="link" size="sm" asChild>
              <Link href={`/batches/${batchId.brooder}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Grower Card */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Grower Flocks
            </CardTitle>
            <CardDescription>31–60+ days | Growing stage</CardDescription>
          </CardHeader>

          <CardContent className="mt-2">
            <div className="grid grid-cols-2 text-sm">
              {/* Row 1 */}
              <div className="py-2 border-b border-gray-200 text-muted-foreground">
                Batch ID
              </div>
              <div className="py-2 border-b border-gray-200 font-medium text-right">
                {batchId.grower}
              </div>

              {/* Row 2 */}
              <div className="py-2 border-b border-gray-200 text-muted-foreground">
                Live Birds
              </div>
              <div className="py-2 border-b border-gray-200 font-medium text-right">
                {liveBirds.grower.toLocaleString("en-US")}
              </div>

              {/* Row 3 */}
              <div className="py-2 border-b border-gray-200 text-muted-foreground">
                Mortality Today
              </div>
              <div className="py-2 border-b border-gray-200 font-medium text-right">
                {mortalityToday.grower.toLocaleString("en-US")}
              </div>

              {/* Row 4 (last row, no border) */}
              <div className="py-2 text-muted-foreground">
                Feed Consumed Today (Bag)
              </div>
              <div className="py-2 font-medium text-right">
                {feedConsumed.grower.toLocaleString("en-US")}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <CardDescription>House 2</CardDescription>
            <Button variant="link" size="sm">
              <Link href={`/batches/${batchId.grower}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </React.Fragment>
  );
}
