import FeedConsumtionChart from "./profile-feed-consumtion-graph";
import { MortalityChart } from "./profile-mortality-graph";
import AliveBirdsChart from "./profile-alive-bird-count-graph";
import { ProfileGraphProps } from "@/types";



export default function ProfileGraph({
  data: { aliveBirds, mortalityData, feedConsumedArray },
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
        <AliveBirdsChart aliveBirds={aliveBirds} />
        <MortalityChart mortalityData={mortalityData} />
        <div className="col-span-2">
          <FeedConsumtionChart feedConsumedArray={feedConsumedArray} />
        </div>
      </div>
    </section>
  );
}
