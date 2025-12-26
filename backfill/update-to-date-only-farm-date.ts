import prisma from "@/lib/prisma";

const FARM_DAY_START_HOUR = 4;
const FARM_TIMEZONE_OFFSET = 6; // BD UTC+6

function getFarmDateFromUtc(utcDate: Date): string {
  const d = new Date(utcDate);

  d.setHours(d.getUTCHours() + FARM_TIMEZONE_OFFSET);
  if (d.getHours() < FARM_DAY_START_HOUR) d.setDate(d.getDate() - 1);

  return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

async function backfillFarmDates() {
  const events = await prisma.houseEvents.findMany({
    select: { id: true, occurred_at: true },
  });

  console.log(`Backfilling ${events.length} events...`);

  for (const e of events) {
    const farmDateOnly = getFarmDateFromUtc(e.occurred_at);
    const farmDate = new Date(farmDateOnly + "T00:00:00.000Z"); // <-- FIXED

    await prisma.houseEvents.update({
      where: { id: e.id },
      data: { farm_date: farmDate },
    });
  }

  console.log("Backfill complete.");
}

backfillFarmDates()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
