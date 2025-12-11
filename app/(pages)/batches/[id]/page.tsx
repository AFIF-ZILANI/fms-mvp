"use client";

import BatchDetails from "@/components/batch/batch-details";
import ProfileGraph from "@/components/batch/profile-graph";
import ProfileKPIs from "@/components/batch/profile-kpis";
import { ChartEmptyState } from "@/components/empty-chart-error";
import { useGetData } from "@/lib/api-request";
import {
  ProfileBatchDetailsProps,
  ProfileGraphProps,
  ProfileKPIsProps,
} from "@/types";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface ProfileData {
  batchDetails: ProfileBatchDetailsProps["data"];
  profileKPIs: ProfileKPIsProps["data"];
  profileGraph: ProfileGraphProps["data"];
}

export default function Page() {
  const path = usePathname();
  const batchId = path.split("/").pop();

  const { data, isFetching, isError, refetch } = useGetData<{
    data: ProfileData;
  }>(`/batches/fetch?batchId=${batchId}`);

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

  const profileData: ProfileData = data.data;

  return (
    <div className="grid grid-cols-1 gap-x-4 px-4 gap-y-6 mb-[40vh]">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Batch Details</h2>
        <p className="text-muted-foreground">
          Comprehensive information about the selected batch
        </p>
      </div>

      {/* BATCH DETAILS */}
      <BatchDetails data={profileData.batchDetails} />

      {/* KPIs */}
      <ProfileKPIs data={profileData.profileKPIs} />

      {/* GRAPH (Fallback Inside Component) */}
      {profileData.profileGraph ? (
        <ProfileGraph data={profileData.profileGraph} />
      ) : (
        <ChartEmptyState message="No chart data available for this batch" />
      )}
    </div>
  );
}
