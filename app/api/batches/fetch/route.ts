import { response } from "@/lib/apiResponse";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const batchId = searchParams.get("batchId");

  const mockData = {
    batchDetails: {
      batchId: batchId,
      status: "BROODING",
      age: 15,
      breed: "Pakistani",
      houseNo: 3,
      initialQuantity: 9000,
      batchStart: "2024-05-01",
      expectedSell: "2024-07-15",
      supplier: ["Roni Haji", "Baccha Babu"],
      daysToSell: 75,
      mortality24H: 19,
      mortality48H: 63,
      mortality72H: 140,
    },
    profileKPIs: {
      liveBirds: 8933,
      totalMortality: 143,
      totalFeedConsumed: 150,
      mortalityToday: 2,
      numberOfSeriousDeseasesHappen: 1,
      mortalityRate: (143 / (8933 + 143)) * 100,
      fcr: 1.2
    },
    profileGraph: {
      aliveBirds: [9387, 9347, 9309, 9252, 9240, 9232, 9213, 9198, 9180, 9167],
      mortalityData: [
        { day: 1, mortality: 8 },
        { day: 2, mortality: 40 },
        { day: 3, mortality: 38 },
        { day: 4, mortality: 57 },
        { day: 5, mortality: 12 },
        { day: 6, mortality: 8 },
        { day: 7, mortality: 19 },
        { day: 8, mortality: 15 },
        { day: 9, mortality: 18 },
        { day: 10, mortality: 13 },
        { day: 11, mortality: 8 },

      ],
      feedConsumedArray: [
        12, 15, 18, 20, 22, 25, 28, 32, 35, 38, 40, 42, 45, 48, 50, 55, 58, 60,
        62, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135,
        120, 125, 130, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205,
        210, 215, 220, 225, 230, 235, 240, 245, 250, 265, 270, 275, 260, 275,
        280, 285, 290,
      ],
    },
  };

  return response({
    message: "Batch data fetched successfully",
    data: mockData,
  });
}
