import { response } from "@/lib/apiResponse";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const mockData = {
    batchCardGroup: {
      activeBatches: {
        grower: 1,
        brooder: 1,
      },
      totalMortality: {
        grower: 190,
        brooder: 67,
      },
      mortalityToday: {
        grower: 2,
        brooder: 18,
      },
      liveBirds: {
        grower: 8858,
        brooder: 9123,
      },
      feedConsumedToday: {
        grower: 125.5,
        brooder: 98.3,
      },
      birdsAge: {
        grower: 50,
        brooder: 10,
      },
    },
    batchOverviewGrid: {
      batchId: {
        brooder: "bf89yn420gyy297y9nthgg4",
        grower: "8c7jfn9fnybytfh9yn8f2y",
      },
      mortalityToday: {
        brooder: 35,
        grower: 2,
      },
      feedConsumed: {
        brooder: 15,
        grower: 167,
      },
      liveBirds: {
        brooder: 9134,
        grower: 8893,
      },
    },
  };

  return response({
    message: "Batch data fetched successfully",
    data: mockData,
  });
}
