import FeedAndWaterConsumtionChart from "./profile-feed-and-water-consumtion-graph";
import { MortalityChart } from "./profile-mortality-graph";
import AliveBirdsChart from "./profile-alive-bird-count-graph";
import { ProfileGraphProps } from "@/types";
import WeightRecordChart from "./profile-weight-graph";

export default function ProfileGraph({
    aliveBirdsArray,
    mortalityArray,
    feedAndWaterConsumedArray,
    weightRecord,
}: ProfileGraphProps) {
    return (
        <section className="space-y-6 mt-4">
            <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                    Production Analytics
                </h2>
                <p className="text-sm">
                    Nov 2, 2025 {" - "}
                    {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 row-span-2">
                    <MortalityChart mortalityArray={mortalityArray} />
                </div>
                <WeightRecordChart data={weightRecord} />
                <AliveBirdsChart aliveBirdsArray={aliveBirdsArray} />
                <div className="md:col-span-2">
                    <FeedAndWaterConsumtionChart
                        data={feedAndWaterConsumedArray}
                    />
                </div>
            </div>
        </section>
    );
}
