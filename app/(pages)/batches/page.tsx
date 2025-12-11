"use client"
import BatchOverviewGrid from "@/components/batch/batch-overview-grid";
import GeneralCardGroup from "@/components/batch/header-kpis";
import { Separator } from "@/components/ui/separator";
import { useGetData } from "@/lib/api-request";
import { BatchCardGroupProps, BatchOverviewGridProps } from "@/types";
import { useEffect } from "react";
import { toast } from "sonner";

interface BatchesData {
  batchCardGroup: BatchCardGroupProps["data"];
  batchOverviewGrid: BatchOverviewGridProps["data"];
}

export default function Page() {
  const { data, isFetching, isError, refetch } = useGetData<{
    data: BatchesData;
  }>(`/batches/fetch/overview`);

  // --- Error Toast ---
  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong. Try again later!");
    }
  }, [isError]);

  // --- Loading State ---
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="text-muted-foreground">Loading batch data…</span>
      </div>
    );
  }

  // --- Hard Error Fallback (Page Level) ---
  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center">
        <h2 className="text-xl font-semibold">Unable to load batch</h2>
        <p className="text-muted-foreground mt-2">
          We couldn’t fetch this batch’s data. Try again.
        </p>

        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 rounded bg-primary text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  const batchData: BatchesData = data.data;
  return (
    <div className="grid grid-cols-1 md:px-4 mb-[40vh]">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Running Batches Snapshot
          </h2>
          <span className="text-xs text-muted-foreground">
            Updated {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground mt-1">
            Overview of key performance indicators for active batches
          </p>
        </div>
        <Separator className="my-4" />
      </div>
      <GeneralCardGroup data={batchData.batchCardGroup} />
      <div className="mt-8">
        <BatchOverviewGrid data={batchData.batchOverviewGrid} />
      </div>
    </div>
  );
}
